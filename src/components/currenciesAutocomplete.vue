<template>
    <div>
        <v-autocomplete
        v-model="currency"
        :items="currencies"
        solo
        color="primary"
        height="60px"
        rounded
        elevation="5"
        :placeholder="type === 'origin' ? 'Currency from...' : 'Currency to...'"
        prepend-inner-icon="mdi-cash-marker"
        return-object
        item-text="currency"
        item-value="code"
        :rules=" [v => !!v || 'Item is required']"
        >
            <template v-slot:item="data">
                <v-list-item-content>
                <v-list-item-title>{{data.item.currency}},{{ data.item.code}}</v-list-item-title>
                </v-list-item-content>
            </template>
            <template v-slot:selection="data">
                {{data.item.currency}},{{data.item.code}}
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
import { currencies } from '../lists'
export default {
  props: ['type'],
  data () {
    return {
      currencies: currencies,
      currency: null
    }
  },
  watch: {
    currency (val) {
      if (val) this.$emit('currencyReady', val, this.type)
    }
  }
}
</script>
