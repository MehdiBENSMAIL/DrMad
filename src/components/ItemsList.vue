<template>
  <div>
    <h1>Les virus</h1>
    <span>Filtres :</span>
    <hr/>
    <label for="filterpriceactive">par prix</label><input id="filterpriceactive" v-model="filterPriceActive"
                                                          type="checkbox">
    <label for="filternameactive">par nom</label><input id="filternameactive" v-model="filterNameActive"
                                                        type="checkbox">
    <label for="filterstockactive">par stock</label><input id="filterstockactive" v-model="filterStockActive"
                                                           type="checkbox">
    <hr/>
    <table aria-hidden="true">
      <tr>
        <td v-if="filterPriceActive">
          <label for="filterprice">prix inférieur à : </label><input id="filterprice" v-model="priceFilter">
        </td>
        <td v-if="filterNameActive">
          <label for="filtername">nom contient : </label><input id="filtername" v-model="nameFilter">
        </td>
        <td v-if="filterStockActive">
          <label for="filterstock">en stock</label><input id="filterstock" v-model="stockFilter" type="checkbox">
        </td>
      </tr>
    </table>
    <hr/>

    <!-- version avec filtre multi-critères -->
    <CheckedList :checked="checked"
                 :data="filterViruses"
                 :fields="['name', 'price']"
                 :item-button="{show: true, text:'Add to cart'}"
                 :list-button="{show: true, text:'Add to cart'}"
                 item-amount
                 item-check
                 @checked-changed="changeSelection($event)"
                 @item-button-clicked="addVirusToBasket($event)"
                 @list-button-clicked="addSelectedVirusesToBasket($event)"
    >

    </CheckedList>
  </div>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import CheckedList from "@/components/CheckedList";

export default {
  name: 'ItemsList',
  components: {CheckedList},
  data: () => ({
    priceFilter: 0,
    nameFilter: '',
    stockFilter: true,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    itemAmount: true,
    selected: []
  }),
  computed: {
    ...mapState('shop', ['viruses']),
    checked() {
      let tab = []
      this.filterViruses.forEach(v => {
        // find the index of virus v in this.viruses
        let idx = this.viruses.findIndex(el => el === v)
        // if idx is in selected, push true, else push false
        if (this.selected.includes(idx)) {
          tab.push(true)
        } else {
          tab.push(false)
        }
      })
      return tab
    },
    filterVirusesByPrice() {
      // no active filter => get whole list
      if (!this.filterPriceActive) return this.viruses
      let price = parseInt(this.priceFilter)
      if (isNaN(price)) return []
      if (price > 0) return this.viruses.filter(v => v.price < price)
      return this.viruses
    },
    filterVirusesByName() {
      // no active filter => get whole list
      if (!this.filterNameActive) return this.viruses
      if (this.nameFilter) return this.viruses.filter(v => v.name.includes(this.nameFilter))
      return this.viruses
    },
    filterVirusesByStock() {
      // no active filter => get whole list
      if (!this.filterStockActive) return this.viruses
      if (this.stockFilter) return this.viruses.filter(v => v.stock > 0)
      return this.viruses
    },
    filterViruses() {
      let list = this.viruses
      if (this.filterPriceActive) {
        let price = parseInt(this.priceFilter)
        if ((!isNaN(price)) && (price > 0)) {
          list = list.filter(v => v.price < price)
        }
      }
      if (this.filterNameActive) {
        if (this.nameFilter) list = list.filter(v => v.name.includes(this.nameFilter))
      }
      if (this.filterStockActive) {
        if (this.stockFilter) list = list.filter(v => v.stock > 0)
      }
      return list
    }
  },
  methods: {
    ...mapActions('shop', ['getAllViruses', 'addItemBasket']),
    changeSelection(idx) {
      // get the virus in the filtered list
      let v = this.filterViruses[idx]
      // search its index in this.viruses
      let i = this.viruses.findIndex(el => el === v)
      // if i is in selected, remove it
      let j = this.selected.findIndex(el => el === i)
      if (j !== -1) {
        this.selected.splice(j, 1)
      } else {
        this.selected.push(i)
      }
    },
    addVirusToBasket(item) {
      let v;
      let q;
      if (this.itemAmount) {
        v = this.filterViruses[item[0]];
        q = item[1];
      } else {
        v = this.filterViruses[item];
        q = 1;
      }

      this.addItemBasket({item: v._id, amount: q})
    },
    addSelectedVirusesToBasket(items) {
      items.forEach(item => {
        let v;
        let q;
        if (this.itemAmount) {
          v = this.filterViruses[item[0]];
          q = item[1];
        } else {
          v = this.filterViruses[item];
          q = 1;
        }

        this.addItemBasket({item: v._id, amount: q})
      })

      // clear selection
      this.selected = [];
    }
  },
  mounted() {
    this.getAllViruses()
  }
}
</script>
