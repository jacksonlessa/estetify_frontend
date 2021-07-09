<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><NuxtLink to="/login/esqueci-minha-senha">Esqueci minha senha</NuxtLink></li>
      </ul>
    </div>
    <h3 class="title is-5 mb-4">Esqueci minha senha</h3>
    <form>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="e.g. alex@example.com">
        </div>
      </div>

      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <button class="button is-primary">Enviar E-mail</button>
        <NuxtLink to="/login">
          Voltar
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  layout: 'centered',
  components: {
  },
}
</script>