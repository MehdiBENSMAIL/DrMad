<template>
  <div>
    <slot name="account-amount" :amount="amountAccount">
      {{ amountAccount }}
    </slot>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'BankAmount',
  computed: {
    ...mapState('bank', ['accountAmount']),
    amountAccount() {
      return this.accountAmount;
    }
  },
}
</script>
