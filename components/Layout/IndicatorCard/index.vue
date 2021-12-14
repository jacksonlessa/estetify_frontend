<template>
  <div class="column is-full-mobile is-half-tabletw is-one-third-widescreen is-one-quarter-fullhd">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{title}}
        </p>
      </header>
      <div class="card-content" v-if="!isLoading">
        <div class="level is-mobile">
          <div class="level-item">
            <div class="is-widget-label">
              <h3 class="subtitle is-spaced"> {{desc}} </h3>
              <h1 class="title">
                <div>{{value}}</div>
              </h1>
            </div>
          </div>
          <div class="level-item has-widget-icon">
            <div class="is-widget-icon">
              <span class="icon has-text-info is-large">
                <i class="mdi mdi-48px" :class="icon" ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer" v-if="link" >
        <nuxt-link :to="link" class="card-footer-item">Listar</nuxt-link>
      </footer>
      <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>