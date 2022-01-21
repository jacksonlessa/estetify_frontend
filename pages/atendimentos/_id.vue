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
      <span v-if="!isLoading">
        {{form.client.name.split(" ")[0]}} {{scheduledParsed}}
      </span>
    </h1>

    <div class="columns  is-desktop">
      <div class="column is-9-desktop">
        <div class="card">
          <div class="card-content">
            <div v-if="successMessage" class='has-background-success has-text-white mb-4 p-3'>
              {{successMessage}}
            </div>
            <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
              {{errorMessage ? errorMessage : 'Um ou mais erros impedem a gravação, se você acha '}}
              
            </div>
            <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
            <div class="columns is-multiline is-tablet">
              <div class="field column pb-0 is-6">
                <b-field label="Cliente"
                  :type="{ 'is-danger': errors.client_id }"
                  :message="errors.client_id"
                >
                  <b-autocomplete
                      :data="clients"
                      ref="autocomplete"
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
                <datetime-input v-model.trim="form.scheduled_at" :defaultValue="form.scheduled_at" :errors="errors.scheduled_at" label="Data e hora" />
              </div>

              <div class="field column pb-0 is-12">
                <b-field label="Serviços"
                  :type="{ 'is-danger': errors.services }"
                  :message="errors.services">
                  <b-taginput
                    v-model="servicesSelected"
                    :data="filteredServices"
                    ref="servicos"
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
                <div class="field column is-12">
                  <div class="columns is-tablet has-background-white-bis" v-for="service in servicesSelected" :key="service.id">
                    <div class="column is-4">
                      <text-input v-model="service.name" label="Serviço" disabled />
                    </div>
                    <div class="column is-4">
                      <select-input v-if="professionals" v-model="form.services[service.id.toString()].professional_id" label="Profissional" :errors="errors['services.'+service.id.toString()+'.professional_id']">
                        <option v-if="professionals.length>1" :value="null">Selecione um profissional</option>
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
                <text-input v-model="form.observation" :errors="errors.observation" label="Observação" />
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
            <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
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
    TextInput,
    DatetimeInput,
    MoneyInput
  },
  data() {
    return {
      form: {
        user_id: '',
        total: 0,
      },
      successMessage: null,
      formOriginal: {},
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
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      isLoading: true,
      isFetching: false,
      servicesListed: false,
      servicesSet: false,
    }
  },
  mounted(){
    if (this.$route.params.msg) {
      this.successMessage = this.$route.params.msg;
    }
  },
  async fetch() {
    await this.loadServices()
    this.loadProfessionals();
    this.$repositories.orders.show(this.$route.params.id).then((res) => {
      let data = res.data
      data.scheduled_at = new Date(data.scheduled_at)
      this.form = data
      this.formOriginal = data
      this.originalTotal = data.total
      this.isLoading = false;
      this.setAutocompleteValue(this.form.client)
      this.setServicosValue(this.formOriginal.services)

    })
    .catch((error) => {
      console.log(error)
      //this.$router.replace({ name: "" }); @TODO add correct route
      // reject(error);
      if (error.response.status == 403) {
        let msg = "Ops, você não deveria tentar fazer isso"
        this.$router.push({name: 'profissionais', params: {msg: msg}})
        return;
      }
    })
  },
  methods: {
    async store() {
      this.successMessage = null
      this.hasError = false;
      this.errors = mapValues(this.errors, () => null)

      this.$repositories.orders.update(this.form.id,this.form)
      .then((res) => {
        this.item = res.data
        this.successMessage = "Atendimento atualizado com sucesso!";
        this.$buefy.toast.open({
            message: 'Atendimento atualizado com sucesso!',
            // position: 'is-bottom',
            type: 'is-success'
        })
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
        console.log(error)
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
      await this.$repositories.services.all([]).then((res) => {
        this.services = res.data.data
        return res.data.data
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

    setAutocompleteValue(value) {
      this.$refs.autocomplete.setSelected(value)
    },

    setServicosValue(services){
      let ids = [];
      services.forEach((value) => {
        console.log(value.service_id)
        ids.push(value.service_id)
      })
      const selected = this.services.filter(function (res) {
        return ids.includes(res.id);
      })
      console.log(selected)
      this.servicesSelected = selected;
    },

    setOriginalTotalValue: debounce(function () {
      this.servicesSet = true;
      this.form.total = this.originalTotal
    }, 500),
  },
  computed: {
    scheduledParsed: function(){
      const date = new Date(this.form.scheduled_at)
      return date.toLocaleString("pt-BR")
    },
    orderTotal: function(){
      let sum = 0;
      let x = 0;
      if(!this.isLoading)
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
          price : service.price,
          professional_id : (this.professionals && this.professionals.length==1) ? this.professionals[0].id : "",
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

      // get originalForm in the first time
      if(!this.servicesListed){
        this.formOriginal.services.forEach((value) => {
          arrServices[value.service_id].price = value.price
          arrServices[value.service_id].original_price = value.original_price
          arrServices[value.service_id].professional_id = value.professional_id
        })
        this.servicesListed=true
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

        if(!this.servicesSet) {//after first set update total value to original
          this.setOriginalTotalValue()
        }
      }
    },
  }
}
</script>