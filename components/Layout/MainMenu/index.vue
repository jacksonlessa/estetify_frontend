<template>
  <div class="">
    <ul>
      <li class="mb-3">
        <NuxtLink to="/">
          <span class="icon is-small">
            <fa :icon="['fas', 'tachometer-alt']" />
          </span> <span class="menu-text">Dashboard</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/servicos">
          <span class="icon is-small"><fa :icon="['fas', 'box']" /></span> <span class="menu-text">Serviços</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/profissionais">
          <span class="icon is-small"><fa :icon="['far', 'id-card']" /></span> <span class="menu-text">Profissionais</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/clientes">
          <span class="icon is-small"><fa :icon="['far', 'address-book']" /></span> <span class="menu-text">Clientes</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/atendimentos">
          <span class="icon is-small"><fa :icon="['far', 'calendar-alt']" /></span> <span class="menu-text">Atendimentos</span>
        </NuxtLink>
      </li>
      <li class="mb-3">
        <NuxtLink to="/usuarios">
          <span class="icon is-small"><fa :icon="['fas', 'users']" /></span> <span class="menu-text">Usuários</span>
        </NuxtLink>
      </li>
  
    </ul>
    <p class="menu-label">Fale conosco</p>
    <ul>
      <li class="mb-3">
        <a>
          <span class="icon is-small"><fa :icon="['fab', 'telegram-plane']" /></span> <span class="menu-text">Contato</span>
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "MainMenu",
  components: {},
};
</script>
