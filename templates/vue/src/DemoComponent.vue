<template>
  <<%&kebabComponentName%>-component />
</template>

<script lang="ts" setup>
import <%&camelComponentName%>Component from './<%&camelComponentName%>Component.vue';
</script>

<style lang="scss">
@import "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss";

body {
  padding: 0 1em;
}

#app {
  color: $cdr-color-text-primary;
  margin: 5em auto;
  max-width: 50em;
}
</style>
