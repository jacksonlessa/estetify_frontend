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
        <b-field label="Data">
          <b-datepicker v-model="form.schedule_range"
            :locale="locale"
            range
            >

          </b-datepicker>
        </b-field>
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
      
      <div class="table-container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Profissional</th>
              <th>Hora</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders.data" :key="order.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
              <td>
                <nuxt-link :to="{name: 'atendimentos-id', params : {id: order.id}}">
                  {{ order.client.name }}
                </nuxt-link>
              </td> 
              <td>
                {{ order.professional.name }}
              </td>            
              <td>
                {{ order.scheduled_at }}
              </td>
              <td>
                <nuxt-link :to="{name: 'atendimentos-id', params : {id: order.id}}">
                  <fa :icon="['fas', 'chevron-right']" />
                </nuxt-link>
              </td>
            </tr>
            <tr v-if="orders.data.length === 0">
              <td colspan="3">Nenhum Atendimento cadastrado.</td>
            </tr>
          </tbody>
        </table>
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
        professional_name: "",
        client_name: "",
        schedule_range: [ new Date(), new Date() ]
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
      this.form.schedule_range = [ new Date(), new Date() ]
    },
    pageChange(page) {
      this.current_page = page;
      this.orders.current_page = page;
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
  }
}
</script>