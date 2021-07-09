<template>
  <nav class="menu active-menu--<%= activeMenu %>">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li>
        <a>
          <span class="icon is-small">
            <fa :icon="['fas', 'tachometer-alt']" />
          </span> <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </ul>
    <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'pencil-alt']" /></span> <span class="menu-text">Forms</span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'desktop']" /></span> <span class="menu-text">UI Elements</span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'table']" /></span> <span class="menu-text">Tables</span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'chart-bar']" /></span>
          <span class="menu-text">Presentations</span>
        </a>
      </li>
    </ul>

    <p class="menu-label">Live On</p>
    <ul class="menu-list">
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fas', 'bug']" /></span> <span class="menu-text">Additional Pages</span>
        </a>
      </li>
      <li>
        <a>
          <span class="icon is-small"><fa :icon="['fab', 'windows']" /></span> <span class="menu-text">Extras</span>
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
