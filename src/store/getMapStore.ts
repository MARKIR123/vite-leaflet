import { mapState } from 'pinia'
import { useMapStore } from './mapStore'

export default {
    ...mapState(useMapStore, {
        map: (state) => {
            return state.map
        },

        exAreas: (state) => {
            return state.exAreas
        }
    })
}