<template>
  <div>
    <div class="timeline-item uk-card uk-card-body">
      <div class="timeline-item-details">
        <div
          class="mission-patch"
          :style="{
            background: `url(${missionPatchSmall}) no-repeat center center`,
            'background-size': 'cover'
          }"
        ></div>
        <div class="mission-overview">
          {{ missionName }}
        </div>
      </div>
      <div class="timeline-item-tether">
        <ul class="timeline-item-tether uk-dotnav">
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
    <slot name="divider"></slot>
  </div>
</template>

<script>
export default {
  name: "LaunchesItem",
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
    }
  }
};
</script>

<style lang="scss"></style>
