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
    <ItemsList/>
    <BasketList/>
  </div>
</template>

<style scoped>
  .col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>