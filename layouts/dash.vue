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
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Header/dash";
import Sidebar from "@/components/Layout/Sidebar/dash";
// import Footer from "@/components/Layout/Footer/dash";

export default {
  components: {
    Navbar,
    Sidebar,
    // Footer
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
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    z-index: 20;
  }
  .navbar-menu .nav-tag {
    position: relative;
    .icon{
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
    }
    .counter{
      border-radius: 50%;
      position: absolute;
      top: 5px;
      @media (min-width: 1024px){
        right: 0px;
      }
    }
  }
  .wrapper {
    height: 100vh;
  }
  .aside {
    padding: 2em .5em 0 .5em;
    height: calc(100vh - 58px);
    overflow: hidden;
    transition: 0.2s width ease-out;
    position: fixed;
    top: 58px;
    left: 0;
    z-index: 2;
    width: 250px;
    box-shadow: 2px 0 0 0 whitesmoke;

    &.closed{
      width: 60px;

      .menu-label, 
      .menu-text{
        display: none;
      }

      #sidebar-toggler .icon {
        transform: rotate(180deg);
        margin-right: -5px;
      }
    }
    .menu-list {
      a{
        display: block;
        padding: 0.5em 0.75em;
      }
      .icon,
      i{
        margin-right: 10px;
        margin-left: 3px;
      }
    }

    #sidebar-toggler{
      width: 100%;
      cursor: pointer;
      bottom: 0;
      left: 0;
      position: absolute;
      background-color: #00d1b2;
      padding: 1rem 2rem;
      display: flex;
      justify-content: flex-end;
      .icon {
          transition: 0.3s linear transform;
      }
    }
  }
  .main{
    padding: 70px 1em 2em 260px;
    min-height: calc(100vh - 58px);
    transition: 0.2s all ease-out;

    &.sidebar-closed{
      padding: 70px 1em 2em 70px;
    }
  }
  .footer{
    
  }
</style>