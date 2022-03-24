<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
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
        {{this.form.name}}
      </span>
    </h1>

    <form>
      <div class="card">
        <div class="card-content">
          <div v-if="successMessage" class='has-background-success has-text-white mb-4 p-3'>
            {{successMessage}}
          </div>
          <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
            Um ou mais erros impedem a gravação, se você acha 
          </div>
          <div class="columns is-multiline is-tablet">
            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.name" :value="form.name" :errors="errors.name" label="Nome" />
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.phone" :value="form.phone" :errors="errors.phone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']"/>
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.email" :value="form.email" :errors="errors.email" label="E-mail" />
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.document" :value="form.document" :errors="errors.document" label="Documento" v-mask="['###.###.###-##', '##.###.###/####-##']"/>
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
          <NuxtLink to="/fornecedores" class="card-footer-item has-text-link">Voltar</NuxtLink>
          <a @click="trash" v-if="!form.deleted_at" class="card-footer-item has-text-danger">Deletar</a>
          <a @click="restore" v-if="form.deleted_at" class="card-footer-item has-text-info">Restaurar</a>
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
      successMessage: null
    }
  },
  mounted(){
    if (this.$route.params.msg) {
      this.warningMessage = this.$route.params.msg;
    }
  }, 
  async fetch() {
    this.$repositories.providers.show(this.$route.params.id).then((res) => {
      this.form = res.data
    }).catch((error) => {
      //this.$router.replace({ name: "" }); @TODO add correct route
      // reject(error);
      if (error.response.status == 403) {
        let msg = "Ops, você não deveria tentar fazer isso"
        this.$router.push({name: 'providers', params: {msg: msg}})
        return;
      }
    })
  },
  methods: {
    async store() {
      this.successMessage = null
      this.hasError = false;
      this.errors = mapValues(this.form, () => null)
      this.$repositories.providers.update(this.form.id, this.form)
      .then((res) => {
        this.client = res.data
        this.successMessage = "Fornecedor atualizado com sucesso!";
        this.$fetch()
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
    async trash() {
      if(!confirm("Deseja deletar? Depois você pode restaurar"))
        return false;

      this.successMessage = null
      this.$repositories.providers.delete(this.form.id)
      .then((res) => {
        this.client = res.data;
        this.successMessage = "Fornecedor deletado, fique tranquilo, você pode ativa-lo novamente";
        this.$fetch()
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
    async restore() {
      this.successMessage = null
      this.$repositories.providers.restore(this.form.id)
      .then((res) => {
        this.client = res.data
        this.successMessage = "Fornecedor Restaurado";
        this.$fetch()
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
    }
  }
}
</script>