<template lang="pug">
component.p-headline(:is="tag")
	slot
</template>

<script lang="ts" setup>
import type { ALLOWED_TAGS } from '../allowed-tags/index.js'

interface Props {
	tag: typeof ALLOWED_TAGS[number]
}

interface Slots {
	default: () => unknown
}

defineProps<Props>()

defineSlots<Slots>()
</script>

<style lang="sass">
.p-headline
	font-size: var(--p-headline-font-size)
	font-weight: var(--p-headline-font-weight)
	line-height: var(--p-headline-line-height)
	color: var(--p-color-white-04)
	text-transform: uppercase
	user-select: none
</style>
