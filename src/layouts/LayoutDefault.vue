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

      <div v-if="isLoggedIn">
        {{ user.name }}
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters({
      user: 'users/loggedInUser',
      isLoggedIn: 'users/isLoggedIn'
    })
  }
})
export default class LayoutDefault extends Vue {

}
</script>
