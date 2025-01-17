<template>
    <div>
      <!-- TODO: FAIRE UNE INTERFACE ? -->
      <input type="text" v-model="localOrderId" :disabled="isAlreadyPayed" name="orderId" id="orderId"/>
      <button @click="payOrder">Payer</button>
    </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import { mapState } from "vuex";

export default {
  name: 'ShopPay',
  props: { orderId: { type: String } },
  data() {
    return {
      localOrderId: this.orderId,
      orderExist: false,
      isAlreadyPayed: false,
    };
  },
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  watch: {
    // orderId() {
    //   this.localOrderId = this.orderId;
    // },
    localOrderId: {
      async handler(newOrderId) {
        const response = await ShopService.checkOrderExist({ userId: this.shopUser._id, orderId: newOrderId });
        console.log(response);
        if(response.error === 0) {
          this.orderExist = response.data.exist;
          this.isAlreadyPayed = (this.orderExist) ? response.data.finalise : false;
        } else {
          console.log(response.data);
        }
      },
      immediate: true,
    }
  },
  methods: {
    async payOrder() {
      if(!this.orderExist || this.isAlreadyPayed) return;
      const response = await ShopService.finaliseOrder({ userId: this.shopUser._id, orderId: this.localOrderId });
      if(response.error === 0) {
        this.$router.push('/shop/orders')
      } else {
        console.log(response.data);
      }
    }
  }
}
</script>
