<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-if="itemCheck">Select.</th>
                    <th v-for="header in headers" :key="header.name">{{ header.label }}</th>
                    <th v-if="itemButton">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td v-if="itemCheck">
                        <input type="checkbox" v-model="selectedItems" :value="item" />
                    </td>
                    <td v-for="header in headers" :key="header.name">
                        <span :class="item[header.name + 'Class']">{{ item[header.name] }}</span>
                    </td>
                    <td v-if="itemButton">
                        <slot name="item-button" :label="'Détails'" :item="item">
                            <button @click="emitItemClicked(item)">Détails</button>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-if="tableButton" @click="emitTableClicked">
            <slot name="table-button">Voir</slot>
        </button>
    </div>
</template>

<script>
export default {
    name: 'DataTable',
    props: {
        headers: { type: Array, required: true },
        items: { type: Array, required: true },
        itemCheck: { type: Boolean, default: false },
        itemButton: { type: Boolean, default: false },
        tableButton: { type: Boolean, default: false }
    },
    data() {
        return {
            selectedItems: []
        };
    },
    methods: {
        emitItemClicked(item) {
            this.$emit('itemClicked', item);
        },
        emitTableClicked() {
            this.$emit('tableClicked', this.selectedItems);
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>