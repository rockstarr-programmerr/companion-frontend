<template>
  <v-container>
    <v-list v-if="!loadingList">
      <v-list-item-group>
        <v-list-item
          v-for="group of groups"
          :key="group.id"
        >
          <v-list-item-content>
            {{ group.name }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="noGroups">
          <v-list-item-content>
            (No groups yet)
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
    ></v-progress-circular>

    <v-btn
      depressed
      tile
      text
      color="primary"
      @click="dialog = true"
    >
      New group
    </v-btn>

    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title>
          New group
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newGroupName"
              label="Name"
              :error-messages="newGroupNameErrs"
              :error-count="newGroupNameErrs.length"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="primary"
            text
            :loading="loadingCreate"
            @click="createGroup"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Group } from '@/interfaces/group'
import { mapGetters } from 'vuex'
import { unexpectedExc } from '@/utils'
import { GroupCreateReq } from '@/interfaces/api/group'
import { assertErrCode, status } from '@/utils/status-codes'

@Component({
  computed: {
    ...mapGetters('groups', [
      'groups'
    ])
  }
})
export default class GroupList extends Vue {
  // eslint-disable-next-line no-undef
  [key: string]: unknown

  groups!: Group[]

  loadingList = true
  loadingCreate = false

  dialog = false
  newGroupName = ''
  newGroupNameErrs: string[] = []

  get noGroups (): boolean {
    return this.groups.length === 0
  }

  created (): void {
    this.listGroup()
  }

  listGroup (): void {
    this.loadingList = true

    this.$store.dispatch('groups/list')
      .catch(unexpectedExc)
      .finally(() => {
        this.loadingList = false
      })
  }

  createGroup (): void {
    if (this.loadingCreate) return
    this.loadingCreate = true
    this.resetValidation()

    const payload: GroupCreateReq = {
      name: this.newGroupName
    }
    this.$store.dispatch('groups/create', payload)
      .then(() => {
        this.dialog = false
      })
      .catch(error => {
        if (assertErrCode(error, status.HTTP_400_BAD_REQUEST)) {
          this.newGroupNameErrs = error.response.data.name || []
        } else {
          unexpectedExc(error)
        }
      })
      .finally(() => {
        this.loadingCreate = false
      })
  }

  resetValidation (): void {
    this.newGroupNameErrs = []
  }
}
</script>

<style scoped lang="scss">

</style>
