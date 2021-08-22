<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      flat
    >
      <div class="d-flex align-center">
        <div>Companion</div>
      </div>

      <v-spacer></v-spacer>

      <div>
        <v-progress-circular
          v-if="loading"
          indeterminate
        ></v-progress-circular>
        <span v-else>
          {{ user.username }}
        </span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { User } from '@/interfaces/user'
import { unhandledExc } from '@/utils'
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters({
      user: 'users/loggedInUser',
      hasUserInfo: 'users/hasUserInfo'
    })
  }
})
export default class LayoutDefault extends Vue {
  user!: User
  hasUserInfo!: boolean
  loading = false

  created (): void {
    this.setUserInfo()
  }

  setUserInfo (): void {
    if (!this.hasUserInfo) {
      this.loading = true
      this.$store.dispatch('users/getInfo')
        .catch(unhandledExc)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
