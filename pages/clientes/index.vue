<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center">
      <div class="icon-text">
        <span class="icon mr-3">
          <i class="mdi mdi-36px mdi-account-star-outline"></i>
        </span>
        <span>Clientes</span>
      </div>
    </h1>

    <div class="is-flex mb-5 is-justify-content-space-between is-flex-wrap-wrap is-align-items-center">
      <search-filter v-model="form.search" class="w-full max-w-md mr-4" @reset="reset">
        <div class="field">
          <label class="label">Telefone:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.phone" placeholder="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" />
          </div>
        </div>
        <div class="field">
          <label class="label">E-mail:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.email" placeholder="E-mail" />
          </div>
        </div>
        <div class="field">
          <label class="label">Documento:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.document" placeholder="Documento" v-mask="['###.###.###-##', '##.###.###/####-##']" />
          </div>
        </div>
        <div class="field">
          <label class="label">excluídos:</label>
          <div class="select">
            <select v-model="form.trashed">
              <option :value="null">Sem excluídos</option>
              <option value="with">Com excluídos</option>
              <option value="only">Somente excluídos</option>
            </select>
          </div>
        </div>
      </search-filter> 
      <NuxtLink to="/clientes/novo" class="button is-primary mb-2">
        <span>Novo</span>
        <span class="is-hidden-touch">&nbsp;Cliente</span>
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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Documento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients.data" :key="client.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
              <td>
                <nuxt-link :to="{name: 'clientes-id', params : {id: client.id}}">
                  {{ client.name }}
                </nuxt-link>
              </td> 
              <td>
                {{ client.email }}
              </td>            
              <td>
                {{ client.phone }}
              </td>
              <td>
                {{ client.document }}
              </td>
              <td>
                <nuxt-link :to="{name: 'clientes-id', params : {id: client.id}}">                  
                  <i class="mdi mdi-24px mdi-chevron-right" ></i>
                </nuxt-link>
              </td>
            </tr>
            <tr v-if="clients.data.length === 0">
              <td colspan="3">Nenhum Cliente cadastrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :current_page="clients.current_page" 
        :last_page="clients.last_page"
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

export default {
  components: {
    Pagination,
    SearchFilter,
  },
  data() {
    return {
      form: {
        search: "",
        trashed: "",
        email: "",
        phone: "",
        document: "",
      },
      current_page: 1,
      clients: {
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

    this.$repositories.clients.all(query).then((res) => {
      this.clients = res.data
    }).catch((error) => {
      reject(error);
    })
  },
  fetchOnServer: false,
  methods: {
    reset() {
      this.form = mapValues(this.form, () => null)
    },
    pageChange(page) {
      this.current_page = page;
      this.clients.current_page = page;
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