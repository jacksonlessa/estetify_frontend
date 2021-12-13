<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/cadastro">Cadastro</NuxtLink></li>
      </ul>
    </div>
    <form method="post" @submit.prevent="login">
      <div v-if="errorMessage" class='has-background-danger has-text-white mb-4 p-3'>
        {{errorMessage}}
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="email" required placeholder="e.g. alex@example.com">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <text-input v-model.trim="password" :type="'password'" required placeholder="********" password-reveal/>
        </div>
      </div>

      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <button type="submit" class="button is-primary">Log in</button>
        <NuxtLink to="/login/esqueci-minha-senha">
          Esqueci minha senha
        </NuxtLink>
      </div>
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    </form>
  </div>
</template>

<script>
import {detectBrowser} from "@/helpers/functions";

import TextInput from '@/components/Shared/TextInput'

export default {
  layout: 'centered',
  auth: false,
  components: {
    TextInput,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    }
  },
  methods: {
    async login() {
      try{
        this.isLoading = true;
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
            device_name: detectBrowser()+" - "+navigator.platform
          },
        }).then(() => this.handleLogin())
        
        
      }catch (e) {
        console.log('Error Response', e.response)
        if(e.response.statusText == "Unauthorized"){
          this.errorMessage = "Dados de acesso inválidos"
        }else{
          this.errorMessage = e.response.statusText
        }
      } 
      
      this.isLoading = false;

    },
    async handleLogin() {
      this.isLoading = false;

      if(this.$auth.user.account_id){ // if has account
        if(this.$auth.user.account.plan_id){ // if has a plan
          this.$router.push('/')
        }else{
          this.$router.push('/cadastro/plano')
        }
      }else{
        this.$router.push('/cadastro/conta')
      }
    }
  },
}
</script>