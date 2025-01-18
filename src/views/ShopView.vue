<template>
  <div>
    <h1>Boutique</h1>
    <button v-if="shopUser === null" @click="goToLogin">Login</button>
    <div v-else>test</div>
    <hr>
    <router-view name="shopmain"></router-view>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'ShopView',
  components: {},
  computed: {
    ...mapState('shop', ['shopUser'])
  },
  methods: {
    goToLogin() {
      this.$router.push('/shop/login')
    }
  }
}
</script>