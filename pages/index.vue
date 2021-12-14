<template>
  <div>
    <div class="columns is-mobile is-multiline">
      <indicator-card 
        title="Agenda Hoje"
        desc="Atendimentos"
        :value="data.orders.day"
        icon="mdi-cart-outline"
        link="/servicos"
        :isLoading="isLoading"
      />
      <indicator-card 
        title="Agenda Semanal"
        desc="Atendimentos"
        :value="data.orders.week"
        icon="mdi-cart-outline"
        :isLoading="isLoading"
      />
      <indicator-card v-if="user.role == 'admin'"
        title="Faturamento Mensal"
        desc="Faturamento"
        :value="data.sales.month"
        icon="mdi-cart-outline"
        :isLoading="isLoading"
      />
      <indicator-card 
        title="Fechamento Diario"
        desc="Faturamento"
        :value="data.sales.day"
        icon="mdi-cart-outline"
        :isLoading="isLoading"
      />
      <!-- <first-steps />
      <conected-user /> -->
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
      isLoading: true,
      user: this.$auth.user,
      data: {
        orders:{
          day : null,
          week : null
        },
        sales:{
          day: null,
          month: null
        }
      }
    }
  },
  async fetch() {
    this.$repositories.dashboard.resume().then((res) => {
      this.isLoading=false
      this.data = res.data
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>