<template lang="pug">
.p-queue-heading(:class="classList")
	h2.p-queue-heading__title
		slot(name="title")
	.p-queue-heading__subtitle
		slot(name="subtitle")
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
	size: 'large' | 'small'
	muted: boolean
}

interface Slots {
	title: string
	subtitle: string
}

const props = defineProps<Props>()
defineSlots<Slots>()

const classList = computed(() => ({
	[`p-queue-heading--${props.size}`]: true,
	'p-queue-heading--muted': props.muted
}))
</script>

<style lang="sass">
.p-queue-heading
	--p-queue-heading-title-color: var(--p-color-white-08)
	--p-queue-heading-subtitle-color: var(--p-color-white-04)

	display: flex
	align-items: flex-start

.p-queue-heading--large
	--p-queue-heading-title-font-size: var(--p-h1-font-size)
	--p-queue-heading-title-font-weight: var(--p-h1-font-weight)
	--p-queue-heading-title-line-height: var(--p-h1-line-height-decorative)
	--p-queue-heading-subtitle-font-size: var(--p-h1-subtitle-font-size)
	--p-queue-heading-subtitle-font-weight: var(--p-h1-subtitle-font-weight)
	--p-queue-heading-subtitle-line-height: var(--p-h1-subtitle-line-height)

.p-queue-heading--small
	--p-queue-heading-title-font-size: var(--p-h2-font-size)
	--p-queue-heading-title-font-weight: var(--p-h2-font-weight)
	--p-queue-heading-title-line-height: var(--p-h2-line-height-decorative)
	--p-queue-heading-subtitle-font-size: var(--p-h2-subtitle-font-size)
	--p-queue-heading-subtitle-font-weight: var(--p-h2-subtitle-font-weight)
	--p-queue-heading-subtitle-line-height: var(--p-h2-subtitle-line-height)

.p-queue-heading--muted
	--p-queue-heading-title-color: var(--p-color-white-04)

.p-queue-heading__title
	font-size: var(--p-queue-heading-title-font-size)
	font-weight: var(--p-queue-heading-title-font-weight)
	line-height: var(--p-queue-heading-title-line-height)
	color: var(--p-queue-heading-title-color)
	text-transform: uppercase

.p-queue-heading__subtitle
	margin-left: 20px
	font-size: var(--p-queue-heading-subtitle-font-size)
	font-weight: var(--p-queue-heading-subtitle-font-weight)
	line-height: var(--p-queue-heading-subtitle-line-height)
	color: var(--p-queue-heading-subtitle-color)
</style>
