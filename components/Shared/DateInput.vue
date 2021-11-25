
<template>
  <b-field :label="label"
    :type="{ 'is-danger': errors }"
    :message="errors">
    <b-datepicker v-model="date"
      :locale="locale"
      placeholder=""
      :range="isRange"
      >

    </b-datepicker>
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
    value: Date,
    label: String,
    errors: Array,
    isRange: Boolean,
  },
  data() {
    return {
      date: this.value,
      locale: "pt-BR",
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
    onChage() {
      
      // console.log(e)
    },
  },
  watch: {
    date: function() {
      this.$emit('input', this.date)
    }
  }
}
</script>
