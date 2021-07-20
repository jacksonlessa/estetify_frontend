<template>
  <div>
    <div class="has-text-centered mb-4">
      <NuxtLink to="/">
        <Logo color="is-white"/>
      </NuxtLink>
    </div>
    <form>
      <div class="tabs is-fullwidth">
        <ul>
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li class="is-active"><NuxtLink to="/cadastro">Cadastro</NuxtLink></li>
        </ul>
      </div>
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nome">
        </div>
      </div>
      <div class="field">
        <label class="label">Telefone</label>
        <div class="control">
          <input class="input" type="tel" placeholder="(xx) xxxxx-xxxx)">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="e.g. alex@example.com">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirmar E-mail</label>
        <div class="control">
          <input class="input" type="email" placeholder="e.g. alex@example.com">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="********">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirmar senha</label>
        <div class="control">
          <input class="input" type="password" placeholder="********">
        </div>
      </div>

      <NuxtLink to="/dash" class="button is-primary">
        Enviar
      </NuxtLink>
      <!-- <button class="button is-primary">Enviar</button> -->
    </form>
  </div>
</template>

<script>
export default {
  layout: 'centered',
  auth: false,
  components: {

  },
}
</script>