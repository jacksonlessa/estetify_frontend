<template>
  <div class="pricing-table is-horizontal">
    <div class="pricing-plan">
      <div class="plan-header">Pessoal</div>
      <div class="plan-items">
        <div class="plan-item">1 Usuário</div>
        <div class="plan-item">1 Profissional</div>
        <div class="plan-item">-</div>
        <div class="plan-item">-</div>
      </div>
      <div class="plan-footer">
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">R$</span>40</span>/mês</div>
        <button class="button is-fullwidth" disabled="disabled">Selecionado</button>
      </div>
    </div>

    <div class="pricing-plan is-active">
      <div class="plan-header">Pequeno</div>
      <div class="plan-items">
        <div class="plan-item">5 Usuários Storage</div>
        <div class="plan-item">5 Profissionais</div>
        <div class="plan-item">-</div>
        <div class="plan-item">-</div>
      </div>
      <div class="plan-footer">
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">R$</span>100</span>/mês</div>
        <button class="button is-fullwidth">Selecionar</button>
      </div>
    </div>

    <div class="pricing-plan">
      <div class="plan-header">Médio</div>
      <div class="plan-items">
        <div class="plan-item">10 Usuários</div>
        <div class="plan-item">15 Profissionais</div>
        <div class="plan-item">-</div>
        <div class="plan-item">-</div>
      </div>
      <div class="plan-footer">
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">R$</span>200</span>/mês</div>
        <button class="button is-fullwidth">Selecionar</button>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  layout: 'centered',
  auth: false,
  components: {
  },
  data() {
    return {

    }
  }
}
</script>