<template>
  <div class="vertical-menu">
    <div v-for="(item, index) in items" :key="index" class="menu-item">
      <template v-if="item.type === 'title'">
        <slot name="menu-title" :label="item.label">
          {{ item.label }}
        </slot>
      </template>

      <template v-if="item.type === 'link'">
        <span @click="goTo(item.to)" class="menu-link">
          <slot name="menu-link" :label="item.label">
            <button>{{ item.label }}</button>
          </slot>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalMenu",
  props: {items: Array},
  methods: {
    goTo(dest) {
      this.$router.push(dest);
    }
  }
}
</script>

<style scoped>
.vertical-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  margin: 5px 0;
}

.menu-link {
  cursor: pointer;
}

.menu-link button {
  width: 100%;
  text-align: left;
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
