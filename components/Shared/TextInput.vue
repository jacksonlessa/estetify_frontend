
<template>
  <b-field :label="label"
  :type="{ 'is-danger': errors }"
  :message="errors">
    <b-input 
      :id="id" 
      ref="input"
      :type="type" 
      v-model="inputValue" 
      v-bind="$attrs"/>
  </b-field>
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
  data() {
    return {      
      inputValue: this.value,
    }
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
  watch: {
    inputValue: function() {
      this.$emit('input', this.inputValue)
    }
  }
}
</script>