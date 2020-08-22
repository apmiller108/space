<template>
  <div>
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
  computed: {},
  methods: {}
};
</script>

<style lang="scss"></style>
