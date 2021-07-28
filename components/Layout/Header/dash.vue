<template>
  <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink to="/" class="navbar-item is--brand">
        <Logo color="is-white" />
      </NuxtLink>

      <button class="button navbar-burger has-background-primary" v-bind:class="{'is-active': isActive}"  v-on:click="menuToggle()" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu navbar-end" id="navMenu"  v-bind:class="{'is-active': isActive}">
      <a class="navbar-item nav-tag">
        <span class="icon is-small has-background-grey-dark has-text-white">
          <fa :icon="['far','envelope']" />
        </span>
        <span class="tag is-success counter">2</span>
      </a>
      <a class="navbar-item nav-tag">
        <span class="icon is-small has-background-grey-dark has-text-white">
          <fa :icon="['far','bell']" />
        </span>
        <span class="tag is-danger counter">6</span>
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <fa :icon="['fas','user']" />&nbsp;
          Olá, {{ user.name }}
        </a>

        <div class="navbar-dropdown is-right">
          <NuxtLink to="/profile"  class="navbar-item">
            <span class="icon is-small">
              <fa :icon="['fas','user']" />
            </span>
            &nbsp; Profile
          </NuxtLink>
          <hr class="navbar-divider" />
          <a class="navbar-item" @click.prevent="logout">
            <span class="icon is-small">
              <fa :icon="['fas','power-off']" />
            </span>
            &nbsp; Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/Layout/EstetifyLogo";

export default {
  name: "Navbar",
  components: {
    Logo,
  },
  data() {
    return {
      isActive: false,
      user: this.$auth.user,
    }
  },
  methods: {
    menuToggle: function() {
      this.isActive = !this.isActive;
    },
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  }
};
</script>
