<template>
  <div>
    <h3 class="title is-2 has-text-primary">Clientes</h3>

    <div class="mb-6 flex justify-between items-center">
      <search-filter v-model="form.search" class="w-full max-w-md mr-4" @reset="reset">
        <label class="block text-gray-700">Excluidos:</label>
        <div class="control">
          <select v-model="form.trashed" class="select">
            <option :value="null">Sem excluidos</option>
            <option value="with">Com excluidos</option>
            <option value="only">Somente excluidos</option>
          </select>
        </div>
      </search-filter> 
      <a class="btn is-primary" >
        <span>Novo</span>
        <span class="hidden md:inline">Cliente</span>
      </a>
    </div>
    <div>
      <div class="table-container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Documento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients.data" :key="client.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
              <td>
                {{ client.name }}
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
                >
              </td>
            </tr>
            <tr v-if="clients.length === 0">
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
      },
      current_page: 1,
      clients: {
        data: [],
        current_page: 1,
        last_page: 10,
      }



    }
  },
  async fetch() {

    let query = {}

    if(this.form.search)
      query.search = this.form.search
    if(this.form.trashed)
      query.trashed = this.form.trashed
    if(this.current_page)
      query.page = this.current_page

    this.$repositories.clients.all(query).then((res) => {
      this.clients = res.data
    }).catch((error) => {
      this.$router.replace({ name: "dashboard.customer.account-overview" });
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