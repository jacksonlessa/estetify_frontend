<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><NuxtLink to="/login/esqueci-minha-senha">Esqueci minha senha</NuxtLink></li>
      </ul>
    </div>
    <div>
      <div v-if="successMsg" class='has-background-success has-text-white mb-4 p-3'>
        {{successMsg}}
      </div>
      <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
        {{errorMsg ? errorMsg : 'Um ou mais erros impedem a gravação, se você acha '}}
      </div>
      <text-input v-model.trim="form.email" :errors="errors.email" label="E-mail" :type="'email'"/>


      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <button @click="forgotPassword" class="button is-primary">Recuperar senha</button>
        <NuxtLink to="/login">
          Voltar
        </NuxtLink>
      </div>
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    </div>
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
        email: ''
      },
      errors: {
        email: null
      },
      hasError: false,
      errorMsg: "",
      successMsg: "",
      isLoading: false,
    }
  },
  methods: {
    async forgotPassword() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = mapValues(this.erros, () => null)
      try{

        await this.$axios.$get('../sanctum/csrf-cookie');
        const res = await this.$axios.put('auth/recover-password', this.form)
        // res.success
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
      this.isLoading=false

    },
  },
}
</script>