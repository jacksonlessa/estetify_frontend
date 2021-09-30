<template>
  <div>
    <form @submit.prevent="registerAccount">
      <div class="tabs is-fullwidth">
        <ul>
          <li class="is-active"><NuxtLink to="/cadastro">Cadastro da conta</NuxtLink></li>
        </ul>
      </div>
      <b-message v-if="this.errorMsg" type="is-warning">
        {{this.errorMsg}}
      </b-message>
      <text-input v-model.trim="form.name" :errors="errors.name" label="Nome do estabelecimento" />

      <b-field>
            <b-switch v-model="souMei">sou MEI</b-switch>
      </b-field>
      <text-input v-if="souMei" v-model="form.document"  :errors="errors.document" label="CPF" v-mask="['###.###.###-##']" />
      <text-input v-if="!souMei" v-model="form.document"  :errors="errors.document" label="CNPJ" v-mask="['##.###.###/####-##']" />


      <select-input v-model="form.activity" :errors="errors.activity" label="Ramo de atividade">
        <option :value="null">Selecione um tipo</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select-input>
      <text-input v-if="form.activity=='Outro'" v-model="form.other_activity"  :errors="errors.other_activity" label="Outro ramo:" />

      <text-input v-model="form.phone"  :errors="errors.phone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" />
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
import SelectInput from '@/components/Shared/SelectInput'
import mapValues from 'lodash/mapValues'

export default {
  layout: 'centered',
  components: {
    TextInput,
    SelectInput,
  },
  data() {
    return {
      souMei: true,
      types: [
        "Salão de Beleza",
        "Barbearia",
        "Maquiadora",
        "Clinica de Estética",
        "Outro",
      ],
      form: {
        name: '',
      },
      errors: {
        name: null,
        password: null,
      },
      hasError: false,
      errorMsg: "",
      submitStatus: false,
      isLoading: false
    }
  },
  methods: {
    async registerAccount() {
      try{
        this.hasError = false
        this.isLoading = true
        this.erros = mapValues(this.erros, () => null)

        const res = await this.$repositories.accounts.create(this.form)
        
        console.log(res)
        if (res.status == 201){          
          // return this.$router.push('/cadastro/plano')
          await this.$auth.fetchUser()
          return this.$router.push('/')
        }
        
      }catch(error){
        this.hasError = true
        if (error.response){
          if (error.response.status == 422)
              this.errors = error.response.data.errors
              this.errorMsg = "Um ou mais campos possuem erros de validação"
          if (error.response.status == 403)
              this.errorMsg = "Acesso não autorizado"
        }
      }
      this.isLoading = false
    }
  }
}
</script>