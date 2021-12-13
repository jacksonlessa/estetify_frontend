<template>
  <div>
    <div>
      <div class="tabs is-fullwidth">
        <ul>
          <li class="is-active"><NuxtLink to="/reset-password">Resetar conta</NuxtLink></li>
        </ul>
      </div>

      <div v-if="successMsg" class='has-background-success has-text-white mb-4 p-3'>
        {{successMsg}}
      </div>
      <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
        {{errorMsg ? errorMsg : 'Um ou mais erros impedem a gravação, se você acha '}}
      </div>

      <text-input v-model.trim="form.email" :errors="errors.email" label="E-mail" :type="'email'"/>
      <text-input v-model.trim="form.password" :errors="errors.password" label="Senha" :type="'password'" password-reveal/>
      <text-input v-model.trim="form.password_confirmation" :errors="errors.password_confirmation" label="Confirmar senha" :type="'password'" password-reveal/>


      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <button @click="forgotPassword" class="button is-primary">Recuperar senha</button>
        <NuxtLink to="/login">
          Ir para o login
        </NuxtLink>
      </div>
    </div>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import TextInput from '@/components/Shared/TextInput'
import mapValues from 'lodash/mapValues'
export default {
  layout: 'centered',
  auth: false,
  components: {
    TextInput,
  },  
  data() {
    return {
      form: {
        email: '',
        token: '',
        password: ''
      },
      errors: {
        email: null
      },
      errorMsg: "",
      successMsg: "",
      isLoading: false
    }
  },
  mounted(){
    if (this.$route.query.token) {
      this.form.token = this.$route.query.token;
    }
  }, 
  methods: {
    async forgotPassword() {
      this.isLoading = true;
      this.errors = mapValues(this.erros, () => null)
      this.hasError = false;
      try{
        await this.$axios.$get('../sanctum/csrf-cookie');
        const res = await this.$axios.put('auth/reset-password', this.form)
        this.isLoading = false;
        
        this.successMsg = res.data.success
        this.form = mapValues(this.form, () => null)
      }catch(error){
        console.log(error)
        this.hasError = true
        if(error.response){
          if (error.response.status == 422)
            this.errors = error.response.data.errors
          if (error.response.status == 400)
            this.errorMsg = error.response.data.error
        }
      }
      this.isLoading = false;
    },
  },
}
</script>