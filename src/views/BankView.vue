<template>
    <div>
        <h1>Banque</h1>
        <hr>

        <div class="main-container">
            <VerticalMenu class="fixed-navbar" :items="itemsMenu">
                <template v-slot:menu-title="{ label }">
                    <strong><u>{{ label }}</u></strong>
                </template>
            </VerticalMenu>

            <router-view name="bankmain">
                <template v-slot:account-amount="{ amount }">
                    <div class="custom-amount">
                        solde actuel: <input :value="`${amount} €`" readonly :class="{
                            'negative': amount < 0,
                            'positive': amount >= 0
                        }" />
                    </div>
                </template>
            </router-view>

            <NavBar :links="accountLink"/>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import NavBar from '@/components/NavBar.vue';
import VerticalMenu from '../components/VerticalMenu.vue';

export default {
    name: 'BankView',
    components: {
        NavBar,
        VerticalMenu
    },
    computed: {
        ...mapState('bank', ['account']),
        accountLink() {
            return [ this.account
                ? { label: "Déconnexion", to: "/bank/logout" }
                : { label: "Mon compte", to: "/bank/account" }
            ]
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

<style>
.main-container {
    display: flex;
    flex-direction: row;
    gap: 100px;
}

.main-container>div:last-child {
    margin-left: auto;
}

.negative {
    color: red;
}

.positive {
    color: green;
}
</style>
