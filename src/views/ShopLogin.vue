<template>
  <div>
    <h1>Login</h1>

    <span>login</span><input v-model="login">
    <span>password</span><input v-model="password">
    <button @click="handleLogin">Login</button>
    <p v-if="shopUser">{{ shopUser }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ShopLogin',
  data: () => ({
    login: '',
    password: '',
    errorMessage: '',
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  methods: {
    ...mapActions('shop', ['shopLogin', 'getBasket']),
    async handleLogin() {
      this.errorMessage = '';
      const response = await this.shopLogin({ login: this.login, password: this.password });

      if (response && response.error !== 0) {
        this.errorMessage = response.data;
        return;
      }
      await this.$router.push('/shop/buy')
    },
  },
};
</script>
