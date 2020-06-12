<template>
  <div id="history">
    <h1>History</h1>
    <div class="history">
      <ul>
        <li v-for="event in history" v-bind:key="event.id">
          {{ event.title }}
        </li>
      </ul>
      <button @click="getHistory()" :disabled="isShowingAllEvents">
        More
      </button>
    </div>
  </div>
</template>

<script>
import historyApi from "@/services/spacex/historyApi";

export default {
  name: "History",
  created: function() {
    this.getHistory();
  },
  data: function() {
    return {
      history: [],
      isShowingAllEvents: false
    };
  },
  computed: {},
  methods: {
    getHistory() {
      const offset = this.history.length;
      historyApi
        .getAll({ offset })
        .then(history => {
          if (history.length === 0) {
            this.isShowingAllEvents = true;
          }
          this.history = this.history.concat(history);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss">
.history {
  ul {
    list-style: none;
  }
}
</style>
