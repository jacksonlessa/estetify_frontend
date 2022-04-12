<template>
  <div class="menu">
    <ul>
      <li class="mb-3">
        <NuxtLink to="/" class="exact-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-monitor-dashboard" ></i>
          </span> <span class="menu-text">Dashboard</span>
        </NuxtLink>
      </li>
      <li class="mb-3" v-if="adminMenu">
        <NuxtLink to="/servicos" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-content-cut" ></i>
          </span> <span class="menu-text">Serviços</span>
        </NuxtLink>
      </li>
      <li class="mb-3" v-if="adminMenu">
        <NuxtLink to="/profissionais" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-card-account-details" ></i>
          </span> <span class="menu-text">Profissionais</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/clientes" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-account-star-outline" ></i>
          </span> <span class="menu-text">Clientes</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/atendimentos" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-calendar-check" ></i>
          </span> <span class="menu-text">Atendimentos</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/fornecedores" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-truck" ></i>
          </span> <span class="menu-text">Fornecedores</span>
        </NuxtLink>
      </li>
      <li class="mb-3" v-if="showUsersMenu">
        <NuxtLink to="/usuarios" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-account-group" ></i>
          </span> <span class="menu-text">Usuários</span>
        </NuxtLink>
      </li>
  
    </ul>
    <p class="menu-label mt-5 mb-2">Fale conosco</p>
    <ul>
      <li class="mb-3">
       <a href="https://wa.me/5541995221932?text=Ol%C3%A1%2C+estou+usando+o+Estetify+e+gostaria+de+falar+com+voc%C3%AA" target="_blank">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-whatsapp"></i>
          </span> <span class="menu-text">Contato</span>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "MainMenu",
  components: {},
  data() {
    return {
      user: this.$auth.user,
    }
  },
  computed: {
    showUsersMenu: function () {
      return !this.isFreePlan() && this.adminMenu
    },
    adminMenu: function () {
      return this.user.role == 'admin'
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>