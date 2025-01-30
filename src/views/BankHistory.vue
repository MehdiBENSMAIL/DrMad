<template>
    <div>
        <h1>
            <slot name="title">Opérations passées</slot>
        </h1>
        <label>
            <input type="checkbox" v-model="filterActive" />
            Filtrer par période
        </label>
        <div v-if="filterActive">
            <label>Du :</label>
            <input type="date" v-model="startDate" />
            <label>Au :</label>
            <input type="date" v-model="endDate" />
        </div>
        <DataTable :headers="headers" :items="filteredTransactions" itemCheck itemButton tableButton
            @itemClicked="showDetails" @tableClicked="showSelected">
            <template v-slot:item-button="{ item }">
                <button @click="showDetails(item)">Détails</button>
            </template>
            <template v-slot:table-button>
                Voir
            </template>
        </DataTable>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DataTable from '@/components/DataTable.vue';

export default {
    name: 'BankHistory',
    components: {
        DataTable
    },
    data() {
        return {
            filterActive: false,
            startDate: null,
            endDate: null,
            headers: [
                { label: 'Montant', name: 'amount' },
                { label: 'Date', name: 'date' }
            ]
        };
    },
    computed: {
        ...mapState('bank', ['accountTransactions']),
        filteredTransactions() {
            let transactions = this.accountTransactions;
            if (this.filterActive) {
                if (this.startDate) {
                    transactions = transactions.filter(t => new Date(t.date.$date) >= new Date(this.startDate));
                }
                if (this.endDate) {
                    transactions = transactions.filter(t => new Date(t.date.$date) <= new Date(this.endDate));
                }
            }
            return transactions.map(t => ({
                amount: t.amount,
                date: new Date(t.date.$date).toLocaleDateString(),
                amountClass: t.amount < 0 ? 'negative' : 'positive',
                uuid: t.uuid
            }));
        }
    },
    methods: {
        async showDetails(item) {
            try {
                await navigator.clipboard.writeText(item.uuid);
                alert(`UUID de la transaction : ${item.uuid}\n\nL'UUID a été copié dans le presse-papiers.`);
            } catch (error) {
                alert(`Erreur lors de la copie de l'UUID : ${error.message}`);
            }
        },
        showSelected(items) {
            alert(`Transactions sélectionnées : ${items.map(i => JSON.stringify(i)).join(', ')}`);
        }
    }
};
</script>

<style scoped>
label {
    display: block;
    margin: 10px 0;
}

.negative {
    color: red;
}

.positive {
    color: green;
}
</style>