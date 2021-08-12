
<template>
  <div>
    <label v-if="label" class="label" :for="id">{{ label }}:</label>
    <input 
      :id="id" 
      ref="input" 
      v-bind="$attrs" 
      class="input" 
      :class="{ 'is-danger': errors }" 
      :type="type" 
      :value="value"
      @input="$emit('input', $event.target.value)" />
    <div v-for="error in errors" :key="error" class="help is-danger">{{ error }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `text-input-${this._uid}`
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    value: String,
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