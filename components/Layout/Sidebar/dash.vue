<template>
  <nav class="menu active-menu--<%= activeMenu %>">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li>
        <NuxtLink to="/">
          <span class="icon is-small">
            <fa :icon="['fas', 'tachometer-alt']" />
          </span> <span class="menu-text">Dashboard</span>
        </NuxtLink>
      </li>
    </ul>
    <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li>
        <NuxtLink to="/servicos">
          <span class="icon is-small"><fa :icon="['fas', 'box']" /></span> <span class="menu-text">Serviços</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/profissionais">
          <span class="icon is-small"><fa :icon="['far', 'id-card']" /></span> <span class="menu-text">Profissionais</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/clientes">
          <span class="icon is-small"><fa :icon="['far', 'address-book']" /></span> <span class="menu-text">Clientes</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/atendimentos">
          <span class="icon is-small"><fa :icon="['far', 'calendar-alt']" /></span> <span class="menu-text">Atendimentos</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/usuarios">
          <span class="icon is-small"><fa :icon="['fas', 'users']" /></span> <span class="menu-text">Usuários</span>
        </NuxtLink>
      </li>
    </ul>

    <p class="menu-label">Fale com a Gente</p>
    <ul class="menu-list">
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'bug']" /></span> <span class="menu-text">Encontrou um erro?</span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fab', 'telegram-plane']" /></span> <span class="menu-text">Contato</span>
        </a>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "Sidebar",
  components: {},
};
</script>
