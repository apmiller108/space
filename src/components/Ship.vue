<template>
  <div id="ship">
    {{ ship }}
  </div>
</template>

<script>
export default {
  name: "Ship",
  props: {
    id: {
      type: String
    }
  },
  created: function() {
    this.getShip();
  },
  watch: {
    $route: "getShip"
  },
  computed: {
    ship() {
      return this.$store.state.ships.selected;
    }
  },
  methods: {
    getShip() {
      this.$store.dispatch("ships/getShip", this.id);
    }
  }
};
</script>

<style lang="scss"></style>
