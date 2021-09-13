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
    errors: Array,
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