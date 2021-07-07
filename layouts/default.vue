<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
    
  </div>
</template>

<script>
import Navbar from "@/components/Main/Navbar";
import Footer from "@/components/Main/Footer";

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>