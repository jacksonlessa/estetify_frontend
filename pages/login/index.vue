<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li class="is-active"><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/cadastro">Cadastro</NuxtLink></li>
      </ul>
    </div>
    <form>
      <div class="field">
        <label class="label">Email</label>
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

      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <NuxtLink to="/dash" class="button is-primary">
          Log in
        </NuxtLink>
        <!-- <button class="button is-primary">Log in</button> -->
        <NuxtLink to="/login/esqueci-minha-senha">
          Esqueci minha senha
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