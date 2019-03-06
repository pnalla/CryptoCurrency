<template>
  <div class="hello">
    <div class="col-12 d-flex justify-content-around">
      <table class="table-bordered" v-for="(item, index) in profitArray" :key="index">
        <thead>
          <tr>
            <td colspan="2"> {{item.date}} </td>
          </tr>
          <tr>
            <td colspan="2"> {{item.currency}} </td>
          </tr>
          <tr>
            <td> Buy </td>
            <td> Sell </td>
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
              Profit: {{ (item.maxValue - item.minValue).toFixed(3) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      currencyData: [],
      profitArray: []
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
    this.currencyData = [ { 'currency': 'BTC', 'date': '20180507', 'quotes': [{ 'time': '0915', 'price': '34.98' }, { 'time': '1045', 'price': '45.13' }, { 'time': '1050', 'price': '29.01' }, { 'time': '1230', 'price': '37.01' }, { 'time': '1400', 'price': '35.98' }, { 'time': '1530', 'price': '33.56' }] }, { 'currency': 'ETC', 'date': '20180507', 'quotes': [{ 'time': '0900', 'price': '1.45' }, { 'time': '1030', 'price': '1.87' }, { 'time': '1245', 'price': '1.55' }, { 'time': '1515', 'price': '2.01' }, { 'time': '1700', 'price': '2.15' }] }, { 'currency': 'LTC', 'date': '20180507', 'quotes': [{ 'time': '0930', 'price': '14.32' }, { 'time': '1115', 'price': '14.87' }, { 'time': '1245', 'price': '15.03' }, { 'time': '1400', 'price': '14.76' }, { 'time': '1700', 'price': '14.15' }] }]
    this.calculateProfits()
  },
  // filters: {
  //   stringToDate () {

  //   }
  // },
  methods: {
    calculateProfits () {
      this.profitArray = []
      let tempCurrencyArray = JSON.parse(JSON.stringify(this.currencyData))
      tempCurrencyArray.forEach(element => {
        // let maxValue = Math.max.apply(Math, element.quotes.map(e => e.price))
        let profitFlag = false

        // element.quotes.forEach(ele => {
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
              // item.minValue = minObj.price
              // item.minTime = moment(element.date + ' ' + minObj.time).format('hh:mm A')
              // item.maxValue = maxObj.price
              // item.maxTime = moment(element.date + ' ' + maxObj.time).format('hh:mm A')

              this.profitArray.push(item)
            }
            console.log('element quostes: ' + JSON.stringify(element.quotes))
          }
        // })
        }
      })
      // console.log('max objects is: ' + JSON.stringify(maxObj))
      // console.log('Min object is: ' + JSON.stringify(minObj))
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
