<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center">
      <NuxtLink to="/clientes">
        <div class="icon-text">
          <span class="icon">
            <fa :icon="['far', 'address-book']" />
          </span>
          <span>Clientes</span>
        </div>
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>
        Novo
      </span>
    </h1>

    <div class="card">
      
      <div class="card-content">
        <form @submit.prevent="store">
          <div class="columns is-multiline is-tablet">
            <text-input v-model="form.name" class="column py-0 is-6" label="Nome" />
            <text-input v-model="form.email" class="column py-0 is-6" label="E-mail" />
            <text-input v-model="form.phone" class="column py-0 is-6" label="Telefone" />
            <text-input v-model="form.document" class="column py-0 is-6" label="Documento" />
          </div>

        </form>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Cancel</a>
      </footer>
    </div>
  </div>
</template>



<script>
import TextInput from '@/components/Shared/TextInput'

export default {
  components: {
    TextInput,
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        document: null,
      }
    }
  }
}
</script>