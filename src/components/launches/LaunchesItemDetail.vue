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
import { mapGetters } from "vuex";

export default {
  name: "LaunchesItemDetail",
  components: { CollapsibleText, ExternalLinkIcon },
  props: {
    missionName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoPlayer: null,
      launch: null
    };
  },
  created() {
    // TODO: Open modal programatically when routed via browser controls.
    // TODO: Handle when Vuex doesn't have the launch anymore. Maybe redirect to list
    //       or retrieve from API.
    // TODO: Add the selected launch to store. Add getter for selected launch
    //       to Launches as reactive prop. Show modal when there is a selected launch.
    this.launch = this.$store.getters["launches/findByMissionName"](
      this.missionName
    );
  },
  mounted() {
    // TODO: extract YouTubeVideoPlayer component
    if (!this.isYoutubeReady) {
      window.onYouTubePlayerAPIReady = this.onYouTubePlayerAPIReady;
      this.downloadYoutubeAPI();
    } else {
      this.initVideoPlayer();
    }
  },
  beforeDestroy() {
    if (this.videoPlayer && this.videoPlayer.destroy) {
      this.videoPlayer.destroy();
    }
    delete this.videoPlayer;
  },
  computed: {
    ...mapGetters(["isYoutubeReady"]),
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
  },
  methods: {
    downloadYoutubeAPI() {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/player_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    onYouTubePlayerAPIReady() {
      this.$store.commit("setYoutubeApiLibraryLoaded", true);
    },
    initVideoPlayer() {
      this.videoPlayer = new window.YT.Player(this.videoPlayerId, {
        height: "300",
        width: "540",
        videoId: this.youtubeId,
        events: {
          onReady: function() {
            console.log("YT player ready");
          },
          onStateChange: function() {
            console.log("YT player stateChange");
          }
        }
      });
    }
  },
  watch: {
    isYoutubeReady: function(value) {
      if (value) {
        this.initVideoPlayer();
      }
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
