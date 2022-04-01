<template>
    <div>
        <v-autocomplete
        v-model="zone"
        :items="zones"
        solo
        color="primary"
        height="60px"
        rounded
        elevation="5"
        placeholder="To timeZone..."
        prepend-inner-icon="mdi-map-marker"
        return-object
        item-text="zoneName"
        item-value="zoneName"
        :rules=" [v => !!v || 'Item is required']"
        :menu-props="{ auto: true, maxWidth: 'auto', overflowY: true }"
        full-width
        >
            <template v-slot:item="data">
                <v-list-item-content>
                <v-list-item-title>{{data.item.countryName}},{{ data.item.zoneName}}</v-list-item-title>
                </v-list-item-content>
            </template>
            <template v-slot:selection="data">
                {{data.item.zoneName}}
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
import { zones } from '../lists'
export default {
  data () {
    return {
      zones: zones,
      zone: null
    }
  },
  watch: {
    zone (val) {
      if (val) this.$emit('zoneReady', val)
    }
  }
}
</script>
