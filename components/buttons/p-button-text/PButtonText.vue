<template lang="pug">
p-button.p-button-text(
	:class="`p-button-text--var--${$props.variant}`"
)
	slot
</template>

<script lang="ts" setup>
import PButton from '../p-button/PButton.vue'

interface Props {
	variant?: 'danger' | 'muted' | 'target'
}

defineProps<Props>()
</script>

<style lang="sass">
.p-button-text
	--p-button-content-padding: 5px 10px
	--p-button-radius: 6px
	--p-button-background: transparent
	--p-button-hover-background: var(--p-color-white-01)
	--p-button-active-background: var(--p-color-white-02)

	font-weight: 500

.p-button-text--var--danger
	color: var(--p-color-red-08)

.p-button-text--var--target
	color: var(--p-color-blue-09)

.p-button-text--var--muted
	color: var(--p-color-white-06)
</style>
