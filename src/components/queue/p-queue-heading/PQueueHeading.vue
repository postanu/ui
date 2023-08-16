<template lang="pug">
.p-queue-heading(:class="{ 'p-queue-heading--muted': muted }")
	p-heading.p-h1.p-queue-heading__title(tag="h2")
		slot(name="title")
	.p-queue-heading__subtitle
		slot(name="subtitle")
</template>

<script lang="ts" setup>
import PHeading from '../../core/typography/p-heading/PHeading.vue'

interface Props {
	muted: boolean
}

interface Slots {
	title: string
	subtitle: string
}

defineProps<Props>()
defineSlots<Slots>()
</script>

<style lang="sass">
.p-queue-heading
	display: flex

.p-queue-heading--muted
	.p-queue-heading__title
		color: var(--p-color-white-04)

.p-queue-heading__title
	font-size: var(--p-h1-font-size)
	font-weight: var(--p-h1-font-weight)
	line-height: var(--p-h1-no-line-height)
	color: var(--p-color-white-08)
	text-transform: uppercase

.p-queue-heading__subtitle
	margin-left: 20px
	font-size: var(--p-h2-regular-font-size)
	line-height: 0.7334
	color: var(--p-color-white-04)
</style>
