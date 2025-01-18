<template>
  <div>
    <h1>Pay</h1>
    <div>
      <label>
        uuid commande :
        <input id="orderId" v-model="searchOrderId" name="orderId" type="text"/>
      </label>
      <button @click="search">Search</button>
    </div>
    <div v-if="orderExist">
      <hr>
      <div >date :</div>
      <hr>
      <label>
        uuid transaction :
        <input id="transactionId" v-model="transactionId" name="transactionId" type="text"/>
      </label>
      <button :disabled="isAlreadyPayed" @click="payOrder">Payer</button>
    </div>
  </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import {mapState} from "vuex";

export default {
  name: 'ShopPay',
  props: {orderId: {type: String}},
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
      if (this.searchOrderId === this.orderId) return;
      this.$router.push('/shop/pay/' + this.searchOrderId);
    },
    async payOrder() {
      if (!this.orderExist || this.isAlreadyPayed) return;
      const response = await ShopService.finaliseOrder({userId: this.shopUser._id, orderId: this.orderId});
      if (response.error === 0) {
        this.$router.push('/shop/orders')
      } else {
        console.log(response.data);
      }
    },
    async checkOrder() {
      const response = await ShopService.checkOrderExist({userId: this.shopUser._id, orderId: this.orderId});
      if (response.error === 0) {
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
