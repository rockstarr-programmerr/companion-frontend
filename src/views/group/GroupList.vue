<template>
  <v-container>
    <v-list v-if="!loadingList">
      <v-list-item
        v-for="group of groups"
        :key="group.pk"
      >
        <v-list-item-content>
          <span v-if="!group.editing">
            {{ group.name }}
          </span>
          <v-text-field
            v-else
            v-model="group.name"
            dense
            hide-details="auto"
            :autofocus="group.editing"
            :error-messages="group.nameErrs"
            :error-count="group.nameErrs.length"
          ></v-text-field>
        </v-list-item-content>

        <v-list-item-icon>
          <v-progress-circular
            v-if="group.loading"
            indeterminate
            color="primary"
            width="2"
            size="18"
            class="mt-1"
          ></v-progress-circular>
          <v-icon
            v-else-if="!group.editing"
            @click="setEditing({ pk: group.pk, editing: true })"
            color="primary"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            v-else
            @click="updateGroup(group)"
            color="primary"
          >
            mdi-check
          </v-icon>
        </v-list-item-icon>

        <v-list-item-icon>
          <v-icon
            color="primary"
            @click="prepareDelete(group)"
          >
            mdi-delete-outline
          </v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item v-if="noGroups">
        <v-list-item-content>
          (No groups yet)
        </v-list-item-content>
      </v-list-item>
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
      @click="createDialog = true"
    >
      New group
    </v-btn>

    <v-dialog
      v-model="createDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          New group
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent>  <!-- Form with only 1 input will reload page when submit with Enter, so we must prevent -->
            <v-text-field
              v-model="newGroupName"
              label="Name"
              :autofocus="createDialog"
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

    <v-dialog
      v-model="deleteDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          Are you sure to delete?
        </v-card-title>

        <v-card-text>
          Deleting group
          <span
            v-if="groupToDelete !== null"
            class="font-weight-bold"
          >
            {{ groupToDelete.name }}
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="primary"
            text
            :loading="loadingDelete"
            @click="deleteGroup"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters, mapMutations } from 'vuex'
import { unexpectedExc } from '@/utils'
import { GroupCreateReq, GroupUpdateReq } from '@/interfaces/api/group'
import { assertErrCode, status } from '@/utils/status-codes'
import { GroupWithState } from '@/interfaces/store/groups'
import { Group } from '@/interfaces/group'

@Component({
  computed: {
    ...mapGetters('groups', {
      groups: 'groups'
    })
  },
  methods: {
    ...mapMutations('groups', {
      setEditing: 'SET_EDITING',
      setLoading: 'SET_LOADING',
      setNameErrs: 'SET_NAME_ERRS'
    })
  }
})
export default class GroupList extends Vue {
  // eslint-disable-next-line no-undef
  [key: string]: unknown

  /**
   * Init groups
   */
  groups!: GroupWithState[]

  get noGroups (): boolean {
    return this.groups.length === 0
  }

  created (): void {
    this.listGroup()
  }

  /**
   * List
   */
  loadingList = true

  listGroup (): void {
    this.loadingList = true

    this.$store.dispatch('groups/list')
      .catch(unexpectedExc)
      .finally(() => {
        this.loadingList = false
      })
  }

  /**
   * Create
   */
  loadingCreate = false
  createDialog = false
  newGroupName = ''
  newGroupNameErrs: string[] = []

  createGroup (): void {
    if (this.loadingCreate) return
    this.loadingCreate = true
    this.resetCreateValidation()

    const payload: GroupCreateReq = {
      name: this.newGroupName
    }
    this.$store.dispatch('groups/create', payload)
      .then(() => {
        this.createDialog = false
        this.newGroupName = ''
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

  resetCreateValidation (): void {
    this.newGroupNameErrs = []
  }

  /**
   * Update
   */
  updateGroup (group: GroupWithState): void {
    if (group.loading) return
    this.setLoading({ pk: group.pk, loading: true })
    this.resetUpdateValidation(group)

    const pk = group.pk
    const payload: GroupUpdateReq = {
      name: group.name
    }

    this.$store.dispatch('groups/update', { pk, payload })
      .then(() => {
        this.setEditing({ pk: group.pk, editing: false })
      })
      .catch(error => {
        if (assertErrCode(error, status.HTTP_400_BAD_REQUEST)) {
          group.nameErrs = error.response.data.name || []
        } else {
          unexpectedExc(error)
        }
      })
      .finally(() => {
        this.setLoading({ pk: group.pk, loading: false })
      })
  }

  resetUpdateValidation (group: GroupWithState): void {
    this.setNameErrs({ pk: group.pk, errs: [] })
  }

  /**
   * Delete
   */
  loadingDelete = false
  deleteDialog = false
  groupToDelete: GroupWithState | null = null

  prepareDelete (group: GroupWithState): void {
    this.groupToDelete = group
    this.deleteDialog = true
  }

  deleteGroup (): void {
    if (this.loadingDelete || this.groupToDelete === null) return
    this.loadingDelete = true

    const pk = this.groupToDelete.pk
    this.$store.dispatch('groups/delete', pk)
      .then(() => {
        this.deleteDialog = false
        this.groupToDelete = null
      })
      .catch(unexpectedExc)
      .finally(() => {
        this.loadingDelete = false
      })
  }

  /**
   * Misc
   */
  setEditing!: ({ pk, editing }: { pk: Group['pk'], editing: boolean }) => void
  setLoading!: ({ pk, loading }: { pk: Group['pk'], loading: boolean }) => void
  setNameErrs!: ({ pk, errs }: { pk: Group['pk'], errs: string[] }) => void
}
</script>

<style scoped lang="scss">

</style>
