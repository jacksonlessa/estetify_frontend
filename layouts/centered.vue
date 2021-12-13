<template>
  <section class="page has-background-primary is-fullheight">
    <div class="page-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="custom-column">
            <div class="has-text-centered mb-4">
              <NuxtLink to="/" class="is-center">
                <Logo color="is-white"/>
              </NuxtLink>
            </div>
            <div class="box">
              <Nuxt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-foot ">
      <Copyright class="mb-4 has-text-white force-white"/>
    </div>    
  </section>
</template>

<script>
import Logo from "@/components/Layout/EstetifyLogo";
import Copyright from "@/components/Layout/Footer/copyright";

export default {
  components: {
     Copyright,
     Logo
  },
}
</script>

<style lang="scss">
@import "./centered.scss";
</style>