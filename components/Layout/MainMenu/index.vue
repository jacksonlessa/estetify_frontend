<template>
  <div class="menu">
    <ul>
      <li class="mb-3">
        <NuxtLink to="/" class="exact-match">
          <span class="icon is-small">
            <fa :icon="['fas', 'tachometer-alt']" />
          </span> <span class="menu-text">Dashboard</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/servicos" class="simple-match">
          <span class="icon is-small"><fa :icon="['fas', 'box']" /></span> <span class="menu-text">Serviços</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/profissionais" class="simple-match">
          <span class="icon is-small"><fa :icon="['far', 'id-card']" /></span> <span class="menu-text">Profissionais</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/clientes" class="simple-match">
          <span class="icon is-small"><fa :icon="['far', 'address-book']" /></span> <span class="menu-text">Clientes</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/atendimentos" class="simple-match">
          <span class="icon is-small"><fa :icon="['far', 'calendar-alt']" /></span> <span class="menu-text">Atendimentos</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/usuarios" class="simple-match">
          <span class="icon is-small"><fa :icon="['fas', 'users']" /></span> <span class="menu-text">Usuários</span>
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
};
</script>

<style lang="scss">
@import "./index.scss";
</style>