<template lang="pug">
component(
	:is="tag"
	:class=`{
		'p-heading': true,
		'p-hero': hero,
		[classByTag]: true,
		'p-heading--multiline': multiline
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

.p-heading--multiline
	line-height: var(--p-hero-multiline-line-height)
</style>
