<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/profissionais">
        <div class="icon-text">
          <span class="icon mr-3">
            <fa :icon="['far', 'id-card']" />
          </span>
          <span>Profissionais</span>
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
          <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
            Um ou mais erros impedem a gravação, se você acha 
          </div>
          <div class="columns is-multiline is-tablet">
            <div class="field column py-0 is-6">
              <text-input v-model.trim="form.name" :errors="errors.name" label="Nome" />
            </div>
          </div>

          <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
            {{error}} <br/>
            se você está vendo esse erro entre em contato com a gente
          </div>

        </div>
        <footer class="card-footer">
          <NuxtLink to="/profissionais" class="card-footer-item has-text-link">Voltar</NuxtLink>
          <a @click="store" class="card-footer-item has-text-primary">Salvar</a>
        </footer>
    </div>
    </form>
  </div>
</template>



<script>
import TextInput from '@/components/Shared/TextInput'
import mapValues from 'lodash/mapValues'

export default {
  components: {
    TextInput,
  },
  data() {
    return {
      form: {
        name: '',
      },
      errors: {
        name: null,
      },
      hasError: false,
      submitStatus: false,
      user: this.$auth.user,
      professional: null,
    }
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.errors, () => null)
      this.form.account_id = this.user.account_id;
      this.$repositories.professionals.create(this.form)
      .then((res) => {
        this.professional = res.data
        // name: 'clientes-id', params : {id: client.id}
        let msg = "Profissional salvo!";
        this.$router.push({name: 'profissionais-id', params : {msg: msg, id: this.professional.id}});

        console.log(res)
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
      })
    },
  }
}
</script>