<template>
  <div>
    <h1 class="title is-3 has-text-grey-dark is-flex is-align-items-center is-flex-wrap-wrap">
      <NuxtLink to="/atendimnetos">
        <div class="icon-text">
          <span class="icon mr-3">
            <fa :icon="['far', 'calendar-alt']" />
          </span>
          <span>Atendimento</span>
        </div>
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>
        Novo
      </span>
    </h1>
  </div>
</template>