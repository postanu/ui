<template lang="pug">
component(
	:is="tag"
	:class=`{
		'p-heading': true,
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
</style>
