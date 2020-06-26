<template>
  <div id="ship">
    {{ this["ships/selected"] }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Ship",
  props: {
    id: {
      type: String
    }
  },
  created: function() {
    this.selectShip();
  },
  watch: {
    $route: "selectShip"
  },
  computed: {
    ...mapGetters(["ships/selected"])
  },
  methods: {
    selectShip() {
      this.$store.dispatch("ships/selectShip", this.id);
    }
  }
};
</script>

<style lang="scss"></style>
