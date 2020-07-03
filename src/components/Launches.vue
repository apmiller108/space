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
              <div
                class="mission-patch"
                :style="{
                  background: `url(${launch.links.mission_patch_small}) no-repeat center center`,
                  'background-size': 'cover'
                }"
              ></div>
              <div class="mission-overview">
                {{ launch.mission_name }}
              </div>
            </div>
            <div class="timeline-item-tether">
              <ul class="timeline-item-tether uk-dotnav">
                <li class="uk-active"><a href=""></a></li>
                <li class="uk-active"><a href=""></a></li>
                <li class="uk-active"><a href=""></a></li>
              </ul>
            </div>
            <div class="timeline-item-date">
              <div class="month">
                {{
                  launch.launch_date_utc | date({ format: "MMM", utc: true })
                }}
              </div>
              <div class="day">
                {{ launch.launch_date_utc | date({ format: "D", utc: true }) }}
              </div>
              <div class="year">
                {{
                  launch.launch_date_utc | date({ format: "YYYY", utc: true })
                }}
              </div>
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
