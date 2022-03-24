<template>
  <div class="fab-wrapper">
    <!-- list of actions -->
    <div>
      <ul class="additional-actions" v-bind:class="{'is-active': active}">
        <li>
          <b-tooltip label="Novo Cliente"
            position="is-left"
            type="is-link">
            <b-button 
              type="is-link" 
              rounded
              icon-right="account-star-outline"
              alt="Novo Cliente"
              icon-pack="mdi"
              v-on:click="routerPush('/clientes/novo')">
            </b-button>
          </b-tooltip>
        </li>
        <li>
          <b-tooltip label="Novo Atendimento"
            position="is-left"
            type="is-link">
            <b-button 
              
              type="is-link" 
              rounded
              icon-right="calendar-check"
              icon-pack="mdi"
              v-on:click="routerPush('/atendimentos/novo')">
            </b-button>
          </b-tooltip>
        </li>
      </ul>
    </div>
    <!-- expand button -->
    <div>
      <b-tooltip label="Ações rápidas"
            position="is-left">
        <b-button 
          class="expand-actions" v-bind:class="{'is-active': active}"
          type="is-primary" 
          size="is-medium" 
          rounded 
          icon-right="mdi mdi-36px mdi-plus"
          v-on:click="toggleAdditionalActions()">
        </b-button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fab",
  props: {
    color : String
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {
    toggleAdditionalActions: function() {
      this.active = !this.active;
    },
    routerPush: function(route) {
      this.active = false;
      this.$router.push({path: route});

    },
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

