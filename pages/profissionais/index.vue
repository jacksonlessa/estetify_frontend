<template>
  <div>
    <h3 class="title is-2 has-text-primary">Profissionais</h3>
    <!-- <div class="mb-6 flex justify-between items-center">
      <search-filter v-model="form.search" class="w-full max-w-md mr-4" @reset="reset">
        <label class="block text-gray-700">Trashed:</label>
        <select v-model="form.trashed" class="mt-1 w-full form-select">
          <option :value="null" />
          <option value="with">With Trashed</option>
          <option value="only">Only Trashed</option>
        </select>
      </search-filter>
      <inertia-link class="btn-indigo" :href="route('contacts.create')">
        <span>Create</span>
        <span class="hidden md:inline">Contact</span>
      </inertia-link>
    </div> -->
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

export default {

  data() {
    return {
      form: {
        // search: this.filters.search,
        // trashed: this.filters.trashed,
      },
      services: []
    }
  },
  async fetch() {
    this.services = this.$repositories.services.all();

    this.$repositories.services.all().then((res) => {
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
}
</script>