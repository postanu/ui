<template lang="pug">
.p-queue-item-attachments-list
	p-queue-item-attachment-image.p-queue-item-attachments-list__item(
		v-for="item in visibleItems"
		:key="item.id"
		:image="item.src"
	)
	.p-queue-item-attachments-list__counter(v-if="count") +{{ count }}
</template>

<script lang="ts" setup>
import type { Attachment } from '@postanu/shared'

import { computed, toRefs } from 'vue'

import { PQueueItemAttachmentImage } from '../index.js'

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
.p-queue-item-attachments-list
	display: flex
	gap: 10px

.p-queue-item-attachments-list__item
	--p-queue-item-attachment-image-size: 20px

.p-queue-item-attachments-list__counter
	font-size: 12px
	line-height: 10px

@media (width < 800px)
	.p-queue-item-attachments-list
		gap: 5px
		padding: 4px 0

	.p-queue-item-attachments-list__item
		--p-queue-item-attachment-image-size: 12px

	.p-queue-item-attachments-list__counter
		font-size: 10px
		line-height: 8px
</style>
