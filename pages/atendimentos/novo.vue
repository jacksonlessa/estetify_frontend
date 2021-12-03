<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/atendimentos">
        <div class="icon-text">
          <span class="icon mr-3">
            <fa :icon="['far', 'calendar-alt']" />
          </span>
          <span>Atendimento</span>
        </div>
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>
        Novo
      </span>
    </h1>
     <div class="columns is-desktop">
      <div class="column is-9-desktop">
        <div class="card">
          <div class="card-content">
            <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
              {{errorMessage ? errorMessage : 'Um ou mais erros impedem a gravação, se você acha '}}
              
            </div>
            <div class="columns is-multiline is-mobile">
              <div class="field column is-6">
                <div class="columns is-multiline is-tablet">
                  <div class="field column pb-0 is-12">
                    <b-field label="Cliente"
                      :type="{ 'is-danger': errors.client_id }"
                      :message="errors.client_id"
                    >
                      <b-autocomplete
                          :data="clients"
                          placeholder="Procurar cliente por nome, telefone, e-mail"
                          icon="magnify"
                          clearable
                          field="name"
                          :loading="isFetching"
                          @typing="getAsyncClients"
                          @select="option => clientSelected  = option">
                          <template slot-scope="props">
                            <div class="media">
                              <div class="media-content">
                                {{ props.option.name }}
                                <br>
                                <small>
                                  <b>Telefone:</b> {{ props.option.phone }},
                                  <b>E-mail:</b> {{ props.option.email }}
                                </small>
                              </div>
                            </div>
                          </template>
                          <template #empty>Nenhum resultado encontrado</template>
                      </b-autocomplete>
                    </b-field>
                  </div>
                  <div class="field column pb-0 is-12">
                    <select-input v-if="professionals" v-model="form.user_id" :errors="errors.professional_id" label="Profissional">
                      <option v-if="professionals.length>1" :value="null">Selecione um professional</option>
                      <option v-for="professional in professionals" :key="professional.id" :value="professional.id">{{ professional.name }}</option>
                    </select-input>
                  </div>
                </div>
              </div>
              <div class="field column is-6">
                <div class="columns is-multiline is-tablet">
                  <div class="field column pb-0 is-12">
                    <datetime-input v-model.trim="form.scheduled_at" :errors="errors.scheduled_at" label="Data e hora" />
                    <!-- <div>
                      Confira outros atendimentos que você possui para evitar conflitos:
                      <table>

                      </table>

                    </div> -->
                  </div>
                </div>
              </div>

              <div class="field column pb-0 is-12">
                <b-field label="Serviços"
                  :type="{ 'is-danger': errors.services }"
                  :message="errors.services">
                  <b-taginput
                    v-model="servicesSelected"
                    :data="filteredServices"
                    autocomplete
                    field="name"
                    icon="label"
                    placeholder="Adicionar serviços"
                    @typing="getFilteredServices">
                    <template v-slot="props">
                        <strong>{{props.option.name}}</strong>: {{props.option.price | price}}
                    </template>
                    <template #empty>
                        Nenhum servio encontrado
                    </template>
                  </b-taginput>
                </b-field>
                <div>
                  <table class="table is-fullwidth">
                    <thead>
                      <tr>
                        <th>Serviço</th>
                        <th>Preço Original</th>
                        <th>Preço</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="service in servicesSelected" :key="service.id">
                        <td class="is-vertical-align-middle">
                          <span class="tag is-medium">
                            {{service.name}}
                            <!-- TODO add remover serviço da listagem de serviços -->
                            <!-- <a role="button" class="delete is-small"></a> -->
                          </span>
                        </td>
                        <td class="is-vertical-align-middle">
                            {{form.services[service.id.toString()]  .original_price | price}}
                        </td>
                        <td>
                          <money-input v-model.trim="form.services[service.id.toString()].price" v-bind="money"/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </div>
              
            </div>

            <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
              {{error}} <br/>
              se você está vendo esse erro entre em contato com a gente
            </div>

          </div>
          <footer class="card-footer">
            <NuxtLink to="/usuarios" class="card-footer-item has-text-link">Voltar</NuxtLink>
            <a @click="store" class="card-footer-item has-text-primary">Salvar</a>
          </footer>
        </div>
      </div>
      <div class="column is-3-desktop">
        <div class="card">
          <div class="card-content">
            <b-field label="Status"
              :type="{ 'is-danger': errors.status }"
              :message="errors.status">
              <b-select v-model="form.status" expanded>
                <option value="open">Aberto</option>
                <option value="closed">Finalizado</option>
                <option value="cancelled">Cancelado</option>
              </b-select>
            </b-field>
            <b-field label="Valor">
              <div>
                {{orderTotal|price}}
              </div>
            </b-field>
            <money-input label="Valor Total" v-model.trim="form.total" v-bind="money"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapValues,debounce,sumBy} from 'lodash' 
// TODO converter para filtro global - ver repo vue2Filters
import {currencyStyle} from "@/helpers/functions"
import SelectInput from '@/components/Shared/SelectInput'
import DatetimeInput from '@/components/Shared/DatetimeInput'
import MoneyInput from '@/components/Shared/MoneyInput'

export default {
  components: {
    SelectInput,
    DatetimeInput,
    MoneyInput
  },
  data() {
    return {
      form: {
        client_id: '',
        user_id: '',
        scheduled_at: new Date(),
        total: 0,
        status: "open",
        services: []
      },
      errors: {
        account_id: null,
        client_id: null,
        user_id: null,
        scheduled_at: null,
        services: null
      },
      minDateTime: new Date(),
      hasError: false,
      errorMessage: '',
      user: this.$auth.user,
      item: null,
      professionals: null,
      clients:[],
      clientSelected: null,
      services: [],
      filteredServices: [],
      servicesSelected: [],
      isFetching: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
    }
  },
  mounted(){
    this.loadProfessionals()
    this.loadServices()
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.errors, () => null)

      this.$repositories.orders.create(this.form)
      .then((res) => {
        this.item = res.data
        let msg = "Atendimento agendado!";
        this.$router.push({name: 'atendimentos-id',params : {msg: msg, id: this.item.id}});
      }).catch((error) => {
        if (error.response) {
          this.hasError = true;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
            return;
          }
          if (error.response.status == 401) {
            return;
          }
        }
      })
    },
    async loadProfessionals() {
      this.$repositories.professionals.all([]).then((res) => {
        this.professionals = res.data.data
        if (this.professionals.length == 1){
          this.form.user_id = this.professionals[0].id
        }
      }).catch((error) => {
        console.log(error.response)
      })
    },
    async loadServices() {
      this.$repositories.services.all([]).then((res) => {
        this.services = res.data.data
      }).catch((error) => {
        console.log(error.response)
      })
    },
    getAsyncClients: debounce(function (clientName) {
      if (!clientName.length) {
        this.clients = []
        return
      }
      this.isFetching = true
      let query = {
        search : clientName
      }

      this.$repositories.clients.all(query)
      .then(({ data }) => {
          this.clients = []
          data.data.forEach((item) => this.clients.push(item))
      })
      .catch((error) => {
          this.clients = []
          throw error
      })
      .finally(() => {
          this.isFetching = false
      })
    }, 500),
    getFilteredServices(text) {
      this.filteredServices = this.services.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },

    
  },
  computed: {
    orderTotal: function(){
      let sum = 0;
      let x = 0;
      for(x in this.form.services){
        sum += this.form.services[x].price
      }

      return sum;
    }
  },
  filters: {
    price: function (val){
      return currencyStyle(val)
    }
  },
  watch:{
    servicesSelected: function(){
      // mount new list of services
      let arrServices = new Object()
      this.servicesSelected.forEach(service => {
        arrServices[service.id.toString()] = {
          original_price : service.price,
          price : service.price
        }
      });

      // get actual list
      let old = this.form.services
      let key = false
      // update prices with custom price
      for(key in old){
        if(arrServices[key])
         arrServices[key].price = old[key].price
      }

      this.form.services = arrServices
    },
    clientSelected: function(){
      this.form.client_id = null
      if(this.clientSelected)
        this.form.client_id = this.clientSelected.id
    },
    'form.services': {
      deep:true,
      handler(services){
        let key=0;
        let total = 0;
        for(key in services){
          total += parseFloat(services[key].price)
        }
        this.form.total = total
      }
    }
  }
}
</script>