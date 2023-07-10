<template lang="pug">
.p-queue-item-attachments
	p-attachment(
		v-for="item in visibleItems"
		:key="item.id"
		:image="item.url"
	)
	.p-queue-item-attachments__counter(v-if="count") +{{ count }}
</template>

<script lang="ts" setup>
import type { Attachment } from '@postanu/types'

import { computed, toRefs } from 'vue'

import PAttachment from '../../p-attachment/PAttachment.vue'

const MAX_VISIBLE_COUNT = 4

interface Props {
	items: Attachment[]
}

const props = defineProps<Props>()

const { items } = toRefs(props)

const visibleItems = computed(() => {
	return items.value.slice(0, MAX_VISIBLE_COUNT)
})

const count = computed(() => {
	return items.value.length > MAX_VISIBLE_COUNT
		? items.value.length - MAX_VISIBLE_COUNT
		: false
})
</script>

<style lang="sass">
.p-queue-item-attachments
	display: flex
	gap: 10px

.p-queue-item-attachments__counter
	font-size: 12px
	line-height: 1
</style>
