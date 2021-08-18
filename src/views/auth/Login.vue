<template>
  <v-container>
    <v-card outlined>
      <v-card-title>
        Companion
      </v-card-title>

      <v-card-subtitle>
        Login
      </v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name"
            label="Your name"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="login"
          color="primary"
          depressed
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  name = ''

  login (): void {
    console.log(this.name)
  }
}
</script>

<style scoped lang="scss">

</style>
