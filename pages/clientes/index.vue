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
        <span>Criar</span>
        <span class="hidden md:inline">Serviço</span>
      </a>
    </div>
    <div>
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>            
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services.data" :key="service.id" class="hover:bg-gray-100 focus-within:bg-gray-100">
            <td>
              {{ service.name }}
            </td> 
            <td>
              {{ service.description }}
            </td>
            <td>
              {{ service.price }}
            </td>
            <td>
              >
            </td>
          </tr>
          <tr v-if="services.length === 0">
            <td colspan="3">Nenhum serviço cadastrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <pagination class="mt-6" :links="contacts.links" /> -->
  </div>
</template>


<script>
import axios from "axios";
import throttle from 'lodash/throttle'
import mapValues from 'lodash/mapValues'
import SearchFilter from '@/components/Shared/SearchFilter'

export default {
  components: {
    // Pagination,
    SearchFilter,
  },
  data() {
    return {
      form: {
        search: "",
        trashed: "",
      },
      services: []
    }
  },
  async fetch() {
    this.services = this.$repositories.services.all();

    this.$repositories.services.all(this.form).then((res) => {
      this.services = res.data
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
  },
  watch: {
    form: {
      deep: true,
      handler: throttle(function() {
        console.log(this.form);
        this.$fetch()
      }, 500),
    }
  }
}
</script>