<template>
  <div id="ships">
    <h1>Ships</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      {{ this.error }}
    </div>
    <div v-for="ship in this['ships/all']" :key="ship.ship_id">
      <router-link :to="{ name: 'Ship', params: { id: ship.ship_id } }">
        {{ ship.ship_name }}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Ships",
  created: function() {
    this.getShips();
  },
  computed: {
    error() {
      return this.$store.state.ships.error;
    },
    loading() {
      return this.$store.state.ships.loading;
    },
    ...mapGetters(["ships/all"])
  },
  methods: {
    getShips() {
      this.$store.dispatch("ships/getShips");
    }
  }
};
</script>

<style lang="scss"></style>
