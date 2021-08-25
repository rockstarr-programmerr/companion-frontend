<template>
  <v-container>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else>
      <h1>{{ group.name }}</h1>
      <v-divider></v-divider>

      <section>
        <h2>
          Fund
          <v-btn
            icon
            right
            absolute
            id="fund-menu-activator"
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </h2>
        <v-menu
          activator="#fund-menu-activator"
          bottom
          offset-y
        >
          <v-list dense>
            <v-list-item
              ripple
            >
              Deposit to fund
            </v-list-item>
            <v-list-item
              ripple
            >
              Pay with fund
            </v-list-item>
          </v-list>
        </v-menu>
        <div>
          VNĐ 2.500.000
        </div>
      </section>
      <v-divider></v-divider>

      <section>
        <h2>Members</h2>
        <v-list>
          <v-list-item
            v-for="member of group.members"
            :key="member.pk"
          >
            <v-list-item-content>
              {{ member.username }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </section>
      <v-divider></v-divider>

      <section>
        <h2>History</h2>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              v-model="showDeposit"
              label="Deposit"
            ></v-checkbox>
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="showPayments"
              label="Payment"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-list>
          <v-list-item
            v-for="(transaction, index) of transactions"
            :key="index"
          >
            <v-list-item-content>
              {{ transaction }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </section>
    </div>
  </v-container>
</template>

<script lang="ts">
import { GroupWithState } from '@/interfaces/store/groups'
import { unexpectedExc } from '@/utils'
import { assertErrCode, status } from '@/utils/status-codes'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('groups', {
      group: 'currentGroup'
    })
  }
})
export default class GroupDetail extends Vue {
  @Prop(Number) readonly pk!: number

  group!: GroupWithState | undefined

  get loading (): boolean {
    return this.group === undefined
  }

  created (): void {
    this.getGroup()
  }

  getGroup (): void {
    this.$store.dispatch('groups/detail', this.pk)
      .catch(error => {
        if (assertErrCode(error, status.HTTP_404_NOT_FOUND)) {
          this.$router.push({ name: 'Http404' })
        } else {
          unexpectedExc(error)
        }
      })
  }

  showDeposit = true
  showPayments = true

  transactions = [
    'Trung deposit to VNĐ 500.000 to fund',
    'Fund paid VNĐ 300.000'
  ]
}
</script>

<style scoped lang="scss">

</style>
