<template>
  <div class="uk-container">
    <article v-if="launch" class="uk-article uk-container-xlarge">
      <div class="uk-article-title">
        {{ missionName }}
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
    </article>
    <alert
      v-else
      :alert-type="'danger'"
      :message="'Error loading launch.'"
      @hide="onAlertHide"
    >
      <router-link :to="{ name: 'Launches' }">Back to Launches</router-link>
    </alert>
  </div>
</template>

<script>
import SpacexLaunchResolvable from "@/mixins/SpacexLaunchResolvable";
import Alert from "@/components/Alert";
import { ExternalLinkIcon } from "@/assets/icons/icons";

export default {
  name: "LaunchesItemDetail",
  components: { Alert, ExternalLinkIcon },
  mixins: [SpacexLaunchResolvable],
  props: {
    flightNumber: {
      type: Number,
      required: true
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
  },
  methods: {
    onAlertHide() {
      this.$router.push({ name: "Launches" });
    }
  }
};
</script>

<style lang="scss"></style>
