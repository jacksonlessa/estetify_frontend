<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/atendimnetos">
        <div class="icon-text">
          <span class="icon mr-3">
            <fa :icon="['far', 'calendar-alt']" />
          </span>
          <span>Atendimento</span>
        </div>
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>
        Novo
      </span>
    </h1>
    <div class="card">
      <div class="card-content">
        <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
          {{errorMessage ? errorMessage : 'Um ou mais erros impedem a gravação, se você acha '}}
          
        </div>
        <div class="columns is-multiline is-tablet">
          <div class="field column py-0 is-6">
            <text-input v-model.trim="form.client" :errors="errors.client" label="Cliente" />
          </div>
          <div class="field column py-0 is-6">
            <select-input v-if="professionals" v-model="form.professional_id" :error="form.professional_id" label="Profissional">
              <option v-if="professionals.length>1" :value="null">Selecione um professional</option>
              <option v-for="professional in professionals" :key="professional.id" :value="professional.id">{{ professional.name }}</option>
            </select-input>
          </div>
          <div class="field column py-0 is-6">
            <text-input v-model.trim="form.service" :errors="errors.service" label="Serviços" />
          </div>
          <div class="field column py-0 is-6">
            <datetime-input v-model.trim="form.datetime" :errors="errors.datetime" label="Data e hora" />
          </div>
          
        </div>

        <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
          {{error}} <br/>
          se você está vendo esse erro entre em contato com a gente
        </div>

      </div>
      <footer class="card-footer">
        <NuxtLink to="/usuarios" class="card-footer-item has-text-link">Voltar</NuxtLink>
        <a @click="store" class="card-footer-item has-text-primary">Salvar</a>
      </footer>
    </div>
  </div>
</template>


<script>
import mapValues from 'lodash/mapValues'
import TextInput from '@/components/Shared/TextInput'
import SelectInput from '@/components/Shared/SelectInput'
import DatetimeInput from '@/components/Shared/DatetimeInput'
import MeetingSelector from '@/components/Shared/MeetingSelector'

export default {
  components: {
    TextInput,
    SelectInput,
    DatetimeInput,
    MeetingSelector
  },
  data() {
    return {
      form: {
        client: '',
        name: '',
        datetime: new Date(),
      },
      errors: {
        client: null,
        name: null,
        datetime: ["some dummy error","another dummy error"]
      },
      minDateTime: new Date(),
      hasError: false,
      errorMessage: '',
      user: this.$auth.user,
      item: null,
      professionals: null
    }
  },
  mounted(){
    this.loadProfessionals()
    
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.errors, () => null)
    },
    async loadProfessionals() {
      this.$repositories.professionals.all([]).then((res) => {
        this.professionals = res.data.data
        if (this.professionals.length == 1){
          this.form.professional_id = this.professionals[0].id
        }
      }).catch((error) => {
        console.log(error.response)
      })
    }
  }
}
</script>