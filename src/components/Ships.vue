<template>
  <div id="ships">
    <h1>Ships</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      {{ this.error }}
    </div>
    <div v-for="ship in ships" :key="ship.ship_id">
      {{ ship.ship_name }}
    </div>
  </div>
</template>

<script>
import shipsApi from "@/services/shipsApi";

export default {
  name: "Ships",
  data: function() {
    return {
      loading: false,
      error: null,
      ships: []
    };
  },
  created: function() {
    this.getShips();
  },
  methods: {
    async getShips() {
      try {
        this.error = null;
        this.loading = true;
        this.ships = await shipsApi.getAll();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss"></style>
