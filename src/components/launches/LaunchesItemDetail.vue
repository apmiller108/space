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
      <CollapsibleText :text-content="launchDetails" :max-height-px="100">
        <p class="uk-text-lead launch-detail" ref="launchDetail">
          {{ launchDetails }}
        </p>
      </CollapsibleText>
    </div>
  </article>
</template>

<script>
import CollapsibleText from "@/components/CollapsibleText";

export default {
  name: "LaunchesItemDetail",
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
