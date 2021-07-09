<template>
  <section class="page has-background-primary is-fullheight">
    <div class="page-body">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-one-third-desktop is-half-tablet">
            <div class="has-text-centered mb-4">
              <NuxtLink to="/">
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
    <div class="page-foot has-text-white">
      <Copyright class="mb-4"/>
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
  .page{
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .page-body{
      flex-grow: 1;
      flex-shrink: 0;
      padding: 3rem 1.5rem;
    }
    .page-foot{
      flex-grow: 0;
      flex-shrink: 0;
    }

    &.is-fullheight{
      min-height: 100vh;
      .page-body{
        align-items: center;
        display: flex;
      }    
    }
  }
</style>