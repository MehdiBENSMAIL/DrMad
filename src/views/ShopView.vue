<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :titles="titles" @menu-clicked="goTo($event)">test</NavBar>
    <hr>
    <router-view name="shopmain"></router-view>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ShopView',
  components: {NavBar},
  data: () => ({
    titlesUnlogged: [
      {text:'Login'},
    ],
    titlesLogged: [
      {text:'Buy'},
      {text:'Pay'},
      {text:'Orders'},
      {text:'Logout'},
    ],
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
    titles() {
      return this.shopUser === null ? this.titlesUnlogged : this.titlesLogged;
    }
  },
  methods: {
    ...mapActions('shop', ['shopLogout']),
    goTo(index) {
      if (index === 0) {
        if(this.shopUser === null) {
          this.$router.push('/shop/login');
        } else {
          this.$router.push('/shop/buy');
        }
      } else if (index === 1) {
        this.$router.push('/bank/pay');
      } else if (index === 2) {
        this.$router.push('/shop/orders');
      } else if (index === 3) {
        this.$router.push('/shop/login');
        this.shopLogout();
      }
    },
  }
}
</script>