<template>
  <div class="launches-item">
    <div
      class="timeline-item uk-card uk-card-body uk-card-default uk-card-hover"
      @click="showLaunchItemDetail"
    >
      <div class="timeline-item-details">
        <div
          class="mission-patch"
          :style="{
            background: `url(${missionPatchSmall}) no-repeat center center`,
            'background-size': 'cover'
          }"
        ></div>
        <div class="mission-overview">
          <article class="uk-article">
            <h3 class="uk-article-title mission-name">
              {{ missionName }}
            </h3>
            <p class="uk-article-meta launch-site">
              {{ launchSiteName }}
            </p>
            <CollapsibleText
              :text-content="launchDetails"
              :max-height-px="75"
              :is-togglable="false"
            >
              <p class="launch-details">
                {{ launchDetails }}
              </p>
            </CollapsibleText>
          </article>
        </div>
      </div>
    </div>
    <div class="timeline-item-tether">
      <ul class="uk-dotnav">
        <li class="uk-active"><a href=""></a></li>
        <li class="uk-active"><a href=""></a></li>
        <li class="uk-active"><a href=""></a></li>
      </ul>
    </div>
    <div class="timeline-item-date">
      <div class="month">
        {{ launchDateUtc | date({ format: "MMM", utc: true }) }}
      </div>
      <div class="day">
        {{ launchDateUtc | date({ format: "D", utc: true }) }}
      </div>
      <div class="year">
        {{ launchDateUtc | date({ format: "YYYY", utc: true }) }}
      </div>
    </div>
  </div>
</template>

<script>
import CollapsibleText from "@/components/CollapsibleText";

export default {
  name: "LaunchesItem",
  components: { CollapsibleText },
  props: {
    launch: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    launchDateUtc() {
      return this.launch.launch_date_utc;
    },
    missionName() {
      return this.launch.mission_name;
    },
    missionPatchSmall() {
      return this.launch.links.mission_patch_small;
    },
    launchSiteName() {
      return this.launch.launch_site.site_name_long;
    },
    launchDetails() {
      return this.launch.details;
    },
    launchDateUnix() {
      return this.launch.launch_date_unix;
    },
    flightNumber() {
      return this.launch.flight_number;
    }
  },
  methods: {
    showLaunchItemDetail() {
      this.$emit("show-launch-item-detail", this.flightNumber);
    }
  }
};
</script>

<style lang="scss" scoped>
.launch-site {
  margin: 0;
}
.mission-name,
.launch-site {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
}
.mission-name {
  margin: 0;
}
.launch-site {
  margin: 0 0 1em;
}
.mission-patch {
  width: 10em;
  height: 10em;
}
.mission-overview {
  padding: 0 1em;
}
.timeline-item-details {
  overflow: hidden;
}
.timeline-item {
  cursor: pointer;
}
</style>
