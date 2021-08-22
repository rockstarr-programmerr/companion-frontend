<template>
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
          v-model="username"
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

      <div
        v-if="errorMsg !== ''"
        class="error--text mb-3"
      >
        {{ errorMsg }}
      </div>

      <div>
        <span>No account?</span>
        <a
          href="#"
          @click="changePage"
        >
          Register
        </a>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="login"
        color="primary"
        depressed
        :loading="loading"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { LoginReq } from '@/interfaces/api/user'
import { unexpectedExc } from '@/utils'
import { assertErrCode, status } from '@/utils/status-codes'

@Component
export default class Login extends Vue {
  username = ''
  password = ''
  showPassword = false
  loading = false
  errorMsg = ''

  login (): void {
    this.errorMsg = ''
    if (this.loading) return
    this.loading = true

    const payload: LoginReq = {
      username: this.username,
      password: this.password
    }

    this.$store.dispatch('users/login', payload)
      .then(() => {
        // TODO: implement ?next
        this.$router.push({ name: 'GroupList' })
      })
      .catch(error => {
        if (assertErrCode(error, status.HTTP_401_UNAUTHORIZED)) {
          this.errorMsg = error.response.data.detail
        } else {
          unexpectedExc(error)
        }
      })
      .finally(() => {
        this.loading = false
      })
  }

  @Emit('change-page')
  changePage (e: Event): Event { return e }
}
</script>

<style scoped lang="scss">

</style>
