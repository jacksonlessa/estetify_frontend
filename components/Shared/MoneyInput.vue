
<template>
  <div>
    <label v-if="label" class="label" :for="id">{{ label }}:</label>
    <money 
      :id="id" 
      ref="input" 
      v-bind="$attrs" 
      class="input" 
      :class="{ 'is-danger': errors }" 
      @input="$emit('input', $event)" />
    <div v-for="error in errors" :key="error" class="help is-danger">{{ error }}</div>
  </div>
</template>

<script>
// TODO Converter para buefy
import {Money} from 'v-money'

export default {
  components: {
    Money,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `money-input-${this._uid}`
      },
    },
    label: String,
    errors: Array,
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end)
    },
  },
}
</script>