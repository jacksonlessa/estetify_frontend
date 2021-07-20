<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/cadastro">Cadastro</NuxtLink></li>
      </ul>
    </div>
    <form method="post" @submit.prevent="login">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="email" required placeholder="e.g. alex@example.com">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password" required placeholder="********">
        </div>
      </div>

      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <button type="submit" class="button is-primary">Log in</button>
        <NuxtLink to="/login/esqueci-minha-senha">
          Esqueci minha senha
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  layout: 'centered',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password,
          device_name: 'simplebrowser'
        },
      })

     this.$router.push('/')
    },
  },
}
</script>