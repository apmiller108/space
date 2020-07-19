<template>
  <div class="collapsible-text" ref="collapsibleText">
    <slot />
    <a
      class="uk-button uk-button-text toggle-text-button"
      :class="{ hidden: !showToggleButton }"
      @click.prevent="toggleText"
      ref="toggleButton"
      href="#"
    >{{ toggleButtonText }}
    </a>
  </div>
</template>

<script>
import shave from "shave";

export default {
  name: "CollapsibleText",
  data: function() {
    return {
      showToggleButton: false,
      toggleButtonText: "more"
    };
  },
  props: {
    maxHeightPx: {
      type: Number,
      default: function() {
        return 100;
      }
    },
    textContent: {
      type: String,
      default: function() {
        return "";
      }
    },
    isTogglable: {
      type: Boolean,
      default: function() {
        return true;
      }
    }
  },
  methods: {
    textElem() {
      return this.$refs.collapsibleText.children[0];
    },
    truncateText() {
      shave(this.textElem(), this.maxHeightPx);
      this.toggleButtonText = "more";
    },
    textIsTruncated() {
      // \u2026 is the Unicode for ellipsis. Shave library will add this character in a span.
      return this.textElem().children[0]?.textContent?.match(/\u2026/);
    },
    expandText() {
      this.textElem().textContent = this.textContent;
      this.toggleButtonText = "less";
    },
    toggleText() {
      this.$refs.toggleButton.blur();
      if (this.textIsTruncated()) {
        return this.expandText();
      }
      this.truncateText();
    }
  },
  mounted: function() {
    this.truncateText();
    this.showToggleButton = this.isTogglable && this.textIsTruncated();
  }
};
</script>

<style lang="scss" scoped>
.toggle-text-button {
  float: right;
  margin-right: 1em;
}
</style>
