<template>
  <div>
    <Navbar />
    
    <div class="wrapper has-background-white-bis">
      <aside id="main-sidebar" class="aside" v-bind:class="{'closed': isClosed}">
        <Sidebar />
        <div id="sidebar-toggler" v-on:click="sidebarToggle()">
          <span class="icon is-small">
            <fa :icon="['fas', 'angle-double-left']" />
          </span>
        </div>
      </aside>
      
			<main class="main" id="main" v-bind:class="{'sidebar-closed': isClosed}">
        <Nuxt />
      </main>
      </div>
    <!-- <Footer /> -->
    <div class="copyright has-background-white-ter" v-bind:class="{'sidebar-closed': isClosed}">
      <Copyright />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Header/dash";
import Sidebar from "@/components/Layout/Sidebar/dash";
import Copyright from "@/components/Layout/Footer/copyright";

export default {
  components: {
    Navbar,
    Sidebar,
    Copyright
  },
  data() {
    return {
      isClosed: false
    }
  },
  methods: {
    sidebarToggle: function() {
      this.isClosed = !this.isClosed;
    }
  }
}
</script>


<style lang="scss">
@import "./dash.scss";
</style>