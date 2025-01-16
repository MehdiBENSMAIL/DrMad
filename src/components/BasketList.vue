<template>
  <div>
    <h1>Les virus</h1>

    <CheckedList :data="basketViruses"
                 :fields="['name', 'amount']"
                 :item-button="{show: true, text:'supprimer'}"
                 :list-button="{show: true, text:'tout supprimer'}"
                 @item-button-clicked="removeItem($event)"
                 @list-button-clicked="clear($event)"
    >
    </CheckedList>
    <hr>

    <button @click="buyItems">Commander</button>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList.vue";
import {mapActions, mapState} from "vuex";
import ShopService from "@/services/shop.service";

export default {
  name: 'BasketList',
  components: {CheckedList},
  computed: {
    ...mapState('shop', ['basket', 'viruses', 'shopUser']),
    // FIXME : refaire la fonction, me semble peut efficace (ajouter le nom de l'item dans le shop serait plus efficace mais ne respecte pas l'énoncé : voir TPn°4 5.3)
    basketViruses() {
      let items = [];
      this.basket.items.forEach(itemData => {
        for (const viruse of this.viruses) {
          if(viruse._id === itemData.item) {
            items.push({'name': viruse.name, 'amount': itemData.amount});
            break;
          }
        }
      })
      return items;
    }
  },
  methods: {
    ...mapActions('shop', ['removeItemBasket', 'clearBasket']),
    removeItem(indexItem) {
      this.removeItemBasket(this.basket.items[indexItem].item)
    },
    clear() {
      this.clearBasket()
    },
    async buyItems() {
      const items = [];
      this.basket.items.forEach(itemData => {
        for (const viruse of this.viruses) {
          if(viruse._id === itemData.item) {
            items.push({item: viruse, amount: itemData.amount});
            break;
          }
        }
      })
      const response = await ShopService.addOrder({ userId: this.shopUser._id, items });
      if(response.error === 0 && response.data.uuid) {
        this.clear();
        this.$router.push('/shop/pay/'+ response.data.uuid)
      } else {
        console.log(response);
      }
    }
  }
}
</script>

<style scoped>

</style>