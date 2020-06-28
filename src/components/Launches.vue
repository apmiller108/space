<template>
  <section class="launches uk-section uk-section-muted">
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-large">Launches</h1>
      <span v-if="this['launches/isLoading']" uk-spinner="ratio: 4.5"></span>
      <div class="timeline">
        <div
          class="launch"
          v-for="launch in this['launches/all']"
          :key="launch.launch_date_unix"
        >
          <div class="timeline-item uk-card uk-card-body">
            <div class="timeline-item-details">
              {{ launch.mission_name }}
            </div>
            <div class="timeline-item-tether">
              <ul class="timeline-item-tether uk-dotnav">
                <li class="uk-active"><a href=""></a></li>
                <li class="uk-active"><a href=""></a></li>
                <li class="uk-active"><a href=""></a></li>
              </ul>
            </div>
            <div class="timeline-item-date">
              {{ launch.launch_date_utc | date({ utc: true }) }}
            </div>
          </div>
          <hr class="uk-divider-vertical" />
        </div>
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
    ...mapGetters(["launches/all", "launches/isLoading"])
  },
  methods: {
    getLaunches() {
      this.$store.dispatch("launches/getLaunches");
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
  .timeline-item {
    display: flex;
    width: 50%;
    justify-content: space-around;
  }
  .launch {
    &:nth-child(even) {
      .timeline-item {
        margin-left: 50%;
      }
      .timeline-item-date {
        left: -3em;
        order: 1;
      }
      .timeline-item-details {
        order: 3;
      }
    }
    &:nth-child(odd) {
      .timeline-item {
        margin-right: 50%;
      }
      .timeline-item-date {
        right: -3em;
        order: 3;
      }
      .timeline-item-details {
        order: 1;
      }
    }
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
    width: 6em;
    height: 6em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
