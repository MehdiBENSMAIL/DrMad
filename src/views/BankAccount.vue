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
import { mapState } from 'vuex';
import bankaccount from '../services/bankaccount.service'

export default {
    name: 'BankAccount',
    data: () => ({
        login: '',
        errorMessage: ''
    }),
    computed: {
        ...mapState('bank', 'account'),
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            const response = await bankaccount.bankLogin(this.login);

            if (response && response.error !== 0) {
                this.errorMessage = response.data;
                return;
            }
            this.account = this.login;
            await this.$router.push('/bank')
        },
    },
};
</script>