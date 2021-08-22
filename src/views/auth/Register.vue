<template>
  <v-card outlined>
    <v-card-title>
      Companion
    </v-card-title>

    <v-card-subtitle>
      Register
    </v-card-subtitle>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="name"
          label="Your name"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>

      <div>
        <span>Already have account?</span>
        <a
          href="#"
          @click="changePage"
        >
          Login
        </a>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="register"
        color="primary"
        depressed
        :loading="loading"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class Register extends Vue {
  name = ''
  password = ''
  showPassword = false
  loading = false

  register (): void {
    console.log('register')
  }

  @Emit('change-page')
  changePage (e: Event): Event { return e }
}
</script>

<style scoped lang="scss">

</style>
