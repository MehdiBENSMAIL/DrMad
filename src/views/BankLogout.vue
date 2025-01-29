<template>
    <div>
        <h2>Déconnexion</h2>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'BankLogout',
    created() {
        this.logout();
    },
    methods: {
        ...mapActions('bank', ['bankLogout']),
        logout() {
            this.bankLogout();
            setTimeout(() => {
                this.$router.push("/bank");
            }, 1000);
        }
    }
};
</script>