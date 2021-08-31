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
            <text-input v-model.trim="form.email" :errors="errors.email" label="Profissional" />
          </div>
          <div class="field column py-0 is-6">
            <text-input v-model.trim="form.service" :errors="errors.service" label="Serviços" />
          </div>
          <div class="field column py-0 is-6">
            <text-input v-model.trim="form.date" :errors="errors.date" label="Data e hora" />
          </div>


         
          <div class="column is-12">
          <button class="is-2" @click="loadSchedule" >load schedule</button>
          <pre class="is-12">{{schedule}}</pre>

          </div>


          <div class="column is-6">
            <meeting-selector/>
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
import MeetingSelector from '@/components/Shared/MeetingSelector'

export default {
  components: {
    TextInput,
    MeetingSelector
  },
  data() {
    return {
      form: {
        client: '',
        name: '',
        password: ''
      },
      errors: {
        client: null,
        name: null,
      },
      hasError: false,
      errorMessage: '',
      submitStatus: false,
      user: this.$auth.user,
      item: null,
      schedule: null,
    }
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.errors, () => null)
    },
    async loadSchedule() {
      this.$repositories.professionals.schedule(11).then((res) => {
      this.schedule = res.data
    }).catch((error) => {
      console.log(error.response)
    })
    }
  }
}
</script>