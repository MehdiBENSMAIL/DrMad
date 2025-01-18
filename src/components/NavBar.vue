<template>
  <div>
    <table>
      <tr>
        <td v-for="(item, index) in items" :key="index" :style="{paddingRight: '10px'}">
          <button class="nav-button" @click="handleButtonClicked(item)">
            {{ item.text }}
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {items: Array},
  methods: {
    handleButtonClicked(item) {
      if (item.route) this.$router.push(item.route);
      if (item.action) this.$emit('item-emit', item.action)
    }
  }
}
</script>