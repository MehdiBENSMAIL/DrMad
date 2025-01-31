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
import {mapActions, mapState} from 'vuex';

export default {
    name: 'BankOperation',
    data() {
        return {
            amount: 0,
            destAcc: "",
            dest: false,
            message: undefined,
        };
    },
    computed: {
        ...mapState('bank', {
            bankAccount: (state) => state.account,
        }),
    },
    methods: {
        ...mapActions('bank', ['createWithdraw', 'createPayment']),
        async validate() {
            if (!this.bankAccount) {
                alert("Vous devez être connecté pour effectuer cette opération.");
                return;
            }

            try {
                if (this.amount <= 0) {
                    alert("Montant invalide");
                    return;
                }

                let res;
                if (this.dest) {
                    if (!this.destAcc) {
                         alert('Adresse de compte non valide');
                         return;
                    }
                    res = await this.createPayment({
                      amount: this.amount,
                      destinationAccount: this.destAcc,
                    })
                } else {
                  res = await this.createWithdraw({amount: this.amount})
                }

                if (res.error === 0) {
                    this.message = `L'opération est validée avec le n° : ${res.data.uuid}. Vous pouvez la retrouver dans l'historique.`;
                    setTimeout(() => {
                        this.message = undefined;
                    }, 5000);
                } else {
                    alert(`Erreur: ${res.data}`);
                }
            } catch (error) {
                alert(`Une erreur s'est produite lors de l'opération : ${error.message}`);
            }
        }
    },
    mounted() {
        if (!this.bankAccount) {
            this.$router.push('/bank/login');
        }
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