<template>
  <div>
    <h1>Solde compte courant</h1>
    <slot name="account-amount" :amount="accountAmount">
      {{ accountAmount }}
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'BankAmount',
  computed: {
    ...mapState('bank', ['accountAmount'])
  }
}
</script>