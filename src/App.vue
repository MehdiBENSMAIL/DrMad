<template>
  <div id="app">
    <h1>Welcome to DrMad app</h1>
    <NavBar :links="links">
      <template #nav-button="{label}">
        <strong v-if="label === 'boutique'">{{ label }}</strong>
        <img v-else-if="label === 'banque'" src="@/assets/banque.jpg" alt="banque"/>
      </template>
    </NavBar>
    <router-view/>
  </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    links: [{label: "boutique", to: "/shop"}, {label: "banque", to: "/bank"}],
  }),
};
</script>
