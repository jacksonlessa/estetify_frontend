<template>
  <div>
    <form @submit.prevent="register">
      <div class="tabs is-fullwidth">
        <ul>
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li class="is-active"><NuxtLink to="/cadastro">Cadastro</NuxtLink></li>
        </ul>
      </div>
      <text-input v-model.trim="form.name" :errors="errors.name" label="Nome" />
      <text-input v-model.trim="form.email" :errors="errors.email" label="E-mail" :type="'email'" />
      <text-input v-model.trim="form.password" :errors="errors.password" label="Senha" :type="'password'" password-reveal/>
      <text-input v-model.trim="form.password_confirmation" :errors="errors.password_confirmation" label="Confirmar senha" :type="'password'" password-reveal/>


      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <b-button 
          tag="input"
          type="is-primary" 
          native-type="submit"
          value="Enviar"/>
      </div>
      <!-- <button class="button is-primary">Enviar</button> -->
    </form>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
import TextInput from '@/components/Shared/TextInput'
import mapValues from 'lodash/mapValues'
import {detectBrowser} from "@/helpers/functions"

export default {
  layout: 'centered',
  auth: false,
  components: {
    TextInput,
  },
  data() {
    return {
      form: {
        name: '',
        password: null,
        device_name: detectBrowser()+" - "+navigator.platform
        
      },
      errors: {
        name: null,
        password: null,
      },
      hasError: false,
      submitStatus: false,
      isLoading: false
    }
  },
  mounted() {
    console.log(this.$auth.strategy)
    this.$auth.strategy.token.reset()
  },
  methods: {
    async register() {
      try{
        this.hasError = false
        this.isLoading = true
        this.erros = mapValues(this.erros, () => null)
        await this.$axios.$get('../sanctum/csrf-cookie');
        const res = await this.$axios.post('register', this.form)

        console.log("res: ", res)
        if (res.status == 201){          
          this.$auth.setUserToken(res.data.token)
          
          return this.$router.push('/cadastro/conta')
        }
        
      }catch(error){
        this.hasError = true
        if (error.response.status == 422)
            this.errors = error.response.data.errors
      }
      this.isLoading = false
      
    }
  }
}
</script>