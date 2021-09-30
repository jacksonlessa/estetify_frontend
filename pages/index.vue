<template>
  <div>
    <div class="columns is-mobile is-multiline">
      <indicator-card 
        title="Agenda Hoje"
        desc="Atendimentos"
        value="10"
        icon="mdi-cart-outline"
        link="/servicos"
      />
      <indicator-card 
        title="Agenda Semanal"
        desc="Atendimentos"
        value="45"
        icon="mdi-cart-outline"
      />
      <indicator-card 
        title="Faturamento Mensal"
        desc="Vendas"
        value="R$7,770"
        icon="mdi-cart-outline"
      />
      <first-steps />
      <conected-user />
    </div>
  </div>
</template>

<script>
import FirstSteps from "@/components/FirstSteps";
import ConectedUser from "@/components/Helpers/ConectedUser"
import IndicatorCard from "@/components/Layout/IndicatorCard"

export default {
  components: {
    FirstSteps,
    ConectedUser,
    IndicatorCard
  },
  data() {
    return {
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>