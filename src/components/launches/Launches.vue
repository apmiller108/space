<template>
  <section class="launches uk-section uk-section-muted">
    <div class="uk-container uk-container-large">
      <h1 class="uk-heading-large">Launches</h1>
      <div class="timeline">
        <transition-group name="lift-off" tag="div">
          <LaunchesItem
            class="launch"
            v-for="launch in this['launches/all']"
            :launch="launch"
            :key="launch.launch_date_unix"
          >
          </LaunchesItem>
        </transition-group>
        <span v-if="this['launches/isLoading']" uk-spinner="ratio: 3.5"></span>
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
    if (this.$store.getters["launches/all"].length) return;
    this.getLaunches();
  },
  mounted: function() {
    this.downloadYoutubeAPI();
    window.onscroll = this.getLaunchesOnScroll;
  },
  computed: {
    ...mapGetters(["launches/all", "launches/isLoading"])
  },
  methods: {
    getLaunches() {
      this.$store.dispatch("launches/getLaunches");
    },
    getLaunchesOnScroll() {
      const atBottom =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (atBottom && !this["launches/isLoading"]) {
        this.getLaunches();
      }
    },
    downloadYoutubeAPI() {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/player_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }
};
</script>

<style lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  .timeline-item {
    width: 80%;
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
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
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
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
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
.lift-off-enter-active,
.lift-off-leave-active {
  transition: all 1s;
}
.lift-off-enter,
.lift-off-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
