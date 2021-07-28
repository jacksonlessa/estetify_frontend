<template>
  <div class="field has-addons">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span>Filtros</span>
          <span class="icon is-small">
            <fa :icon="['fas', 'angle-down']" />
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item" :style="{ maxWidth: `${maxWidth}px` }">
            <slot />
          </div>
        </div>
      </div>
    </div>
    
    <div class="control">
      <input class="input" autocomplete="off" type="text" name="search" placeholder="Search…" :value="value" @input="$emit('input', $event.target.value)" />
    </div>
    <div class="control">
      <button class="button is-primary" type="button" @click="$emit('reset')">Reset</button>
    </div>
  </div>
</template>

<script>
// import Dropdown from '@/Shared/Dropdown'
export default {
  components: {
    // Dropdown,
  },
  props: {
    value: String,
    maxWidth: {
      type: Number,
      default: 300,
    },
  },
}
</script>