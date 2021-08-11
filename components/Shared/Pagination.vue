
<template>
  <div v-show="last_page>1" >
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a v-if="current_page!==from" class="pagination-previous is-hidden-touch" @click="$emit('pageChange',current_page-1)">Anterior</a>
      <a v-if="current_page!==last_page" class="pagination-next is-hidden-touch" @click="$emit('pageChange',current_page+1)">Próxima</a>
      <ul class="pagination-list">
        <li v-if="current_page-2>=from"><a class="pagination-link" @click="$emit('pageChange',from)" :aria-label="'ir para página '+from">1</a></li>
        <li v-if="current_page-3>=from"><span class="pagination-ellipsis">&hellip;</span></li> 
        <li v-if="current_page>from"><a class="pagination-link" @click="$emit('pageChange',current_page-1)" :aria-label="'ir para página '+current_page-1">{{current_page-1}}</a></li>
        <li><a class="pagination-link is-current" :aria-label="'Página atual: '+current_page" aria-current="página">{{current_page}}</a></li>
        <li v-if="current_page+1<=last_page"><a class="pagination-link" @click="$emit('pageChange',current_page+1)" :aria-label="'ir para página '+current_page+1">{{current_page+1}}</a></li>
        <li v-if="current_page+3<=last_page"><span class="pagination-ellipsis">&hellip;</span></li>
        <li v-if="current_page+2<=last_page"><a class="pagination-link" :aria-label="'ir para página '+last_page">{{last_page}}</a></li>
      </ul>
    </nav>
  </div>

</template>

<script>
export default {
  props: {
    current_page: Number,
    last_page: Number,
  },
  data(){
    return{
      from: 1
    }
  }
}
</script>