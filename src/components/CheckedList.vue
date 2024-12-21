<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <input type="checkbox"
             v-if="itemCheck"
             :checked="checked[indexRow]"
             @click="$emit('checked-changed', indexRow)"
      >

      <span v-for="(field, indexCol) in fields" :key="indexCol">
        {{item[field]}}
      </span>

      <input v-if="itemAmount" type="number" min="1" v-model.number="amounts[indexRow]">

      <button v-if="itemButton && itemButton.show"
              color="grey"
              @click="handleItemButtonClick(indexRow)">
        {{itemButton.text}}
      </button>
    </p>

    <button v-if="listButton && listButton.show"
            color="green"
            @click="handleItemsSelectButton">
      {{listButton.text}}
    </button>
  </div>
</template>

<script>
export default {
  name: "CheckedList",
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs à afficher
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    itemAmount: Boolean, // s'il y a un montant d'items
  },
  data : () => {
    return {
      amounts: [] // le tableau des montants d'items
    }
  },
  watch: {
    data: {
      immediate: true, // S'exécute immédiatement lors de la création du composant
      handler(newData) {
        if (newData && newData.length > 0) {
          // Initialisation ou réinitialisation du tableau amounts
          this.amounts = new Array(newData.length).fill(1)
        }
      }
    }
  },
  methods : {
      handleItemButtonClick(indexRow) {
      if (this.itemAmount) {
        // Si itemAmount est true, renvoie l'index et la valeur du champ numérique
        this.$emit('item-button-clicked', [indexRow, this.amounts[indexRow]]);
      } else {
        // Sinon, on envoie uniquement l'index comme avant
        this.$emit('item-button-clicked', indexRow)
      }
    },
    handleItemsSelectButton() {
      let items = [];

      for(let i=0; i<this.$props.data.length; i++) {
        if(this.checked[i]) {
          if(this.itemAmount) {
            items.push([i, this.amounts[i]]);
          } else {
            items.push(i);
          }
        }
      }

      this.$emit('list-button-clicked', items);
    }
  }
}
</script>