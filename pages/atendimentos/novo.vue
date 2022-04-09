<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/atendimentos">
        <div class="icon-text">
          <span class="icon mr-3">
            <i class="mdi mdi-36px mdi-calendar-check"></i>
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
            <div class="columns is-multiline is-tablet">
              <div class="field column pb-0 is-6">
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

              <div class="field column pb-0 is-6">
                <datetime-input v-model.trim="form.scheduled_at" :errors="errors.scheduled_at" label="Data e hora" />
                <!-- <div>
                  Confira outros atendimentos que você possui para evitar conflitos:
                  <table>

                  </table>

                </div> -->
              </div>

              <div class="field column pb-0 is-12">
                <b-field label="Serviços">
                  <b-taginput
                    v-model="servicesSelected"
                    :data="filteredServices"
                    open-on-focus
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


                <div class="field column pb-0 is-12">
                  <div class="columns is-tablet has-background-white-bis" v-for="service in servicesSelected" :key="service.id">
                    <div class="column is-4">
                      <text-input v-model="service.name" label="Serviço" disabled />
                    </div>
                    <div class="column is-4" v-bind:class="{ 'is-hidden' : !showProfessionalSelect }">
                      <select-input v-if="professionals" v-model="form.services[service.id.toString()].professional_id" label="Profissional" :errors="errors['services.'+service.id.toString()+'.professional_id']">
                        <option v-if="professionals.length>1" :value="null">Selecione um professional</option>
                        <option v-for="professional in professionals" :key="professional.id" :value="professional.id">{{ professional.name }}</option>
                      </select-input>
                    </div>  
                    <div class="column is-4">
                      <money-input label="Preço" v-model.trim="form.services[service.id.toString()].price" v-bind="money"/>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field column pb-0 is-12">
                <text-input type='textarea' v-model="form.observation" :errors="errors.observation" label="Observação" />
              </div>

            </div>

            <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
              {{error}} <br/>
              se você está vendo esse erro entre em contato com a gente
            </div>

          </div>
          <footer class="card-footer">
            <NuxtLink to="/atendimentos" class="card-footer-item has-text-link">Voltar</NuxtLink>
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
                <option value="opened">Aberto</option>
                <option value="closed">Finalizado</option>
                <option value="canceled">Cancelado</option>
              </b-select>
            </b-field>
             <b-field label="Forma de Pagamento"
              :type="{ 'is-danger': errors.payment_method }"
              :message="errors.payment_method">
              <b-select v-model="form.payment_method" expanded>
                <option value="">Selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="debito">Debito</option>
                <option value="credito">Crédito</option>
                <option value="pix">PIX</option>
              </b-select>
            </b-field>
            <b-field label="Valor">
              <div>
                {{orderTotal|price}}
              </div>
            </b-field>
            <!-- <money-input label="Valor Total" v-model.trim="form.total" v-bind="money"/> -->
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
import TextInput from '@/components/Shared/TextInput'
import DatetimeInput from '@/components/Shared/DatetimeInput'
import MoneyInput from '@/components/Shared/MoneyInput'

export default {
  components: {
    SelectInput,
    DatetimeInput,
    MoneyInput,
    TextInput
  },
  data() {
    return {
      form: {
        client_id: '',
        user_id: '',
        scheduled_at: new Date(),
        total: 0,
        status: "opened",
        payment_method: "",
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
        this.filteredServices = this.services
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
    },
    showProfessionalSelect: function () {
      return !this.isFreePlan()
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
      let errServices = new Object()
      this.servicesSelected.forEach(service => {
        arrServices[service.id.toString()] = {
          original_price : service.price,
          price : service.price,
          professional_id : this.professionals.length==1 ? this.professionals[0].id : "",
        }
        errServices[service.id.toString()] = {
          professional_id: null,
          price: null
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
      console.log(arrServices)

      this.form.services = arrServices
      this.errors.services = errServices
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