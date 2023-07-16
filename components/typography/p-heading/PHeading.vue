<template lang="pug">
component(
	:is="tag"
	:class=`{
		'p-heading': true,
		'p-heading--hero': hero,
		'p-heading--multiline': multiline,
		[classByTag]: true
	}`
)
	slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import type { ALLOWED_TAGS } from '../allowed-tags/index.js'

interface Props {
	tag: typeof ALLOWED_TAGS[number]
	hero?: boolean
	multiline?: boolean
}

interface Slots {
	default: () => unknown
}

const props = defineProps<Props>()
defineSlots<Slots>()

const classByTag = computed(() => `p-${props.tag}`)
</script>

<style lang="sass">
.p-heading
	user-select: none

.p-heading--hero
	font-size: var(--p-hero-font-size)
	font-weight: var(--p-hero-font-weight)
	line-height: var(--p-hero-line-height)
	color: var(--p-color-white-08)
	text-transform: uppercase

.p-heading--multiline
	line-height: 1.471

@media (width < 1280px)
	.p-heading
		font-size: 5.3334vw
</style>
