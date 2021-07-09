<template>
  <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink to="/dash" class="navbar-item is--brand">
        <Logo color="is-white" />
      </NuxtLink>

      <button class="button navbar-burger" v-bind:class="{'is-active': isActive}"  v-on:click="menuToggle()" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="navbar-menu navbar-end" id="navMenu"  v-bind:class="{'is-active': isActive}">
      <a class="navbar-item nav-tag">
        <span class="icon is-small has-background-grey-dark">
          <fa :icon="['far','envelope']" />
        </span>
        <span class="tag is-success counter">2</span>
      </a>
      <a class="navbar-item nav-tag">
        <span class="icon is-small has-background-grey-dark">
          <fa :icon="['far','bell']" />
        </span>
        <span class="tag is-danger counter">6</span>
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <fa :icon="['fas','user']" />&nbsp;          
          Olá, usuario
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item" href="https://mazipan.space/" target="_blank" rel="noopener noreferrer">
            <span class="icon is-small">
              <i class="fa fa-user-o"></i>
            </span>
            &nbsp; Profile
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item">
            <span class="icon is-small">
              <i class="fa fa-power-off"></i>
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
      isActive: false
    }
  },
  methods: {
    menuToggle: function() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
