<template>
  <div>
    <h3>Olá {{ user.name }}</h3>

    <a href="#" @click.prevent="logout">Sair</a>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      user: this.$auth.user,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>