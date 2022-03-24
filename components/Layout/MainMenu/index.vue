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
      <li class="mb-3" v-if="user.role == 'admin'">
        <NuxtLink to="/servicos" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-content-cut" ></i>
          </span> <span class="menu-text">Serviços</span>
        </NuxtLink>
      </li>
      <li class="mb-3" v-if="user.role == 'admin'">
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
            <i class="mdi mdi-12px mdi-truck-delivery" ></i>
          </span> <span class="menu-text">Fornecedores</span>
        </NuxtLink>
      </li>
      <li class="mb-3" v-if="user.role == 'admin'">
        <NuxtLink to="/usuarios" class="simple-match">
          <span class="icon is-small">
            <i class="mdi mdi-12px mdi-account-group" ></i>
          </span> <span class="menu-text">Usuários</span>
        </NuxtLink>
      </li>
  
    </ul>
    <!-- <p class="menu-label">Fale conosco</p>
    <ul>
      <li class="mb-3">
       <NuxtLink to="/contato" class="simple-match">
          <span class="icon is-small"><fa :icon="['fab', 'telegram-plane']" /></span> <span class="menu-text">Contato</span>
        </NuxtLink>
      </li>
    </ul> -->
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
};
</script>

<style lang="scss">
@import "./index.scss";
</style>