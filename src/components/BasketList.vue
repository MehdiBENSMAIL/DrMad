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

    <button>Commander</button>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: 'BasketList' ,
  components: {CheckedList},
  computed: {
    ...mapState('shop', ['basket', "viruses"]),
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
    ...mapActions('shop', ['getAllViruses' , 'setBasket', 'addItemBasket', 'removeItemBasket', 'clearBasket']),
    changeSelection(idx) {
      // get the virus in the filtered list
      let v = this.filterViruses[idx]
      // search its index in this.viruses
      let i = this.viruses.findIndex(el => el === v)
      // if i is in selected, remove it
      let j = this.selected.findIndex(el => el === i)
      if (j !== -1) {
        this.selected.splice(j,1)
      }
      else {
        this.selected.push(i)
      }
    },
    removeItem(indexItem) {
      this.removeItemBasket(this.basket.items[indexItem].item)
    },
    clear() {
      this.clearBasket()
    }
  }
}
</script>

<style scoped>

</style>