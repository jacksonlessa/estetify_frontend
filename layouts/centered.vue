<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="column">
        <Nuxt />
      </div>
    </div>
    <div class="hero-foot">
      <Copyright class="mb-4"/>
    </div>    
  </section>
</template>

<script>
import Copyright from "@/components/Footer/copyright";
export default {
  components: {
     Copyright
  },
}
</script>