<template>
    <div>
        <h1>
            <slot name="title">Débit / Virement</slot>
        </h1>
        <label for="amount">Montant :</label>
        <input type="number" id="amount" v-model="amount" placeholder="montant" min="0" />

        <label class="checkbox-label">
            <input type="checkbox" v-model="dest" />
            Destinataire
        </label>

        <input v-if="dest" v-model="destAcc" placeholder="destinataire" class="input-field" />

        <button @click="validate">Valider</button>

        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { bankaccounts } from "../datasource/data";

export default {
    name: 'BankOperation',
    data() {
        return {

            amount: 0,
            destAcc: "",
            dest: false,
            message: ""
        };
    },
    computed: {
        ...mapState('bank', ['bankAccount'])
    },
    methods: {
        ...mapActions('bank', ['createPayment', 'createWithdraw', 'getAccountTransactions']),
        async validate() {
            try {
                if (this.amount <= 0) {
                    alert("Montant invalide");
                    return;
                }

                let res;
                if (this.dest) {
                    const destAcc = bankaccounts.find(e => e.number === this.destAcc);
                    if (!destAcc) {
                        alert('Compte non trouvé');
                        return;
                    }
                    res = await this.createPayment({
                        amount: this.amount,
                        destAcc: destAcc._id,
                        number: this.bankAccount._id
                    });

                } else {
                    res = await this.createWithdraw({ number: this.bankAccount._id, amount: this.amount });
                }

                if (res === 0) {
                    alert(`Erreur: ${res.data}`);
                } else {
                    this.message = `L'opération est validée avec le n° : ${res.data.transaction.uuid}. Vous pouvez la retrouver dans l'historique.`;
                    setTimeout(() => {
                        this.message = '';
                    }, 5000);
                }
            } catch (error) {
                alert(`Une erreur s'est produite lors de l'opération : ${error.message}`);
            }
        }
    },
    mounted() {
        this.getAccountTransactions();
    }
};
</script>

<style scoped>
.checkbox-label {
    display: block;
    margin: 10px 0;
}

.input-field {
    margin-top: 5px;
    display: block;
}
</style>
