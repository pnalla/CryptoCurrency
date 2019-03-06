<template>
  <div class="container">
    <div class="mt-5 pb-5">
      <h3>Crypto Currency Report</h3>
    </div>
    <div class="pb-5">
      <form>
        <span> Select date: </span>
        <datepicker class="pl-2 pr-2" v-model="currencyDate"></datepicker>
        or Enter currency:
        <input type="text" />
      </form>
    </div>
    <div class="col-12 d-flex justify-content-around" v-if="profitArray.length > 0">
      <table class="table-bordered col-3" v-for="(item, index) in profitArray" :key="index">
        <thead>
          <tr>
            <td colspan="2"> {{ item.date | stringToDate}} </td>
          </tr>
          <tr>
            <td colspan="2" class="currency"><strong> {{ item.currency }} </strong> </td>
          </tr>
          <tr>
            <td> <strong> Buy </strong> </td>
            <td> <strong> Sell </strong> </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {{ item.minValue }} </td>
            <td> {{ item.maxValue }} </td>
          </tr>
          <tr>
            <td> {{ item.minTime }} </td>
            <td> {{ item.maxTime }} </td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>Profit: </strong> {{ (item.maxValue - item.minValue).toFixed(3) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      No content to display
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Datepicker
  },
  data () {
    return {
      currencyData: [],
      profitArray: [],
      currencyDate: new Date(2018, 4, 7)
    }
  },
  beforeMount () {
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '34.98' }, { 'time': '1045', 'price': '36.13' }, { 'time': '1050', 'price': '37.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '37.98' }, { 'time': '1045', 'price': '36.13' }, { 'time': '1050', 'price': '35.01' }, { 'time': '1230', 'price': '34.01' }, { 'time': '1400', 'price': '33.98' }, { 'time': '1530', 'price': '32.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '34.98' }, { 'time': '1045', 'price': '39.13' }, { 'time': '1050', 'price': '38.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '31.98' }, { 'time': '1045', 'price': '40.13' }, { 'time': '1050', 'price': '30.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '40.98' }, { 'time': '1045', 'price': '30.13' }, { 'time': '1050', 'price': '39.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '39.98' }, { 'time': '1045', 'price': '30.13' }, { 'time': '1050', 'price': '40.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '34.98' }, { 'time': '1045', 'price': '34.98' }, { 'time': '1050', 'price': '34.98' }, { 'time': '1230', 'price': '34.98' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    // this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '34.98' }, { 'time': '1045', 'price': '45.13' }, { 'time': '1050', 'price': '29.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    this.getCurrencyData()
    // this.calculateProfits()
  },
  filters: {
    stringToDate: function d (date) {
      return moment(date).format('YYYY-MMM-DD')
    }
  },
  methods: {
    calculateProfits () {
      this.profitArray = []
      let tempCurrencyArray = JSON.parse(JSON.stringify(this.currencyData))
      tempCurrencyArray.forEach(element => {
        // let maxValue = Math.max.apply(Math, element.quotes.map(e => e.price))
        let maxLength = element.quotes.length
        for (let i = 0; i < maxLength; i++) {
          let maxObj = element.quotes.reduce((max, shot) => max && max.price > shot.price ? max : shot, null)
          let minObjArray = this.getMinValueObj(maxObj, element)
          let minObj = minObjArray.reduce((max, item) => max && max.price < item.price ? max : item, null)
          if (minObj && minObj.price <= maxObj.price) {
            let item = {}
            item.currency = element.currency
            item.date = element.date
            item.minValue = minObj.price
            item.minTime = moment(element.date + ' ' + minObj.time).format('hh:mm A')
            item.maxValue = maxObj.price
            item.maxTime = moment(element.date + ' ' + maxObj.time).format('hh:mm A')

            this.profitArray.push(item)
            break
          } else {
            let indexOfMaxObj = element.quotes.findIndex(x => (x.price === maxObj.price && x.time === maxObj.time))
            element.quotes.splice(indexOfMaxObj, 1)
            if (element.quotes.length === 0) {
              let item = {}
              item.currency = element.currency
              item.date = element.date
              item.minValue = 0
              // item.minTime = moment(element.date + ' ' + minObj.time).format('hh:mm A')
              item.maxValue = 0
              // item.maxTime = moment(element.date + ' ' + maxObj.time).format('hh:mm A')

              this.profitArray.push(item)
            }
            console.log('element quostes: ' + JSON.stringify(element.quotes))
          }
        }
      })
    },
    getCurrencyData () {
      axios.get(`./currency-data.json`)
        .then((response) => {
          if (response && response.status === 200) {
            this.currencyData = response.data
            this.calculateProfits()
          }
        })
        .catch((e) => {
          console.log('Error in getting currency data: ' + e)
        })
    },
    getMinValueObj (maxObj, element) {
      let tempArray = []
      let date = element.date
      // console.log('moment date is: ' + moment(element.date + ' ' + element.quotes[0].time).format('YYYY-MM-DD HH:mm'))
      element.quotes.forEach(e => {
        if (moment((date + ' ' + maxObj.time)).isAfter(moment((date + ' ' + e.time))) &&
        parseFloat(maxObj.price) !== parseFloat(e.price)) {
          tempArray.push(e)
        }
      })

      return tempArray
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  border: 1px solid gray;
}
td {
  padding: 10px;
}
.currency {
  background-color: #cecccc;
}
.vdp-datepicker {
  display: inline-block;
}
</style>
