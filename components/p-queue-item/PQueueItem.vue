<template lang="pug">
.p-queue-item(:class="{ '--removing': isRemoving }")
	.p-queue-item__meta
		.p-queue-item__time {{ time }}
		.p-queue-item__pages
			p-queue-item-pages(:pages="pages")
		.p-queue-item__state
	.p-queue-item__main
		.p-queue-item__title(v-if="hasTitle") {{ title }}
		.p-queue-item__description(v-else) {{ description }}
		.p-queue-item__attachments
			p-queue-item-attachments(:items="attachments")
		.p-queue-item__controls
			p-button-remove(
				@removing="emitRemoving"
				@remove="emitRemove"
			)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import type { Attachment, ClientPage, PostState } from '@postanu/types'

import { useQueueItemDescription } from '../../composables/useQueueItemDescription'
import { useQueryItemTitle } from '../../composables/useQueryItemTitle'
import PQueueItemAttachments from '../p-queue-item-attachments/PQueueItemAttachments.vue'
import PQueueItemPages from '../p-queue-item-pages/PQueueItemPages.vue'
import PButtonRemove from '../p-button-remove/PButtonRemove.vue'

interface Props {
	time: string
	pages: ClientPage[]
	title: string
	attachments: Attachment[]
	state: PostState
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(e: 'removing', state: boolean): void
	(e: 'remove'): void
}>()

const {
	title: initTitle,
	attachments
} = toRefs(props)

const title = useQueryItemTitle(initTitle)
const description = useQueueItemDescription(attachments)

const isRemoving = ref(false)

const hasTitle = computed(() => title.value.length > 0)

function emitRemoving (state: boolean): void {
	isRemoving.value = state
	emit('removing', state)
}

function emitRemove (): void {
	emit('remove')
}
</script>

<style lang="stylus">
.p-queue-item
	position: relative
	display: grid
	grid-template-columns: 50% 50%
	line-height: 50px
	white-space: nowrap
	cursor: pointer
	user-select: none

	&.--removing
		.p-queue-item__controls
			opacity: 1

.p-queue-item:hover
	&:after
		opacity: 1

	.p-queue-item__controls
		opacity: 1

.p-queue-item:before,
.p-queue-item:after
	position: absolute
	z-index: -1
	content: ""

.p-queue-item:before
	top: -1px
	right: -20px
	bottom: 0px
	left: -20px
	border-top: 1px solid var(--p-color-white-01)
	border-bottom: 1px solid var(--p-color-white-01)

.p-queue-item:after
	top: 0px
	right: -20px
	bottom: 1px
	left: -20px
	background-color: var(--p-color-white-005)
	opacity: 0
	transition: opacity 0.05s ease-in

.p-queue-item__meta
	display: grid
	grid-template-columns: 120px minmax(360px, 50%) 80px
	gap: 20px
	justify-content: space-between
	padding-right: 20px

.p-queue-item__main
	display: grid
	grid-template-columns: 420px 150px auto 190px
	gap: 20px

.p-queue-item__state
	display: flex
	align-items: center
	justify-content: flex-end

// .p-queue-item__title

.p-queue-item__description
	color: var(--p-color-white-05)

.p-queue-item__attachments
	display: flex
	align-items: center

.p-queue-item__controls
	display: flex
	grid-area: 1 / 4
	align-items: center
	justify-content: flex-end
	opacity: 0
	transition: opacity 0.05s ease-in
</style>
