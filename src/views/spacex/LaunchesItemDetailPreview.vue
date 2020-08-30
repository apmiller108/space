<template>
  <article v-if="launch" class="uk-article launches-item-detail">
    <div class="header">
      <router-link :to="{ name: 'Launch', params: { flightNumber } }">
        <h1 class="uk-article-title">
          {{ missionName }}
        </h1>
      </router-link>
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
import SpacexLaunchResolvable from "@/mixins/SpacexLaunchResolvable";
import CollapsibleText from "@/components/CollapsibleText";
import { ExternalLinkIcon } from "@/assets/icons/icons";
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer";

export default {
  name: "LaunchesItemDetail",
  mixins: [SpacexLaunchResolvable],
  components: { CollapsibleText, ExternalLinkIcon, YouTubeVideoPlayer },
  props: {
    flightNumber: {
      type: Number,
      required: true
    }
  },
  created() {
    if (!this.launch) {
      this.$router.push({ name: "Launches" });
    }
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
.detail-text {
  margin: 0 0 1em;
}
</style>
