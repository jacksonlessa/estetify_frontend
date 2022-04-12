<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/usuarios">
        <div class="icon-text">
          <span class="icon mr-3">
            <i class="mdi mdi-36px mdi-account-group"></i>
          </span>
          <span>Usuários</span>
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
              <b-field label="Papel"
                :type="{ 'is-danger': errors.role }"
                :message="errors.role">
                <b-select v-model="form.role" expanded>
                  <option>Selecione</option>
                  <option value="admin">Administrador</option>
                  <option value="receptionist">Recepcionista</option>
                </b-select>
              </b-field>
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.email" :value="form.email" :errors="errors.email" label="E-mail" :type="'email'" />
            </div>
            <div class="field column pb-0 is-12">
              <hr />
            </div>

            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.password" :errors="errors.password" label="Senha" :type="'password'" autocomplete="off"  password-reveal/>
            </div>

            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.password_confirmation" :errors="errors.password_confirmation" label="Confirmar senha" :type="'password'" autocomplete="off"  password-reveal/>
            </div>
          </div>

          <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
            {{error}} <br/>
            se você está vendo esse erro entre em contato com a gente
          </div>

        </div>
        <footer class="card-footer">
          <NuxtLink to="/usuarios" class="card-footer-item has-text-link">Voltar</NuxtLink>
          <a @click="trash" v-if="!form.deleted_at && this.$auth.user.id != form.id" class="card-footer-item has-text-danger">Deletar</a>
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
      },
      errors: {
        name: null,
        account_id: null,
      },
      hasError: false,
      submitStatus: false,
      successMessage: null
    }
  },
  mounted(){
    if (this.$route.params.msg) {
      this.successMessage = this.$route.params.msg;
    }
  },
  async fetch() {
    this.$repositories.users.show(this.$route.params.id).then((res) => {
      this.form = res.data
    }).catch((error) => {
      //this.$router.replace({ name: "" }); @TODO add correct route
      // reject(error);
      if (error.response.status == 403) {
        let msg = "Ops, você não deveria tentar fazer isso"
        this.$router.push({name: 'usuarios', params: {msg: msg}})
        return;
      }
    })
  },
  methods: {
    async store() {
      this.successMessage = null
      this.hasError = false;
      this.errors = mapValues(this.form, () => null)
      this.$repositories.users.update(this.form.id, this.form)
      .then((res) => {
        this.professional = res.data
        this.successMessage = "Usuário atualizado com sucesso!";
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
      this.$repositories.users.delete(this.form.id)
      .then((res) => {
        this.client = res.data;
        this.successMessage = "Usuário deletado, fique tranquilo, você pode ativa-lo novamente";
        this.$fetch()
      }).catch((error) => {
        if (error.response) {
          this.hasError = true;
          return;
        }
      })
    },
    async restore() {
      this.successMessage = null
      this.$repositories.users.restore(this.form.id)
      .then((res) => {
        this.client = res.data
        this.successMessage = "Usuário Restaurado";
        this.$fetch()
      }).catch((error) => {
        if (error.response) {
          this.hasError = true;
          return;
        }
      })
    }
  }
}
</script>