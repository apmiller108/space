<template>
  <article v-if="launch" class="uk-article launches-item-detail">
    <div class="header">
      <h1 class="uk-article-title">
        {{ missionName }}
      </h1>
    </div>
    <div class="meta">
      <p class="uk-article-meta launch-time-and-place">
        <span>
          <a
            class="uk-link-muted icon-link"
            :href="googleMapsUrl"
            target="_blank"
          >
            <span>{{ launchSiteName }}</span>
            <span class="small-icon">
              <ExternalLinkIcon />
            </span>
          </a>
        </span>
        <span>{{ launchDateUtc | date({ utc: true }) }}</span>
      </p>
      <div>
        <span
          class="uk-label"
          :class="{
            'uk-label-success': missionSuccess,
            'uk-label-danger': !missionSuccess
          }"
        >
          {{ missionStatus }}
        </span>
      </div>
    </div>
    <div class="detail-text">
      <CollapsibleText :text-content="launchDetails" :max-height-px="100">
        <p class="uk-text-lead launch-detail" ref="launchDetail">
          {{ launchDetails }}
        </p>
      </CollapsibleText>
    </div>
    <div class="detail-video">
      <YouTubeVideoPlayer :video-id="youtubeId" />
    </div>
  </article>
</template>

<script>
import CollapsibleText from "@/components/CollapsibleText";
import { ExternalLinkIcon } from "@/assets/icons/icons";
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer";
import store from "@/store/index";

export default {
  name: "LaunchesItemDetail",
  components: { CollapsibleText, ExternalLinkIcon, YouTubeVideoPlayer },
  props: {
    flightNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      launch: null
    };
  },
  beforeRouteEnter(to, _from, next) {
    // TODO: try to get launch from API when it's not available in the store.
    // TODO: Make the view responsive but keep it simple.
    // TODO: Build navigation.
    // TODO: Make parent Spacex route of which launches should be nested.
    const { flightNumber } = to.params;
    const launch = store.getters["launches/findByFlightNumber"](flightNumber);
    if (!launch) {
      return next({ name: "Launches" });
    }
    next(vm => {
      vm.launch = launch;
    });
  },
  computed: {
    googleMapsUrl() {
      return `https://maps.google.com/?q=${this.launchSiteName}`;
    },
    launchDateUtc() {
      return this.launch.launch_date_utc;
    },
    launchDetails() {
      return this.launch.details;
    },
    missionName() {
      return this.launch.mission_name;
    },
    launchSiteName() {
      return this.launch.launch_site?.site_name_long;
    },
    missionSuccess() {
      return this.launch.launch_success;
    },
    missionStatus() {
      return this.missionSuccess ? "Success" : "Failure";
    },
    youtubeId() {
      return this.launch.links?.youtube_id;
    }
  }
};
</script>

<style lang="scss" scoped>
.launch-time-and-place {
  span {
    display: block;
  }
}
.meta {
  display: flex;
  justify-content: space-between;
}
</style>

<style lang="scss">
.collapsible-text {
  .launch-detail {
    margin: 0;
  }
}
</style>
