<template>
  <div class="uk-container">
    <article v-if="launch" class="uk-article uk-container-xlarge">
      <div class="uk-article-title">
        {{ missionName }}
      </div>
    </article>
    <alert
      v-else
      :alert-type="'danger'"
      :message="'Error loading launch.'"
      @hide="onAlertHide"
    >
      <router-link :to="{ name: 'Launches' }">Back to Launches</router-link>
    </alert>
  </div>
</template>

<script>
import SpacexLaunchResolvable from "@/mixins/SpacexLaunchResolvable";
import Alert from "@/components/Alert";

export default {
  name: "LaunchesItemDetail",
  components: { Alert },
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
  methods: {
    onAlertHide() {
      this.$router.push({ name: "Launches" });
    }
  }
};
</script>

<style lang="scss"></style>
