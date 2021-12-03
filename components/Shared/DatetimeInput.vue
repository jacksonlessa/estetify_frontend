
<template>
  <b-field :label="label"
    :type="{ 'is-danger': errors }"
    :message="errors">
    
    <b-datetimepicker 
      v-model="datetime"
      ref="scheduled_at_calendar"
      :locale="locale"
      :min-datetime="minDateTime"
      :timepicker="timepicker"
      placeholder=""
      icon="calendar-today"
      :icon-right="datetime ? 'close-circle' : ''"
      icon-right-clickable
      @icon-right-click="datetime = null"
      >

      <template #left>
          <b-button
              :label="'Agora'"
              type="is-primary"
              :icon-left="'clock'"
              @click="datetime = new Date()" />
      </template>

      <template #right>
          <b-button
              label="Limpar"
              type="is-danger"
              icon-left="close"
              outlined
              @click="datetime = null" />
      </template>
    </b-datetimepicker>
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
    defaultValue: Date,
    label: String,
    errors: Array,
    minDateTime: Date,
  },
  data() {
    return {
      datetime: null,
      locale: "pt-BR",
      timepicker: {
        incrementMinutes: 10,
      }
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
    onChange() {
      // console.log(e)
    },
    clearDateTime () {
      this.selected = null
    }
  },
  watch: {
    datetime: function() {
      this.$emit('input', this.datetime)
    },
    defaultValue: function() {
      this.datetime = this.defaultValue
    },
  }
}
</script>
