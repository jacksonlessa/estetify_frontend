<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Header/main";
import Footer from "@/components/Layout/Footer/main";

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>