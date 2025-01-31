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
                <button @click="copyToClipboard(item.uuid)">Détails</button>
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
                { label: 'Date', name: 'date' },
                { label: 'Type', name: 'type' }
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

            transactions.sort((a, b) => new Date(b.date.$date) - new Date(a.date.$date));
            return transactions.map(t => ({
                amount: t.amount,
                date: new Date(t.date.$date).toLocaleDateString(),
                type: t.amount < 0 ? 'S' : 'D',
                uuid: t.uuid
            }));
        }
    },
    methods: {
        showDetails(item) {
            alert(`Détails de la transaction : ${JSON.stringify(item)}`);
        },
        showSelected(items) {
            const uuids = items.map(item => item.uuid).join(', ');
            alert(`UUID des transactions sélectionnées : ${uuids}`);
        },
        copyToClipboard(uuid) {
            navigator.clipboard.writeText(uuid)
                .then(() => {
                    alert('UUID copié dans le presse-papiers : ' + uuid);
                })
                .catch(() => {
                    alert('Erreur lors de la copie de l\'UUID');
                });
        }
    }
};
</script>

<style scoped>
label {
    display: block;
    margin: 10px 0;
}
</style>