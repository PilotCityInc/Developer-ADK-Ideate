<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :user-doc="userDoc"
      :team-doc="teamDoc"
      :user-type="userTypeStub"
      @inputTeamDoc="teamDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { ObjectId } from 'bson';
import Module from './Module/Module.vue';
import MongoDoc from './Module/types';

export default defineComponent({
  name: 'App',

  components: {
    Module
  },
  setup() {
    const programDocStub: Ref<MongoDoc> = ref({
      data: {
        adks: []
      },
      update: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const teamDoc: Ref<MongoDoc | null> = ref({
      data: {
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const userDoc: Ref<MongoDoc> = ref({
      data: {
        _id: new ObjectId(),
        firstName: 'Test First',
        lastName: 'Test Last',
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const userTypeStub = 'organizer';
    // if (userTypeStub === 'organizer') teamDoc.value = null;
    const readonly = ref(userTypeStub === 'stakeholder');

    return {
      programDocStub,
      userDoc,
      teamDoc,
      readonly,
      userTypeStub
    };
  }
});
</script>
