<template>
  <div class="component">
    <section class="component__header">
      <cdr-img
        class="component__header-img"
        src="https://www.rei.com/assets/test/climbers-site/cedar-logo/live.png"
        alt="REI logo"
      />
      <cdr-img
        class="component__header-img component__header-img--vue"
        src="https://www.rei.com/assets/test/climbers-site/vuejs-logo/live.png"
        alt="Vue.js logo"
      />
      <cdr-text class="component__header-text" tag="h1">
        {{ msg }}
      </cdr-text>
    </section>
    <section class="component__description">
      <cdr-text>
        This component was bootstrapped by the
        <code>@rei/create-package</code> initializer. It contains this
        component, which is imported into <code>DemoComponent.vue</code>.
        <code>DemoComponent.vue</code> is a simulated "page" component that
        functions as a test harness for this component. During development, the
        Vite development server will serve <code>index.html</code> and inject
        <code>main-dev.js</code>, which includes our
        <code>DemoComponent.vue</code> and ultimately this component.
      </cdr-text>
      <cdr-text>
        We use components from <code>@rei/cedar</code>, REI's open-source design
        system, to adhere to REI's themed experiences, and to keep a consistent
        look and feel.
      </cdr-text>
      <cdr-text>
        This component is configured to use <code>@rei/vite-base-config</code>,
        which is an Alpine Front-end supported Vite configuration. The config
        contains appropriate plugins, polyfills, and build settings required for
        REI's needs. We use Vite to build this component into a distributable
        library that can be consumed in larger Vue applications.
      </cdr-text>
      <cdr-text>
        Review your component's <code>README.md</code> for details on the NPM
        scripts included. Happy hacking!
      </cdr-text>
    </section>
    <section class="component__checklist">
      <cdr-text class="component__sub-header" tag="h2">
        Pre-publish checklist
      </cdr-text>
      <cdr-text>
        Use the check list to ensure your component follows the guidelines for
        component composition at REI
      </cdr-text>
      <cdr-form-group>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Shared dependencies should be declared as
            <code>peerDependencies</code>.
          </cdr-text>
          Components using <code>@rei/vite-base-config</code> externalize their
          dependencies by default. This allows consuming applications to
          tree-shake and de-duplicate dependencies at application build time. If
          your component uses a shared dependency, we'd like the application
          build to break if their versions are mismatched. Therefore, you should
          declare shared dependencies as <code>peerDependencies</code>.
        </cdr-checkbox>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Vendor and other imported styles are excluded from the built bundle.
          </cdr-text>
          Applications importing your component need to manually import vendor
          styles into their entry points to avoid CSS declaration duplication.
          Ensure there are no imported styles in <code>main.js</code>. All
          imported vendor styles (even Cedar) should live in
          <code>src/style/vendor.scss</code>. If your component imports another
          component, export those styles separately as well. For example, if
          this component used <code>@rei/carousel</code>, its styles would be
          imported in <code>src/style/rei-carousel.scss</code>.
        </cdr-checkbox>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Component is accessible.
          </cdr-text>
          REI has accessibility standards that your component must adhere to.
          Visit the "Accessibility" essential link to review.
        </cdr-checkbox>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Component has adequate unit tests.
          </cdr-text>
          The intializer scaffolds out a minimal test file in the
          <code>test</code> directory. Unit tests guarantee your component works
          the way you expect it to. Don't be stingy!
        </cdr-checkbox>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Component has a detailed <code>README.md</code>.
          </cdr-text>
          Consider the target consumers of your component. Your component's
          <code>README.md</code> should explain what your component does, how it
          does it, and how it should be used. Include API information.
        </cdr-checkbox>
        <cdr-checkbox size="large">
          <cdr-text tag="span" class="body-strong">
            Update your <code>RELEASE-NOTES.md</code>
          </cdr-text>
          Use the <code>RELEASE-NOTES.md</code> template to document incremental
          changes to your component. This can help smooth adoption of newly
          published versions.
        </cdr-checkbox>
      </cdr-form-group>
    </section>
    <section class="component__essential-links">
      <cdr-text class="component__sub-header" tag="h2">
        Essential links
      </cdr-text>
      <cdr-list modifier="inline">
        <li>
          <cdr-link
            target="_blank"
            href="https://github.com/rei/rei-cedar"
            modifier="standalone"
          >
            Cedar Design System
          </cdr-link>
        </li>
        <li>
          <cdr-link
            target="_blank"
            href="https://confluence.rei.com/display/FED/Accessibility"
            modifier="standalone"
          >
            Accessibility
          </cdr-link>
        </li>
        <li>
          <cdr-link
            target="_blank"
            href="https://git.rei.com/projects/CLIMB/repos/climbers-site/browse/FEBS-3-PATTERNS.md"
            modifier="standalone"
          >
            Front-end Build System (FEBS) Patterns
          </cdr-link>
        </li>
      </cdr-list>
    </section>
    <section class="component__ecosystem">
      <cdr-text class="component__sub-header" tag="h2">
        Ecosystem
      </cdr-text>
      <cdr-list modifier="inline">
        <li>
          <cdr-link
            target="_blank"
            href="https://vuejs.org/"
            modifier="standalone"
          >
            Vue
          </cdr-link>
        </li>
        <li>
          <cdr-link
            target="_blank"
            href="https://vitejs.dev/"
            modifier="standalone"
          >
            Vite
          </cdr-link>
        </li>
        <li>
          <cdr-link
            target="_blank"
            href="https://vitest.dev/"
            modifier="standalone"
          >
            Vitest
          </cdr-link>
        </li>
        <li>
          <cdr-link
            target="_blank"
            href="https://git.rei.com/projects/FEDPACK/repos/vite-base-config/browse"
            modifier="standalone"
          >
            Vite Base Config
          </cdr-link>
        </li>
      </cdr-list>
    </section>
  </div>
</template>

<script setup>
import {
  CdrText,
  CdrFormGroup,
  CdrCheckbox,
  CdrImg,
  CdrList,
  CdrLink,
} from '@rei/cedar';

defineProps({
  msg: {
    type: String,
    required: false,
    default: 'Hello, <%&camelComponentName%>Component!',
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@rei/cdr-tokens/dist/scss/cdr-tokens.scss";
.component {
  p:not(:last-child) {
    margin-bottom: 1em;
  }
  section {
    margin-bottom: 3em;
  }
  .body-strong {
    @include cdr-text-strong;
  }
  &__header {
    &-text {
      margin-top: 0.5em;
      @include cdr-text-heading-serif-strong-1000;
    }
    &-img--vue {
      margin-left: 1em;
      width: 6em;
    }
  }
  &__sub-header {
    @include cdr-text-subheading-sans-600;
  }
  &__header,
  &__sub-header {
    text-align: center;
    margin-bottom: 1em;
  }
  &__essential-links,
  &__ecosystem {
    ul {
      justify-content: center;
    }
  }
}
</style>
