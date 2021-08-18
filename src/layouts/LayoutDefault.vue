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

      <v-btn
        icon
      >
        <v-icon>
          mdi-account-outline
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LayoutDefault extends Vue {

}
</script>
