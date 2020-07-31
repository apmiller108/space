<template>
  <div :id="modalId" uk-modal @hidden="emitHidden">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalId: {
      type: String,
      required: true
    }
  },
  methods: {
    emitHidden() {
      this.$emit("hidden");
    }
  }
};
</script>
