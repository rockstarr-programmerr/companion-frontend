<template>
  <v-container>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="group of groups"
          :key="group.id"
        >
          <v-list-item-content>
            {{ group.name }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

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
              v-model="name"
              label="Name"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="primary"
            text
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

@Component
export default class GroupList extends Vue {
  groups: Group[] = [
    { id: 1, name: 'Amazing group', members: [] },
    { id: 2, name: 'Good job group', members: [] }
  ]

  dialog = false

  name = ''

  createGroup (): void {
    console.log('createGroup')
  }
}
</script>

<style scoped lang="scss">

</style>
