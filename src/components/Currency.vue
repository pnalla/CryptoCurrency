<template>
  <div class="container">
    <div class="mt-5 pb-5">
      <h3>Crypto Currency Report</h3>
    </div>
    <div class="pb-5 currency-form">
      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="date" class="pr-2">Select date</label>
          <datepicker class="pl-2 pr-2 form-control" v-model="currencyDate"></datepicker>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="currency" class="pr-2">Or</label>
          <select id="select-currency" class="form-control" name="currency" v-model="currency" @change="getFilteredData()" v-validate="'required|excluded:1'">
              <option :value=null disabled selected>Select Currency</option>
              <option value="All">All</option>
              <option value="BTC">BTC</option>
              <option value="ETC">ETC</option>
              <option value="LTC">LTC</option>
          </select>
        </div>
      </form>
    </div>
    <div class="row" v-if="profitArray.length > 0">
      <div class="col-4 mt-2" v-for="(item, index) in profitArray" :key="index">
        <table class="table-bordered" :name="`profit_table${item.date}`" >
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
          <tbody v-if="item.minValue == 0 && item.maxValue == 0">
            <tr>
              <td colspan="2">
                <strong class="text-danger">No Profit</strong>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td> {{ item.minValue }} </td>
              <td> {{ item.maxValue }} </td>
            </tr>
            <tr>
              <td> {{ item.minTime }} </td>
              <td> {{ item.maxTime }} </td>
            </tr>
            <tr>
              <td colspan="2" :name="`profit_table_profit${item.currency}`">
                <strong>Profit: </strong> {{ (item.maxValue - item.minValue).toFixed(3) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      No content to display
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import svc from '../constants'
import api from '../api'
import axios from 'axios'

export default {
  name: 'Currency',
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
      currencyDate: new Date(2018, 4, 7),
      currency: null,
    }
  },
  beforeMount () {
    this.getCurrencyData()
  },
  watch: {
    currencyDate () {
      this.getFilteredData()
    }
  },
  filters: {
    stringToDate: function d (date) {
      return moment(date).format('YYYY-MMM-DD')
    }
  },
  methods: {
    calculateProfits (currencyData) {
      this.profitArray = []
      // copy the currency data to temp array
      let tempCurrencyArray = JSON.parse(JSON.stringify(currencyData))
      tempCurrencyArray.forEach(element => {
        let maxLength = element.quotes.length
        // iterate over currency elements
        for (let i = 0; i < maxLength; i++) {
          // get the max value of the currency data
          let maxObj = element.quotes.reduce((max, item) => max && max.price > item.price ? max : item, null)
          // get the array of elements which are less than max value and time
          let minObjArray = this.getMinObjectsArray(maxObj, element)
          // get the minimum value from the above array
          let minObj = minObjArray.reduce((min, item) => min && min.price < item.price ? min : item, null)
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
            // if the value is not found get the next max element for the initial array
            // and follows the same process
            let indexOfMaxObj = element.quotes.findIndex(x => (x.price === maxObj.price && x.time === maxObj.time))
            element.quotes.splice(indexOfMaxObj, 1)
            if (element.quotes.length === 0) {
              let item = {}
              item.currency = element.currency
              item.date = element.date
              item.minValue = 0
              item.maxValue = 0

              this.profitArray.push(item)
            }
          }
        }
      })
    },
    getFilteredData () {
      // Apply filters based the selected value in the UI
      let date = moment(this.currencyDate).format('YYYYMMDD')
      let currency = this.currency
      let filter = []
      if (!currency || currency === 'All') {
        filter = this.currencyData.filter(e => e.date === date)
      } else {
        filter = this.currencyData.filter(e => (e.date === date && e.currency === currency))
      }
      this.calculateProfits(filter)
    },
    getCurrencyData () {
      // Get the currency data
      axios.get(`./currency-data.json`)
        .then((response) => {
          if (response && response.status === 200) {
            this.currencyData = response.data
            this.calculateProfits(this.currencyData)
            this.getFilteredData()
          }
        })
        .catch((e) => {
          console.log('Error in getting currency data: ' + e)
        })
    },
    getMinObjectsArray (maxObj, element) {
      // getting the min obj which are less than the max obj passed.
      let tempArray = []
      let date = element.date
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
  width: 100%;
}
td {
  padding: 10px;
}
.currency {
  background-color: #cecccc;
}
.currency-form {
  margin-left: 20%;
}
</style>
