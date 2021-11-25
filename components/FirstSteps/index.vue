<template>
  <div class="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
    <article class="panel is-primary">
      <p class="panel-heading">
        Primeiros Passos
      </p>
      <label class="panel-block">
        <input type="checkbox">
        Cadastre seu primeiro&nbsp;<nuxt-link to="/servicos">serviço</nuxt-link>

      </label>
      <label class="panel-block checked">
        <input type="checkbox" checked>
        Cadastre seu primeiro&nbsp;<nuxt-link to="/clientes">cliente</nuxt-link>
      </label>
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth">
          Dispensar
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>