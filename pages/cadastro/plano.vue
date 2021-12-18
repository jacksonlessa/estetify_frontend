<template>
  <div>
    <h2 class="title is-2 has-text-centered">Selecione um plano</h2>
    <h3 class="subtitle is-4 has-text-centered">Escolha o plano que se adeque melhor as suas necessidades e teste <b>grátis</b> por 30 dias</h3>
    <div class="pricing-table is-comparative">
      <div class="pricing-plan is-features">
      <div class="plan-header">Recursos</div>
      <div class="plan-price"><span class="plan-price-amount">&nbsp;</span></div>
      <div class="plan-items">
        <div class="plan-item" v-for="(feature, index) in features" :key="index">
          {{feature.name}}
          <b-tooltip v-if="feature.description" position="is-bottom" multilined>
            <i class="mdi mdi-information-outline mdi-18px has-text-primary"></i>
            <template v-slot:content>
              {{feature.description}}
            </template>
          </b-tooltip>
        </div>
      </div>
        <div class="plan-footer">

        </div>
      </div>
      <div v-for="(plan, index) in plans" :key="index" class="pricing-plan is-link" v-bind:class="{ 'is-active': selectedPlanID == plan.id }">
        <div class="plan-header">{{plan.name}}</div>
        <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">R$</span>{{plan.price}}</span>/mês</div>
        <div class="plan-items">
          <div v-for="(feature, slug) in plan.features" :key="index+'-'+slug" class="plan-item" :data-feature="features[slug].name">
            <span v-if="features[slug].type=='value'">
              {{feature}}
              <b-tooltip v-if="features[slug].description" position="is-bottom" multilined>
                <i class="mdi mdi-information-outline mdi-10px has-text-info"></i>
                <template v-slot:content>
                  {{features[slug].description}}
                </template>
              </b-tooltip>
            </span>
            <span v-if="features[slug].type=='boolean'">
              <i v-if="feature" class="has-text-primary mdi mdi-check-circle-outline mdi-18px"></i>
              <i v-if="!feature" class="has-text-danger mdi mdi-close-circle-outline mdi-18px"></i>              
              <b-tooltip class="is-hidden-tablet" v-if="features[slug].description" position="is-bottom" multilined>
                <i class=" mdi mdi-information-outline mdi-10px has-text-info"></i>
                <template v-slot:content>
                  {{features[slug].description}}
                </template>
              </b-tooltip>
            </span>
            
          </div>
        </div>
        <div class="plan-footer">
          <button class="button is-fullwidth" :disabled="selectedPlanID == plan.id" @click="selectPlan(plan.id)">
            {{selectedPlanID == plan.id ? "Escolhido": "Escolher"}}
          </button>
        </div>
      </div>
    </div>
    <div class="has-text-centered mt-5">
      <span class="mb-2 is-size-4">
        Voce escolheu o plano 
        <b class="has-text-primary is-size-3">{{selectedPlan.name}}</b>
      </span>
      <br/>
      <button class="button is-primary" @click="savePlan">
        Continuar
      </button>
    </div>

    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  
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
      selectedPlanID : 2,
      features:{
        professionals: {
          name: "Profissionais",
          type: "value"
        },
        services: {
          name: "Serviços",
          type: "boolean",
          description: "Possibilidade de cadastrar serviços e associá-los nos atendimentos dos seus clientes"
        },
        products: {
          name: "Produtos",
          type: "boolean",
          description: "Possibilidade de cadastrar produtos e associá-los nos atendimentos dos seus clientes"
        }
      },
      plans: [
        {
          name: "Básico",
          id: 1,
          price: 30,
          features: {
            professionals: 1,
            services: true,
            products: false
          }
        },
        {
          name: "Padrão",
          id: 2,
          price: 50,
          features: {
            professionals: 5,
            services: true,
            products: false
          }
        },
        {
          name: "Premium",
          id: 3,
          price: 100,
          features: {
            professionals: 10,
            services: true,
            products: true
          }
        },
      ],
      isLoading: false
    }
  },
  methods:{
    selectPlan : function(plan){
      this.selectedPlanID = plan;
    },
    async savePlan(){
      this.isLoading = true;
      const res = await this.$repositories.accounts.selectPlan(this.selectedPlan)
      
      
      if (res.status == 200){
        await this.$auth.fetchUser()
        return this.$router.push('/')
      }   
      
      this.isLoading = false;
    }
  },
  computed: {
    selectedPlan: function(){
      const selected = this.plans.filter(plan => {
        return(plan.id == this.selectedPlanID);
      })
      return selected[0]
    }
  }
}
</script>


<style lang="scss">
@import "./plano.scss";
</style>