<template>
  <div :id="modalId" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <h2 class="uk-modal-title">{{ missionName }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "LaunchesItemDetail",
  props: {
    launch: {
      type: Object,
      default: function() {
        return {};
      }
    },
    modalId: {
      type: String
    }
  },
  computed: {
    missionName() {
      return this.launch.mission_name;
    }
  }
};
</script>
