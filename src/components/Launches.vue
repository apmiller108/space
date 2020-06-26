<template>
  <section class="launches uk-section uk-section-muted">
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-large">Launches</h1>
      <div
        class="uk-card uk-card-hover uk-card-body"
        v-for="launch in this['launches/all']"
        :key="launch.launch_date_unix"
      >
        {{ launch.launch_date_utc }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Launches",
  created: function() {
    this.getLaunches();
  },
  components: {},
  computed: {
    ...mapGetters(["launches/all"])
  },
  methods: {
    getLaunches() {
      this.$store.dispatch("launches/getLaunches");
    }
  }
};
</script>

<style lang="scss"></style>
