<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <Logo />
        </a>

        <a role="button" class="navbar-burger" v-bind:class="{'is-active': isActive}"  v-on:click="menuToggle()" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isActive}">
        <!-- <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div> -->

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/EstetifyLogo";

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
