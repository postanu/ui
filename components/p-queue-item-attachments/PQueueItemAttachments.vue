<template lang="pug">
.p-queue-item-attachments
	p-attachment(
		v-for="item in visibleItems"
		:key="item.id"
		:image="item.url"
	)
	.p-queue-item-attachments__counter(v-if="count") +{{ count }}
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { Attachment } from '@postanu/types'
import type { PropType } from 'vue'

import PAttachment from '../p-attachment/PAttachment.vue'

const MAX_VISIBLE_COUNT = 4

export default defineComponent({
	components: {
		PAttachment
	},
	props: {
		items: {
			type: Array as PropType<Attachment[]>,
			required: true
		}
	},
	setup (props) {
		let { items } = toRefs(props)

		let visibleItems = computed(() => {
			return items.value.slice(0, MAX_VISIBLE_COUNT)
		})

		let count = computed(() => {
			return items.value.length > MAX_VISIBLE_COUNT
				? items.value.length - MAX_VISIBLE_COUNT
				: false
		})

		return { visibleItems, count }
	}
})
</script>

<style lang="stylus">
.p-queue-item-attachments
	display: flex
	gap: 10px

.p-queue-item-attachments__counter
	font-size: 12px
	line-height: 1
</style>
