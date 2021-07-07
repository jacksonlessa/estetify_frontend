<template>
  <div>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
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