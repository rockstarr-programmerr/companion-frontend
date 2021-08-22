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
          v-model="username"
          label="Your name"
          :error-messages="usernameErrs"
          :error-count="usernameErrs.length"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :error-messages="passwordErrs"
          :error-count="passwordErrs.length"
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
import { unexpectedExc } from '@/utils'
import { assertErrCode, status } from '@/utils/status-codes'
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class Register extends Vue {
  // eslint-disable-next-line no-undef
  [key: string]: unknown

  @Emit('change-page')
  changePage (e: Event): Event { return e }

  username = ''
  password = ''
  showPassword = false
  loading = false

  usernameErrs: string[] = []
  passwordErrs: string[] = []

  register (): void {
    if (this.loading) return
    this.loading = true
    this.resetForm()

    const payload = {
      username: this.username,
      password: this.password
    }

    this.$store.dispatch('users/register', payload)
      .then(() => {
        return this.$store.dispatch('users/login', payload)
      })
      .then(() => {
        this.$router.push({ name: 'GroupList' })
      })
      .catch(error => {
        if (assertErrCode(error, status.HTTP_400_BAD_REQUEST)) {
          const data = error.response.data
          Object.entries(data).forEach(([field, errMsgs]) => {
            const attr = `${field}Errs`
            this[attr] = errMsgs
          })
        } else {
          unexpectedExc(error)
        }
      })
      .finally(() => {
        this.loading = false
      })
  }

  resetForm (): void {
    this.usernameErrs = []
    this.passwordErrs = []
  }
}
</script>

<style scoped lang="scss">

</style>
