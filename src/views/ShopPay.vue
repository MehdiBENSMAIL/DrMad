<template>
    <div>
      <div>
        <label>
          uuid commande :
          <input type="text" v-model="searchOrderId"  name="orderId" id="orderId"/>
        </label>
        <button @click="search">Search</button>
      </div>
      <hr>
      <div v-if="orderExist">date : </div>
      <hr>
      <div v-if="orderExist">
        <label>
          uuid transaction :
          <input type="text" v-model="transactionId" name="transactionId" id="transactionId"/>
        </label>
        <button @click="payOrder" :disabled="isAlreadyPayed">Payer</button>
      </div>
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
      searchOrderId: '',
      transactionId: '',
      orderExist: false,
      isAlreadyPayed: false,
    };
  },
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  methods: {
    search() {
      if(this.searchOrderId === this.orderId) return;
      this.$router.push('/shop/pay/'+this.searchOrderId);
    },
    async payOrder() {
      if(!this.orderExist || this.isAlreadyPayed) return;
      const response = await ShopService.finaliseOrder({ userId: this.shopUser._id, orderId: this.orderId });
      if(response.error === 0) {
        this.$router.push('/shop/orders')
      } else {
        console.log(response.data);
      }
    },
    async checkOrder() {
      const response = await ShopService.checkOrderExist({ userId: this.shopUser._id, orderId: this.orderId });
      if(response.error === 0) {
        // FIXME renvoyer la commande directement et faire les verifs des datas de la commande ici
        this.orderExist = response.data.exist;
        this.isAlreadyPayed = (this.orderExist) ? response.data.finalise : false;
      } else {
        console.log(response.data);
      }
    },
  },
  async mounted() {
    this.searchOrderId = this.orderId;
    await this.checkOrder()
  }
}
</script>
