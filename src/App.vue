<template>
  <component :is="layout"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

@Component({
  components: {
    LayoutDefault
  }
})
export default class App extends Vue {
  get layout (): typeof Vue {
    const defaultLayout = LayoutDefault

    if (this.$route.meta !== undefined) {
      return this.$route.meta.layout || defaultLayout
    } else {
      return defaultLayout
    }
  }
}
</script>
