<template>
  <div>
    <h1>Orders</h1>
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Montant</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index" >
          <td>{{ order.date.$date }}</td>
          <td>{{ order.total }}</td>
          <td>{{ order.status }}</td>
          <td v-if="order.status === 'waiting_payment'">
            <button>Payer</button>
            <button>Annuler</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'ShopOrders',
  computed: {
    ...mapState('shop', ['shopUser']),
    orders() {
      return this.shopUser.orders;
    }
  },
  methods: {
    ...mapActions('shop', ['cancelOrder', 'getOrders']),
  },
  mounted() {
    this.getOrders();
  }
}
</script>