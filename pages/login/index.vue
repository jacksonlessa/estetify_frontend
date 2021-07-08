<template>
  <div class="column is-half is-offset-one-quarter">
    <div class="has-text-centered mb-4">
      <Logo color="is-white"/>
    </div>
    <form class="box">
      <div>
      </div>
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

      <button class="button is-primary">Log in</button>
    </form>
  </div>
</template>

<script>
import Logo from "@/components/EstetifyLogo";
export default {
  layout: 'centered',
  components: {
    Logo,
  },
}
</script>