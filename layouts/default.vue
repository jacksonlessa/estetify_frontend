<template>
  <div class="main_container">
    <div class="main">
      <div class="head">
        <div class="logo">
          <NuxtLink to="/" class="is-flex">
            <Logo color="is-white" />
          </NuxtLink>
          <div>

            <button class="button navbar-burger has-background-primary" v-bind:class="{'is-active': isMenuActive}" v-on:click="menuToggle()" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div id="navMenu" class="sidebar-mob" v-bind:class="{'is-active': isMenuActive}" v-on:click="menuToggle()">
          <div class="menu-panel">
            <main-menu/>
          </div>
        </div>
        <div class="navbar">
          <span>
            {{user.account.name}}
          </span>

          <div class="" id="user-nav"  v-bind:class="{'is-active': isUserMenuActive}">
            <!-- <a class="navbar-item nav-tag">
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
            </a> -->
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                  <span>
                      Olá, {{ userFirstName }}
                  </span>
                  <span class="icon is-small">
                    <fa :icon="['fas','angle-down']" />
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                  <!-- <div class="dropdown-item">
                    <NuxtLink to="/profile" class="navbar-item">
                      <span class="icon is-small">
                        <fa :icon="['fas','user']" />
                      </span>
                      &nbsp; Profile
                    </NuxtLink>
                  </div>
                  <hr class="navbar-divider" /> -->
                  <div class="dropdown-item">
                    <a class="navbar-item" @click.prevent="logout">
                      <span class="icon is-small">
                        <fa :icon="['fas','power-off']" />
                      </span>
                      &nbsp; Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="sidebar" id="navMenu" >
          <main-menu/>
        </div>
      
        <main class="content" id="main">
          <Nuxt />
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import Logo from "@/components/Layout/EstetifyLogo";
import Navbar from "@/components/Layout/Header/dash";
import MainMenu from "@/components/Layout/MainMenu";
import Copyright from "@/components/Layout/Footer/copyright";

export default {
  components: {
    Logo,
    Navbar,
    MainMenu,
    Copyright
  },
  data() {
    return {
      isMenuActive: false,
      isUserMenuActive: false,
      user: this.$store.state.auth.user,
    }
  },
  computed: {
    // a computed getter
    userFirstName: function () {
      return this.user.name.split(" ")[0]
    }
  },
  methods: {
    menuToggle: function() {
      this.isMenuActive = !this.isMenuActive;
    },
    userMenuToggle: function() {
      this.isUserMenuActive = !this.isUserMenuActive;
    },
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  }
}
</script>


<style lang="scss">
@import "./default.scss";
</style>