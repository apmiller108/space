<template>
  <div class="uk-container">
    <article v-if="launch" class="uk-article uk-container-xlarge">
      <div class="uk-article-title">
        {{ missionName }}
      </div>
    </article>
    <span v-else uk-spinner="ratio: 3.5"></span>
    {{ launch }}
  </div>
</template>

<script>
import SpacexLaunchResolvable from "@/mixins/SpacexLaunchResolvable";

export default {
  name: "LaunchesItemDetail",
  mixins: [SpacexLaunchResolvable],
  props: {
    flightNumber: {
      type: Number,
      required: true
    }
  },
  computed: {
    missionName() {
      return this.launch.mission_name;
    }
  },
  methods: {}
};
</script>

<style lang="scss"></style>
