<template>
  <div>
    <h5>Prix</h5>
    <b-form-checkbox
      id="priceForceDecimal"
      v-model="menu.prices.forceDecimal">
      Forcer les décimales
    </b-form-checkbox>
    <b-row class="mt-2">
      <b-col md="8">
        <label for="priceSeparator">Séparateur</label>
      </b-col>
      <b-col md="4">
        <b-form-select
          v-model="menu.prices.separator"
          :options="['.', ',']"
          id="priceSeparator"
        />
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col md="8">
        <label for="priceDecimal">Décimal</label>
      </b-col>
      <b-col md="4">
        <InputNumber
          v-model="menu.prices.decimal"
          :min="0"
          :max="2"
          id="priceDecimal"
        />
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col md="8">
        <label for="priceCurrency">Devise</label>
      </b-col>
      <b-col md="4">
        <b-form-input
          v-model="menu.prices.currency"
          maxlength="3"
          id="priceCurrency"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InputNumber from '@/components/InputNumber'

export default {
  components: {
    InputNumber,
  },
  data() {
    return {
      showCurrencies: false,
      currencies: ['EUR'],
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
    }),
  },
}
</script>
