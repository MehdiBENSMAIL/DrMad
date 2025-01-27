<template>
    <div>
        <NavBar :items="links" />

        <VerticalMenu class="fixed-navbar" :items="itemsMenu">
            <template v-slot:menu-title="{ label }">
                <strong><u>{{ label }}</u></strong>
            </template>
            <template v-slot:menu-link="{ label }">
                <span>{{ label }}</span>
            </template>
        </VerticalMenu>

        <div>
            <router-view name="bankmain" />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue';
import VerticalMenu from '../components/VerticalMenu.vue';

export default {
    name: 'BankView',
    components: {
        NavBar,
        VerticalMenu
    },
    computed: {
        ...mapState({
            balance: state => state.bank.accountNumber.amount,
            account: state => state.bank.accountNumber,
        }),
        links() {
            return [
                { label: "Mon compte", to: "/bank/account" },
            ];
        },
    },
    data() {
        return {
            itemsMenu: [
                { type: "title", label: "Opérations" },
                { type: "link", label: "Solde", to: "/bank/amount" },
                { type: "link", label: "Débit/Virement", to: "/bank/operation" },
                { type: "title", label: "États" },
                { type: "link", label: "Historique", to: "/bank/history" }
            ]
        };
    }
}
</script>

<style scoped>
.fixed-navbar {
    position: fixed;
}
</style>
