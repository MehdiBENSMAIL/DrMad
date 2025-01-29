<template>
    <div>
        <h1>Login</h1>

        <span>Account </span><input v-model="login">
        <button @click="handleLogin">Login</button>
        <p v-if="this.account">{{ this.account }}</p>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: 'BankAccount',
    data: () => ({
        login: '',
        errorMessage: ''
    }),
    computed: {
        ...mapState('bank', ['account']),
    },
    methods: {
      ...mapActions('bank', ['bankLogin']),
        async handleLogin() {
            this.errorMessage = '';
            const response = await this.bankLogin({login: this.login});

            if (response && response.error !== 0) {
                this.errorMessage = response.data;
                return;
            }

            await this.$router.push('/bank')
        },
    },
};
</script>