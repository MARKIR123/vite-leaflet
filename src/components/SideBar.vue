<template>
    <div>
        <q-layout view="lHh Lpr lff">
            <q-page-container>
                <AlterMap></AlterMap>
            </q-page-container>
            <q-drawer :mini="miniState" :mini-width="56" @click.capture="drawerClick" mini-to-overlay v-model="DrawerOpen"
                :width="280" :breakpoint="500" overlay>
                <q-item class="my-head-item" clickable v-ripple @click="">
                    <q-item-section class="q-ml-ms" avatar>
                        <q-avatar round>
                            <img style="max-width:80%;height:auto;" src="/ask.png" />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section class="text-center">
                        <q-item-label class="text-weight-bold">骑行规划</q-item-label>
                    </q-item-section>
                </q-item>

                <q-list class="q-pt-sm">
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
import { useMapStore } from '../store/mapStore';

const mapStore = useMapStore()
const DrawerOpen = ref(true)
const miniState = ref(false)


const drawerClick = () => {
    if (miniState.value) {
        miniState.value = false
    }
}
</script>

<style>
.my-head-item {
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: white;
}

.q-drawer {
    margin-left: 16px;
    margin-top: 24px;
    margin-bottom: 24px;
    border-radius: 24px;
    box-shadow: 16px 16px 32px 0 rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px) !important;
    background-color: rgba(255, 255, 255, 0.4) !important;
    border: 2px solid rgba(95, 79, 70, 0.8) !important;
}
</style>