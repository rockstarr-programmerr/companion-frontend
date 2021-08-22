<template>
  <v-container>
    <component
      :is="formComponent"
      @change-page="isLogin = !isLogin"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Login from './Login.vue'
import Register from './Register.vue'

@Component({
  components: {
    Login,
    Register
  }
})
export default class Auth extends Vue {
  isLogin = true

  get formComponent (): typeof Vue {
    return this.isLogin ? Login : Register
  }
}
</script>

<style scoped lang="scss">

</style>
