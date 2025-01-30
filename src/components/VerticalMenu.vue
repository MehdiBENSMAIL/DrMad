<template>
    <div class="vertical-menu">
        <div v-for="(item, index) in items" :key="index" class="menu-item">
            <template v-if="item.type === 'title'">
                <slot name="menu-title" :label="item.label">
                    {{ item.label }}
                </slot>
            </template>

            <template v-if="item.type === 'link'">
                <span @click="!item.disabled && goTo(item.to)" class="menu-link">
                    <button :disabled="item.disabled">{{ item.label }}</button>
                </span>
            </template>
        </div>
    </div>
</template>

<script>
export default {
	name: "VerticalMenu",
	props: { items: Array },
	methods: {
		goTo(dest) {
			this.$router.push(dest);
		}
	}
}
</script>

<style scoped>
.vertical-menu {
	display: flex;
	flex-direction: column;
}

.menu-item {
	margin: 5px 0;
}

.menu-link {
	cursor: pointer;
	padding-left: 10px;
}

.menu-link button:disabled {
    background-color: #bbb9b9;
    cursor: not-allowed;
}
</style>
