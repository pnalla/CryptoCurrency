<template>
  <div class="home">
    <Currency msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Currency from '@/components/Currency.vue'

export default {
  name: 'home',
  components: {
    Currency
  }
}
</script>
