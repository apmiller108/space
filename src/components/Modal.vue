<template>
  <div :id="modalId" uk-modal>
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
  }
};
</script>
