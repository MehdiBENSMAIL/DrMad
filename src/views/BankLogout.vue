<template>
    <div class="logout-wrapper">
        <h2>Déconnexion</h2>
        <div class="spinner"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'BankLogout',
    methods: {
        ...mapActions('bank', ['bankLogout']),
        logout() {
            this.logout;
            setTimeout(() => {
                this.clearAccount();
                this.$router.push("/bank");
            }, 1000);
        }
    }
};
</script>