<template>
    <div>
        <q-layout view="lHh Lpr lff">
            <q-page-container>
                <AlterMap></AlterMap>
            </q-page-container>
            <q-drawer mini-to-overlay v-model="DrawerOpen" :width="280" :breakpoint="500" overlay elevated>
                <q-scroll-area class="fit">
                    <q-list>
                        <ExAreaItems></ExAreaItems>
                    </q-list>
                </q-scroll-area>
            </q-drawer>
        </q-layout>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import AlterMap from "../components/AlterMap.vue";
import ExAreaItems from './ExAreaItems.vue';
const DrawerOpen = ref(true)

</script>

<style scoped>

</style>