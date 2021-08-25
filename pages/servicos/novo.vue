<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/servicos">
        <div class="icon-text">
          <span class="icon mr-3">
            <fa :icon="['fas', 'box']" />
          </span>
          <span>Serviços</span>
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
          <div v-if="successMessage" class='has-background-success has-text-white mb-4 p-3'>
            {{successMessage}}
          </div>
          <div class="columns is-multiline is-tablet">
            <div class="field column py-0 is-6">
              <text-input ref="textInput" v-model.trim="form.name" :errors="errors.name" label="Nome" />
            </div>
            <div class="field column py-0 is-6">
              <text-input v-model.trim="form.description" :errors="errors.description" label="Descrição" />
            </div>
            <div class="field column py-0 i s-6">
              <money-input v-model.trim="form.price" v-bind="money" :errors="errors.price" label="Preço" />
            </div>
          </div>

          <div v-for="error in errors.account_id" :key="error" class='has-background-danger has-text-white mb-4 p-3'>
            {{error}} <br/>
            se você está vendo esse erro entre em contato com a gente
          </div>

        </div>
        <footer class="card-footer">
          <NuxtLink to="/servicos" class="card-footer-item has-text-link">Voltar</NuxtLink>
          <a @click="storeAction('new')" class="card-footer-item has-text-primary">Salvar e Novo</a>
          <a @click="storeAction()" class="card-footer-item has-text-primary">Salvar e Editar</a>
        </footer>
    </div>
    </form>
  </div>
</template>

<script>
import TextInput from '@/components/Shared/TextInput'
import MoneyInput from '@/components/Shared/MoneyInput'
import mapValues from 'lodash/mapValues'

export default {
  components: {
    MoneyInput,
    TextInput,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: '',
      },
      errors: {
        name: null,
        description: null,
        price: null,
        account_id: null,
      },
      hasError: false,
      successMessage: false,
      user: this.$auth.user,
      item: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
    }
  },
  methods: {
    async storeAction(action = 'edit') {
      this.hasError = false;
      this.successMessage = false
      this.errors = mapValues(this.errors, () => null)
      this.form.account_id = this.user.account_id;
      let res = await this.store()
      if (this.hasError)
        return;

      this.item = res.data

      if(action == 'new'){
        this.form = mapValues(this.form, () => '')
        this.$refs.textInput.$refs.input.focus()
        this.successMessage = "Serviço "+this.item.name+" salvo!";
        return;
      }

      let msg = "Serviço salvo!";
      this.$router.push({name: 'servicos-id', params : {msg: msg, id: this.item.id}});

    },

    async store(){
      try{
        return await this.$repositories.services.create(this.form)
      }catch(error){
        this.hasError = true;
        if (error.response.status == 422)
          this.errors = error.response.data.errors

        if (error.response.status == 401){
          //não autorizado
        }
        return;
      }
    }
  }
}
</script>