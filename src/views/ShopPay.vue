<template>
    <div>
      <!-- TODO: FAIRE UNE INTERFACE ? -->
      <input type="text" v-model="localOrderId" name="orderId" id="orderId"/>
      <button @click="payOrder">Payer</button>
    </div>
</template>

<script>
import OrderService from "@/services/order.service";
import { mapState } from "vuex";

export default {
  name: 'ShopPay',
  props: { orderId: String },
  data: () => ({
    localOrderId: String,
    orderExist: false,
    isAlreadyPayed: false,
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  watch: {
    orderId() {
      this.localOrderId = this.orderId;
    },
    localOrderId(newOrderId) {
      const response = OrderService.checkOrderExist({ userId: this.shopUser.userId, orderId: newOrderId });
      if(response.error === 0) {
        this.orderExist = response.data.exist;
        this.isAlreadyPayed = (this.orderExist) ? response.data.finalise : false;
      } else {
        console.log(response.data);
      }
    }
  },
  methods: {
    payOrder() {
      if(!this.orderExist || this.isAlreadyPayed) return;
      const response = OrderService.finaliseOrder({ userId: this.shopUser.userId, orderId: this.localOrderId });
      if(response.error === 0) {
        this.$router.push('/shop/orders')
      } else {
        console.log(response.data);
      }
    }
  }
}
</script>
