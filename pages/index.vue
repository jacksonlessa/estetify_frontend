<template>
  <div class="content">
    <ul>
      <li><fa :icon="['far','lightbulb']" /></li>
      <li><fa :icon="['fas','lightbulb']" /></li>
      <li><fa :icon="['fab','github']" /></li>
      <li><fa icon="lightbulb" /></li>
    </ul>
    <div>
      <h3>Hi {{ user.name }}</h3>

      <a href="#" @click.prevent="logout">Sair</a>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'dash',
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