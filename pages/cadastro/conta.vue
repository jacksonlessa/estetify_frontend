<template>
  <div>
    <form @submit.prevent="registerAccount">
      <div class="tabs is-fullwidth">
        <ul>
          <li class="is-active"><NuxtLink to="/cadastro">Cadastro da conta</NuxtLink></li>
        </ul>
      </div>
      <text-input v-model.trim="form.name" :errors="errors.name" label="Nome do estabelecimento" />

      <b-field>
            <b-switch v-model="souMei">sou MEI</b-switch>
      </b-field>
      <text-input v-if="souMei" v-model="form.document"  :errors="errors.document" label="CPF" v-mask="['###.###.###-##']" />
      <text-input v-if="!souMei" v-model="form.document"  :errors="errors.document" label="CNPJ" v-mask="['##.###.###/####-##']" />


      <select-input v-model="form.type" :errors="errors.type" label="Tipo do estabelecimento">
        <option :value="null">Selecione um tipo</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select-input>
      <text-input v-if="form.type=='Outro'" v-model="form.outro"  :errors="errors.outro" label="Outro tipo:" />
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
import {detectBrowser} from "@/helpers/functions"

export default {
  layout: 'centered',
  auth: false,
  components: {
    TextInput,
    SelectInput,
  },
  data() {
    return {
      souMei: true,
      types: [
        "Barbearia",
        "Salão de Beleza",
        "Clinica de estética",
        "Maquiadora",
        "Outro",
      ],
      form: {
        name: '',
        password: null,
        
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
  methods: {
    async registerAccount() {

    }
  }
}
</script>