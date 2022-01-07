<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center">
      <div class="icon-text">
        <span class="icon mr-3">
          <fa :icon="['far', 'address-book']" />
        </span>
        <span>Atendimentos</span>
      </div>
    </h1>

    <div class="is-flex mb-5 is-justify-content-space-between is-flex-wrap-wrap is-align-items-center">
      <search-filter v-model="form.search" class="w-full max-w-md mr-4" @reset="reset">
        <div class="field">
          <label class="label">Nome do Cliente:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.client_name" placeholder="Nome do Cliente" />
          </div>
        </div>
        <div class="field">
          <label class="label">Profissional:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.professional_name" placeholder="Nome do Profissional" />
          </div>
        </div>
        <b-field label="Data a partir">
          <b-datepicker v-model="form.init_date"
            :locale="locale"
            >
          </b-datepicker>
        </b-field>
        <b-field label="Data até">
          <b-datepicker v-model="form.end_date"
            :locale="locale"
            >
          </b-datepicker>
        </b-field>
        <div class="field">
          <label class="label">Cancelados:</label>
          <div class="select">
            <select v-model="form.canceled">
              <option value="without">Sem cancelados</option>
              <option value="with">Com cancelados</option>
              <option value="only">Somente cancelados</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Excluidos:</label>
          <div class="select">
            <select v-model="form.trashed">
              <option :value="null">Sem excluidos</option>
              <option value="with">Com excluidos</option>
              <option value="only">Somente excluidos</option>
            </select>
          </div>
        </div>
      </search-filter> 
      <NuxtLink to="/atendimentos/novo" class="button is-primary mb-2">
        <span>Novo</span>
        <span class="is-hidden-touch">&nbsp;Atendimento</span>
      </NuxtLink>
    </div>
    <div>
      <div v-if="warningMessage" class='has-background-warning has-text-warning-dark mb-4 p-3'>
        {{warningMessage}}
      </div>
           
      <div>
        <span v-if="orders.data.length === 0">Nenhum atendimento existente para os filtros selecionados</span>
        <div class="columns is-multiline">
          <div v-for="order in orders.data" :key="order.id"  class="column is-half-tablet is-one-quarter-widescreen">
            <div class="card mb-3 is-align-items-stretch">
              <div class="card-content">
                <div class="client mb-2">
                  <p class="title is-4">{{ order.client.name }}</p>
                  <p class="subtitle is-7">
                    <strong>Telefone:</strong>{{order.client.phone}} <strong>Email:</strong>{{order.client.email}}
                  </p>
                </div>
                <div class="order-details mb-4 is-flex is-justify-content-space-between">
                  <b-field class="mb-0">
                    <b-tag :type="order.status|statusClass" rounded>{{order.status|statusToString}}</b-tag>
                  </b-field>
                  <span>
                    <b-icon icon="calendar" size="is-small"></b-icon>
                    <time :datetime="order.scheduled_at">{{ order.scheduled_at | date}}</time>
                  </span>
                </div>


                <div class="list-group">
                  <div class="list-group-item"
                    v-for="serviceItem in order.services" :key="'service' + serviceItem.id">
                    <span class="mr-2">
                      <b-icon icon="label"></b-icon>
                    </span>
                    <span>{{serviceItem.service.name}} - {{serviceItem.professional.name | truncate(15)}}</span>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a @click="orderCancel(order)" class="card-footer-item has-text-danger">Cancelar</a>
                <div href="#" class="card-footer-item"></div>
                <nuxt-link class="card-footer-item" :to="{name: 'atendimentos-id', params : {id: order.id}}">
                  Abrir
                </nuxt-link>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <pagination :current_page="orders.current_page" 
        :last_page="orders.last_page"
        @pageChange="pageChange"
      />
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import mapValues from 'lodash/mapValues'
import {onlyAttrNotEmpty} from '@/helpers/functions'
import SearchFilter from '@/components/Shared/SearchFilter'
import Pagination from '@/components/Shared/Pagination'
import DateInput from '@/components/Shared/DateInput'

export default {
  components: {
    Pagination,
    SearchFilter,
    DateInput,
  },
  data() {
    return {
      form: {
        search: "",
        trashed: "",
        canceled: "without",
        professional_name: "",
        client_name: "",
        init_date: new Date(),
        end_date: new Date(),
      },
      locale: "pt-BR",
      current_page: 1,
      orders: {
        data: [],
        current_page: 1,
        last_page: 10,
      },
      user: this.$auth.user,
      warningMessage:null,
    }
  },
  mounted(){
    if (this.$route.params.msg) {
      this.warningMessage = this.$route.params.msg;
    }
  },
  async fetch() {

    let query = {}

    query = onlyAttrNotEmpty(this.form)

    query.account_id = this.user.account_id

    if(this.current_page)
      query.page = this.current_page

    this.$repositories.orders.all(query).then((res) => {
      this.orders = res.data
    }).catch((error) => {
      reject(error);
    })
  },
  fetchOnServer: false,
  methods: {
    reset() {
      this.form = mapValues(this.form, () => null)
      this.form.canceled = "without"
    },
    pageChange(page) {
      this.current_page = page;
      this.orders.current_page = page;
    },
    async orderCancel(order) {
      if(!confirm("Deseja cancelar o atendimento do cliente "+order.client.name+"?"))
        return false;

      let newOrder = order  
      newOrder.status = "canceled"
      delete newOrder.services;
      
      this.$repositories.orders.update(order.id, order);
      this.$fetch()
    }

  },
  watch: {
    form: {
      deep: true,
      handler: throttle(function(e, f) {
        this.current_page = 1;
        this.$fetch()
      }, 1000),
    },
    current_page: throttle(function() {
        this.$fetch()
      }, 500)
  },
  filters: {
    date: function (dateInput){
      const date = new Date(dateInput);
      const text =  date.toLocaleString();
      return text.substring(0,text.length-3)
    },
    statusToString: function (status){
      const statuses = {
        opened: "Aberto",
        closed: "Finalizado",
        canceled: "Cancelado"
      }
      return statuses[status]
    },
    statusClass:  function (status){
      const statuses = {
        opened: "is-link",
        closed: "is-primary",
        canceled: "is-danger"
      }
      return statuses[status]
    },
    truncate: function (text, count) {
      if (text.length > count)
        return text.substring(0, count)+"...";
        
      return text;
    }
  },
}
</script>

<style lang="scss" scoped>
.list-group {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  
  .list-group-item{
    line-height: 1.5;
  }
}
.list-group-item{
  display: flex;
  position: relative;
  padding: 0.75rem;
  background-color: #fff;
  border: 1px solid rgba(34,41,47,.125);
  +.list-group-item{
    border-top-width: 0;
  }
}
</style>