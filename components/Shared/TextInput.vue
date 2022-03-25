
<template>
  <!-- :message="errors ? errors : message" -->
  <b-field :label="label"
  :type="{ 'is-danger': errors }"
  :message="messageToShow"
  >
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
    value: [String, Number],
    label: String,
    errors: Array,
    helperText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      inputValue: this.value,
    }
  },
  computed: {
    messageToShow() {
      let msg = ""
      if(this.helperText){
        msg = this.helperText
      }
      if(this.errors){
        msg = this.errors
      }
      return msg
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
    },
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        this.inputValue = newVal;
      }
    },
  },
  
}
</script>