<script>
import ItemsList from "@/components/ItemsList.vue";
import BasketList from "@/components/BasketList.vue";

export default {
  name: 'ShopBuy',
  components: {ItemsList, BasketList},
}
</script>

<template>
  <div class="col">
    <ItemsList class="itemList"/>
    <BasketList class="basketList"/>
  </div>
</template>

<style scoped>
  .col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .itemList, .basketList {
    width: 50%;
  }
</style>
