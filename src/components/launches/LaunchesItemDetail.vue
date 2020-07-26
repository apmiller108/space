<template>
  <article class="uk-article launches-item-detail">
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
      <div :id="videoPlayerId" />
    </div>
  </article>
</template>

<script>
import CollapsibleText from "@/components/CollapsibleText";
import { ExternalLinkIcon } from "@/assets/icons/icons";

export default {
  name: "LaunchesItemDetail",
  components: { CollapsibleText, ExternalLinkIcon },
  props: {
    launch: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      videoPlayer: null
    };
  },
  mounted() {
    this.videoPlayer = new window.YT.Player(this.videoPlayerId, {
      height: "300",
      width: "540",
      videoId: this.youtubeId,
      events: {
        onReady: function() {
          console.log("ready");
        },
        onStateChange: function() {
          console.log("stateChange");
        }
      }
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
    launchSiteName() {
      return this.launch.launch_site.site_name_long;
    },
    missionName() {
      return this.launch.mission_name;
    },
    missionSuccess() {
      return this.launch.launch_success;
    },
    missionStatus() {
      return this.missionSuccess ? "Success" : "Failure";
    },
    youtubeId() {
      return this.launch.links.youtube_id;
    },
    videoPlayerId() {
      return `launch-video-${this.youtubeId}`;
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
