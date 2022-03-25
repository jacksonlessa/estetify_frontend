<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center">
      <NuxtLink to="/clientes">
        <div class="icon-text">
          <span class="icon mr-3">
            <i class="mdi mdi-36px mdi-account-star-outline"></i>
          </span>
          <span>Clientes</span>
        </div>
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>
        Novo
      </span>
    </h1>

    <form>
      <div class="card">
        <div class="card-content">
          <div v-if="hasError" class='has-background-danger has-text-white mb-4 p-3'>
            Um ou mais erros impedem a gravação, se você acha 
          </div>
          <div class="columns is-multiline is-tablet">
            <div class="field column pb-0 is-6">
              <text-input v-model.trim="form.name" :errors="errors.name" label="Nome" />
            </div>
            <div class="field column pb-0 is-6">
              <b-field label="Data de Aniversário">
                <b-datepicker
                  v-model="form.birthdate"
                  locale="pt-BR"
                  placeholder="Clique para selecionar"
                  icon="calendar-today"
                  :icon-right="form.birthdate ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus>
                </b-datepicker>
              </b-field>
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.phone" :errors="errors.phone" label="Telefone" type="tel" v-mask="['(##) ####-####', '(##) #####-####']"/>
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.email" :errors="errors.email" label="E-mail" />
            </div>
            <div class="field column pb-0 is-6">
              <text-input v-model="form.document" :errors="errors.document" label="Documento" type="tel" v-mask="['###.###.###-##', '##.###.###/####-##']"/>
            </div>
          </div>

          <div class="columns is-multiline is-tablet">
            <div class="field column pb-0 is-12">
              <hr>
              <h3 class="title is-4 mb-0">
                Endereço:
              </h3>
            </div>
            <div class="field column pb-0 is-8">
              <text-input v-model.trim="form.address" :errors="errors.address" label="Endereço" maxlength="255" helperText="Rua, número e complemento"/>
            </div>
            <div class="field column pb-0 is-4">
              <text-input v-model.trim="form.neighborhood" :errors="errors.neighborhood" label="Bairro" maxlength="50"/>
            </div>
            <div class="field column pb-0 is-7">
              <text-input v-model.trim="form.city" :errors="errors.city" label="Cidade" maxlength="50"/>
            </div>
            <div class="field column pb-0 is-2">
              <text-input v-model.trim="form.state" :errors="errors.state" label="Estado" maxlength="2"/>
            </div>
            <div class="field column pb-0 is-3">
              <text-input v-model.trim="form.postal_code" :errors="errors.postal_code" label="CEP" v-mask="['#####-###']"/>
            </div>
          </div>

          <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
            {{error}} <br/>
            se você está vendo esse erro entre em contato com a gente
          </div>

        </div>
        <footer class="card-footer">
          <NuxtLink to="/clientes" class="card-footer-item has-text-link">Voltar</NuxtLink>
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
        birthdate:null,
        account_id: null,
      },
      hasError: false,
      submitStatus: false,
      user: this.$auth.user,
      client: null,
    }
  },
  methods: {
    async store() {
      this.hasError = false;
      this.errors = mapValues(this.form, () => null)
      this.form.account_id = this.user.account_id;
      this.$repositories.clients.create(this.form)
      .then((res) => {
        this.client = res.data.data
        // name: 'clientes-id', params : {id: client.id}
        let msg = "Cliente salvo!";
        this.$router.push({name: 'clientes-id',params : {msg: msg, id: this.client.id}});

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
    clearDate () {
      this.form.birthdate = null
    }
  }
}
</script>