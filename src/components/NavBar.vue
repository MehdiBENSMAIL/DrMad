<template>
  <div>
    <button v-for="(link, index) in links" :key="index" @click="goTo(link.to)" :style="{paddingRight: '10px'}">
      <slot name="nav-button" :label="link.label">{{link.label}}</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {links: Array},
  methods: {
    goTo(dest) {
      this.$router.push(dest);
    }
  }
}
</script>