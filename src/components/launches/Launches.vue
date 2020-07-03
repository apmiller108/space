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
          <template v-slot:divider>
            <hr class="uk-divider-vertical timeline-divider" />
          </template>
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
    width: 50%;
    justify-content: space-around;
  }
  .timeline-divider {
    height: 5rem;
    margin: -3rem auto;
  }
  .launch {
    &:nth-child(even) {
      .timeline-item {
        margin-left: 50%;
      }
      .timeline-item-date {
        left: -3rem;
        order: 1;
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
      .timeline-item {
        margin-right: 50%;
      }
      .timeline-item-date {
        right: -3rem;
        order: 3;
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
    border: 1px solid black;
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
