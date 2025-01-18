<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :items="navigationItems" @item-emit="navActions($event)"/>
    <hr>
    <router-view name="shopmain"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ShopView',
  components: {NavBar},
  data: () => ({
    navigationConfig: {
      unlogged: [
        {text: 'Login', route: '/shop/login'}
      ],
      logged: [
        {text: 'Buy', route: '/shop/buy'},
        {text: 'Pay', route: '/shop/pay'},
        {text: 'Orders', route: '/shop/orders'},
        {
          text: 'Logout', route: '/shop/login', action: 'logout',
        }
      ]
    }
  }),
  computed: {
    ...mapState('shop', ['shopUser']),

    navigationItems() {
      return this.shopUser === null
          ? this.navigationConfig.unlogged
          : this.navigationConfig.logged;
    }
  },

  methods: {
    ...mapActions('shop', ['shopLogout']),
    navActions(action) {
      if(action === 'logout') {
        this.shopLogout();
      }
    },
  }
}
</script>
