<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :links="links"/>
    <hr>
    <router-view name="shopmain"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ShopView',
  components: {NavBar},
  data: () => ({
    navigationConfig: {
      unlogged: [
        {label: 'Login', to: '/shop/login'}
      ],
      logged: [
        {label: 'Buy', to: '/shop/buy'},
        {label: 'Pay', to: '/shop/pay'},
        {label: 'Orders', to: '/shop/orders'},
        {label: 'Logout', to: '/shop/logout'}
      ]
    }
  }),
  computed: {
    ...mapState('shop', ['shopUser']),

    links() {
      return this.shopUser === null
          ? this.navigationConfig.unlogged
          : this.navigationConfig.logged;
    }
  },
}
</script>
