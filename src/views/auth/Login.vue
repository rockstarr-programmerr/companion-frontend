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
          :loading="loading"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UserLoginReq } from '@/interfaces/api'

@Component
export default class Login extends Vue {
  name = ''
  loading = false

  login (): void {
    if (this.loading) return
    this.loading = true

    const payload: UserLoginReq = {
      username: this.name
    }

    this.$store.dispatch('users/login', payload)
      .then(() => {
        this.$router.push({ name: 'Home' })
      })
      .catch(console.error)
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped lang="scss">

</style>
