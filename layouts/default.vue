<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Footer/main";

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>