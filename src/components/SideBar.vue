<template>
    <div>
        <q-layout view="lHh Lpr lff">
            <q-page-container>
                <AlterMap></AlterMap>
            </q-page-container>
            <q-drawer :mini="miniState" :mini-width="56" @click.capture="drawerClick" mini-to-overlay v-model="DrawerOpen" :width="280"
                :breakpoint="500" overlay elevated>
                <q-item style="padding-left: 10;!important" clickable v-ripple>
                    <q-item-section class="q-ml-ms" avatar>
                        <q-avatar round>
                            <img style="max-width:80%;height:auto;" src="/ask.png"/>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section class="text-center">
                        <q-item-label class="text-weight-bold">遥感影像在线分割</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-list class="q-pb-md">
                    <ExAreaItems></ExAreaItems>
                </q-list>
                <div class="q-mini-drawer-hide absolute " style="top: 300px; right: -24px">
                    <q-btn dense rounded unelevated padding="xs" text-color="black" color="white" icon="chevron_left"
                        @click="miniState = true" />
                </div>
            </q-drawer>
        </q-layout>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import AlterMap from "../components/AlterMap.vue";
import ExAreaItems from './ExAreaItems.vue';
const DrawerOpen = ref(true)
const miniState = ref(false)

const drawerClick = () => {
    if (miniState.value) {
        miniState.value = false
    }
}
</script>

<style>
.q-drawer {
    margin-left: 16px;
    margin-top: 24px;
    margin-bottom: 24px;
    border-radius: 24px;
}
</style>