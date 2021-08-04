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

    <form>
      <div class="card">
        <div class="card-content">
          <div class="columns is-multiline is-tablet">
            <text-input v-model="form.name" class="column py-0 is-6" label="Nome" />
            <text-input v-model="form.email" class="column py-0 is-6" label="E-mail" />
            <text-input v-model="form.phone" class="column py-0 is-6" label="Telefone" />
            <text-input v-model="form.document" class="column py-0 is-6" label="Documento" />
          </div>

        </div>
        <footer class="card-footer">
          <a @click="store" class="card-footer-item has-text-primary">Save</a>
          <NuxtLink href="#" to="/clientes" class="card-footer-item has-text-danger">Cancel</NuxtLink>
        </footer>
    </div>
    </form>
  </div>
</template>



<script>
import TextInput from '@/components/Shared/TextInput'
import { required } from "vuelidate/lib/validators";

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
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  methods: {
    async store() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert('Atenção, verifique se todas as informações estão corretas')
        return;
      }
      this.$repositories.clients.create(this.form)
      .then((res) => {
        this.clients = res.data
      }).catch((error) => {
        console.log(error)
        if (error.response) {
          if (error.response.status == 422) {
            console.log(error.response)
            this.$router.replace({
                name: "clientes",
            });
            return;
          }
          if (error.response.status == 401) {
            this.$router.replace({
                name: "clientes",
            });
            return;
          }
        }
      })
    },
  }
}
</script>