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
            <div class="field column py-0 is-6">
              <text-input v-model.trim="form.name" label="Nome" />
              <div v-if="submitStatus && !$v.form.name.required" class="help is-danger">Campo necessário</div>
              <div v-if="submitStatus && !$v.form.name.minLength" class="help is-danger" >Name must have at least {{$v.form.name.$params.minLength.min}} letters.</div>
            </div>
            <div class="field column py-0 is-6">
              <text-input v-model="form.email" label="E-mail" />
              <div v-if="error" class="help is-danger">{{ error }}</div>
            </div>
            <div class="field column py-0 is-6">
              <text-input v-model="form.phone" label="Telefone" />
              <div v-if="error" class="help is-danger">{{ error }}</div>
            </div>
            <div class="field column py-0 is-6">
              <text-input v-model="form.document" label="Documento" />
              <div v-if="error" class="help is-danger">{{ error }}</div>
            </div>
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    TextInput,
  },
  data() {
    return {
      form: {
        name: '',
        email: null,
        phone: null,
        document: null,
      },
      error: null,
      submitStatus: false
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
    },
  },
  methods: {
    async store() {
      this.submitStatus = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
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