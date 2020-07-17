<template>
  <article class="uk-article launches-item-detail">
    <div class="header">
      <h1 class="uk-article-title">
        <a class="uk-link-reset" href="">{{ missionName }}</a>
      </h1>
    </div>
    <div class="meta">
      <p class="uk-article-meta launch-time-and-place">
        <span>{{ launchSiteName }}</span>
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
      <p class="uk-text-lead launch-detail" ref="launchDetail">
        {{ launchDetails }}
      </p>
      <a
        class="uk-button uk-button-text toggle-detail-text-button"
        :class="{ hidden: !showToggleButton }"
        @click.prevent="toggleDetailText"
        ref="toggleDetailTextButton"
        href="#"
        >{{ toggleDetailButtonText }}</a
      >
    </div>
  </article>
</template>

<script>
import shave from "shave";

export default {
  name: "LaunchesItemDetail",
  props: {
    launch: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      showToggleButton: false,
      toggleDetailButtonText: "more"
    };
  },
  computed: {
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
    }
  },
  methods: {
    truncateDetailText() {
      shave(this.$refs.launchDetail, 100);
      this.toggleDetailButtonText = "more";
    },
    detailTextIsTruncated() {
      // \u2026 is the Unicode for ellipsis. Shave library will add this character in a span.
      return this.$refs.launchDetail.children[0]?.textContent?.match(/\u2026/);
    },
    expandDetailText() {
      this.$refs.launchDetail.textContent = this.launchDetails;
      this.toggleDetailButtonText = "less";
    },
    toggleDetailText() {
      this.$refs.toggleDetailTextButton.blur();
      if (this.detailTextIsTruncated()) {
        return this.expandDetailText();
      }
      this.truncateDetailText();
    }
  },
  mounted: function() {
    this.truncateDetailText();
    this.showToggleButton = this.detailTextIsTruncated();
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
.detail-text {
  .launch-detail {
    margin: 0;
  }
  .toggle-detail-text-button {
    float: right;
    margin-right: 1em;
  }
}
</style>
