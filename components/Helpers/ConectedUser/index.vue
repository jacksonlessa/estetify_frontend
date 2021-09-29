<template>
  <div class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
    <article class="panel is-primary">
      <p class="panel-heading">
        Usuario
      </p>
      <div class="panel-block">
        <pre>{{ user }}</pre>
      </div>
      <div class="panel-block">
        <button @click.prevent="updateUser()" class="button is-link is-outlined is-fullwidth">
          Atualizar
        </button>
      </div>
    </article>
    
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      user: this.$store.state.auth.user,
    }
  },
  methods: {
    async updateUser() {
      await this.$auth.fetchUser()
    }
  },
}
</script>