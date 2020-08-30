<template>
  <div :class="alertClass" uk-alert @hide="onHide">
    <a class="uk-alert-close" uk-close></a>
    <p>{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Alert",
  components: {},
  props: {
    alertType: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    alertClass() {
      return this.alertType ? `uk-alert-${this.alertType}` : "uk-alert";
    }
  },
  methods: {
    onHide() {
      this.$emit("hide");
    }
  }
};
</script>

<style lang="scss" scoped></style>
