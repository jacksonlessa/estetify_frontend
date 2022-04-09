import Vue from 'vue'
Vue.mixin({
	methods: {
      isFreePlan() {
        // plano id 1 é o plano gratis
        return this.user.account.plan_id === 1;
      }
	}
})