<template>
  <section class="launches uk-section uk-section-muted">
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-large">Launches</h1>
      <span v-if="this['launches/isLoading']" uk-spinner="ratio: 4.5"></span>
      <div class="timeline">
        <LaunchesItem
          class="launch"
          v-for="launch in this['launches/all']"
          :launch="launch"
          :key="launch.launch_date_unix"
        >
        </LaunchesItem>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import LaunchesItem from "./LaunchesItem";

export default {
  name: "Launches",
  components: { LaunchesItem },
  created: function() {
    this.getLaunches();
  },
  computed: {
    ...mapGetters(["launches/all", "launches/isLoading"])
  },
  methods: {
    getLaunches() {
      this.$store.dispatch("launches/getLaunches");
    }
  }
};
</script>

<style lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  .timeline-item {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }
  .timeline-divider {
    height: 5rem;
    margin: -3rem auto;
  }
  .launch {
    width: 50%;
    position: relative;
    display: flex;
    &:nth-child(even) {
      margin-left: 50%;
      justify-content: flex-end;
      .timeline-item-date {
        left: -3.5rem;
        order: 1;
      }
      .timeline-item-tether {
        order: 2;
        margin: 0 1rem 0;
      }
      .timeline-item {
        order: 3;
      }
      .timeline-item-details {
        grid-template-columns: 66.6% auto;
        order: 3;
      }
      .mission-patch {
        order: 2;
      }
      .mission-overview {
        order: 1;
      }
    }
    &:nth-child(odd) {
      margin-right: 50%;
      justify-content: flex-start;
      .timeline-item-date {
        right: -3.5rem;
        order: 3;
      }
      .timeline-item-tether {
        order: 2;
        margin: 0 0 0 1rem;
      }
      .time-line-item {
        order: 1;
      }
      .timeline-item-details {
        grid-template-columns: 33.3% auto;
        order: 1;
      }
      .mission-patch {
        order: 1;
      }
      .mission-overview {
        order: 2;
      }
    }
  }
  .timeline-item-details {
    display: grid;
    height: 10rem;
    width: 30rem;
  }
  .timeline-item-tether {
    order: 2;
    .uk-dotnav {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      a {
        pointer-events: none;
      }
    }
  }
  .timeline-item-date {
    border-radius: 50%;
    border: 0.5rem solid black;
    width: 6rem;
    height: 6rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .month {
      text-transform: uppercase;
    }
  }
}
</style>
