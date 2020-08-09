<template>
  <div class="yt-video-player">
    <span
      v-if="!videoPlayerReady"
      uk-spinner="ratio: 2.5"
      class="video-player-loading-spinner"
    ></span>
    <div class="video-player-container" :id="videoPlayerId" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "YouTubeVideoPlayer",
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoPlayer: null,
      videoPlayerReady: false
    };
  },
  mounted() {
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
    videoPlayerId() {
      return `yt-video-${this.videoId}`;
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
        videoId: this.videoId,
        events: {
          onReady: this.setVideoPlayerReady,
          onStateChange: function() {
            console.log("YT player stateChange");
          }
        }
      });
    },
    setVideoPlayerReady() {
      this.videoPlayerReady = true;
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
.yt-video-player {
  position: relative;
}
.video-player-container {
  min-height: 300px;
  min-width: 540px;
}
.video-player-loading-spinner {
  position: absolute;
  color: red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
