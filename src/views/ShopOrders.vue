<template>
  <div>
    <h1>Orders</h1>
    <table>
      <tbody>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Montant</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
      <tr>
        <th scope="row">Turquoise</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Ocre</th>
        <td><code>#F6BC57</code></td>
        <td><code>hsla(38, 90%, 65%, 1)</code></td>
        <td><code>rgba(246, 188, 87, 1)</code></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ShopOrders',
  computed: {
    // ...mapState('shop', [''])
  },
  methods: {
    ...mapActions('shop', ['cancelOrder', 'getOrders']),
  },
  mounted() {
    this.getOrders();
  }
}
</script>