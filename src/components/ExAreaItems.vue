<template>
    <q-expansion-item class="shadow-10 q-mb-sm text-weight-thin bg-white" v-for="route in routes" expand-separator
        icon="mdi-map-marker" :label="route.name">
        <q-card class="q-px-none">
            <q-card-section>
                名字： {{ route.name }}
            </q-card-section>
            <q-card-section>
                介绍： {{ route.desc }}
            </q-card-section>

            <q-card-actions align="right">
                <q-toggle v-model="route.visible" @update:model-value="route.switchVisible()" keep-color color="primary" />
                <q-space />
                <q-btn flat class="text-grey-9" @click="route.focus()">转到</q-btn>
                <q-btn flat class="text-red" @click="route.delete()">删除</q-btn>
            </q-card-actions>
        </q-card>
    </q-expansion-item>
</template>

<script lang='ts' setup>
import { onBeforeMount, onMounted } from 'vue';
import { useMapStore } from '../store/mapStore';
import { storeToRefs } from 'pinia';
import { Route } from '../types/Route'

const mapStore = useMapStore();
const { routes } = storeToRefs(mapStore);

onBeforeMount(() => {
    //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

</script>

<style scoped></style>