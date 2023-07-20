<template>
  <div
    id="quickstart-container"
    :class="[success
      ? 'success-background'
      : 'error-background']"
  >
    <cdr-img
      id="rei-img"
      class="rei-img"
      src="https://satchel.rei.com/media/img/header/rei-co-op-logo-black.svg"
      alt="REI Logo"
    />
    <cdr-text
      tag="h2"
      class="heading"
    >
      QuickStartPageComponent
    </cdr-text>

    <cdr-text
      id="msg"
      tag="p"
      class="para"
    >
      {{ getMessage() }}
    </cdr-text>
  </div>
</template>
<script>
import { CdrText, CdrImg } from '@rei/cedar';
import metrics from '@rei/metrics';

export default {
  name: 'QuickStartPageComponent',
  components: { CdrText, CdrImg },
  props: {
    success: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.metricsPageView();
  },
  methods: {

    getMessage() {
      return this.success
        ? "🤗 Congratulations! You've successfully created your first Alpine Vue app and are passing data to it from the controller! Great job! 🎉"
        : "🤔 Almost there! Looks like we're missing the data from the controller. Check the pageData value in the #modelData element and that your props are being passed correctly.";
    },
    metricsPageView() {
      metrics.view({ pageName: `{__PROJECT_NAME__}:home` });
    },
  },
};
</script>
<style lang="scss">
@import "@rei/cdr-tokens/dist/scss/cdr-tokens";

#quickstart-container {
  display: inline-block;
  margin: 0 0 10px 8px;
  padding: 100px;
  color: $cdr-color-text-button-primary;

  #rei-img {
    width: 70px;
    display: inline-block;
    margin: 0 10px 0 0;
  }

  .heading {
   @include cdr-text-heading-display-800;
   display: inline-block;
   vertical-align: middle;
  }

  .para {
    margin-bottom: 5px;
  }

  &.error-background {
    background-color: $cdr-color-text-message-error;
  }

  &.success-background {
    background-color: $cdr-color-text-success;
  }
}
</style>
