<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center">
      <NuxtLink to="/fornecedores">
        <div class="icon-text">
          <span class="icon mr-3">
            <i class="mdi mdi-36px mdi-truck"></i>
          </span>
          <span>Fornecedores</span>
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
            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.name" :errors="errors.name" label="Nome" />
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.phone" :errors="errors.phone" label="Telefone" type="tel" v-mask="['(##) ####-####', '(##) #####-####']"/>
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.email" :errors="errors.email" label="E-mail" />
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.document" :errors="errors.document" label="Documento" type="tel" v-mask="['###.###.###-##', '##.###.###/####-##']"/>
            </div>
            <div class="field column pb-0 is-12">
              <text-input v-model="form.description" :value="form.description" type="textarea" :errors="errors.description" label="Observações"/>
            </div>
          </div>

          <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
            {{error}} <br/>
            se você está vendo esse erro entre em contato com a gente
          </div>

        </div>
        <footer class="card-footer">
          <NuxtLink to="/clientes" class="card-footer-item has-text-link">Voltar</NuxtLink>
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
        email: null,
        phone: null,
        document: null,
        description: null
      },
      errors: {
        name: null,
        email: null,
        phone: null,
        document: null,
        account_id: null,
      },
      hasError: false,
      submitStatus: false,
      user: this.$auth.user,
      item: null,
    }
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.form, () => null)
      this.form.account_id = this.user.account_id;
      this.$repositories.providers.create(this.form)
      .then((res) => {
        this.item = res.data.data
        // name: 'clientes-id', params : {id: client.id}
        let msg = "Fornecedor salvo!";
        this.$router.push({name: 'fornecedores-id',params : {msg: msg, id: this.item.id}});

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