<template>
    <q-expansion-item v-for="exArea in exAreas" expand-separator icon="mdi-map-marker" :label="exArea.name">
        <q-card class="bg-grey-1">
            <q-card-section>
                <q-list>
                    <q-item dense clickable v-ripple v-for="mask in exArea.masks" @click="">
                        <!-- <q-checkbox v-model="mask.visible" @update:model-value="mask.hideAndshow()"
                            size="24px"></q-checkbox> -->
                        <q-item-section style="width: 5px;">
                            <q-slider dense v-model="mask.opacity" :min="0" :max="1" :step="0.1"
                                @update:model-value="mask.setOpacity()" label color="primary" />
                        </q-item-section>

                        <q-item-section class="text-center">
                            <q-item-label>{{ mask.name }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <div class="q-gutter-none">
                                <q-btn @click.stop="mask.remove(exArea)" size="10px" color="grey-9" flat dense round icon="mdi-download-circle" />
                                <q-btn @click.stop="mask.remove(exArea)" size="10px" color="red-9" flat dense round icon="mdi-close-circle" />
                                <q-btn @click.stop="" size="10px" color="blue-9" flat dense round icon="mdi-information" />
                            </div>
                        </q-item-section>

                        <!-- <q-menu context-menu touch-position>
                            <q-item v-ripple clickable @click="mask.remove()">
                                删除
                            </q-item>
                            <q-item v-ripple clickable>
                                配置...
                            </q-item>
                        </q-menu> -->
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-toggle v-model="exArea.visible" @update:model-value="exArea.showOrHide()" keep-color color="primary" />
                <q-space />
                <q-btn flat class="text-grey-9" @click="exArea.focus()">转到</q-btn>
                <q-btn flat class="text-blue" @click="exArea.extract(20)">提取</q-btn>
                <q-btn flat class="text-red" @click="exArea.delete()">删除</q-btn>
            </q-card-actions>
        </q-card>
    </q-expansion-item>
</template>

<script lang='ts' setup>
import { onBeforeMount, onMounted } from 'vue';
import { useMapStore } from '../store/mapStore';
import { storeToRefs } from 'pinia';
import { exArea } from '../types/exArea';

const mapStore = useMapStore();
const { exAreas } = storeToRefs(mapStore);

const test = (exArea: exArea) => {
    console.log(exArea.getTileAreas(20));
}

onBeforeMount(() => {
    //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

</script>

<style scoped></style>