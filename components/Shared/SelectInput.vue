<template>
  <b-field :label="label"
    :type="{ 'is-danger': errors }"
    :message="errors">
    <b-select :id="id" ref="input" v-model="selected" v-bind="$attrs" expanded>
      <slot />
    </b-select>
  </b-field>
</template>

<script>
// TODO Converter para buefy
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `select-input-${this._uid}`
      },
    },
    value: [String, Number, Boolean],
    label: String,
    error: String,
  },
  data() {
    return {
      selected: this.value,
    }
  },
  watch: {
    selected(selected) {
      this.$emit('input', selected)
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
  },
}
</script>