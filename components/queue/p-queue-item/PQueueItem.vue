<template lang="pug">
.p-queue-item(:class="{ '--removing': isRemoving }")
	button.p-queue-item__button(@click="emitClick")
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
			ref="removeButtonRef"
			@removing="emitRemoving"
			@remove="emitRemove"
		)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import type { Attachment, ClientPage, PostState } from '@postanu/types'

import { useQueueItemDescription } from '../../../composables/useQueueItemDescription/index.js'
import { useQueryItemTitle } from '../../../composables/useQueryItemTitle/index.js'
import PQueueItemAttachments from '../p-queue-item-attachments/PQueueItemAttachments.vue'
import PQueueItemPages from '../p-queue-item-pages/PQueueItemPages.vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PButtonRemove from '../../buttons/p-button-remove/PButtonRemove.vue'

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
	(e: 'click'): void
}>()

const { title: initTitle, attachments } = toRefs(props)

const title = useQueryItemTitle(initTitle)
const description = useQueueItemDescription(attachments)

const removeButtonRef = ref<null | typeof PButtonRemove>(null)
const isRemoving = ref(false)
const hasTitle = computed(() => title.value.length > 0)

function emitRemoving (state: boolean): void {
	isRemoving.value = state
	emit('removing', state)
}

function emitRemove (): void {
	emit('remove')
}

function emitClick (): void {
	emit('click')
}

defineExpose({ removeButtonRef })
</script>

<style lang="sass">
.p-queue-item
	position: relative
	white-space: nowrap
	user-select: none

	&:hover
		&:after
			opacity: 1

	&:hover,
	&.--removing
		.p-queue-item__controls
			opacity: 1

.p-queue-item:before,
.p-queue-item:after
	position: absolute
	z-index: -1
	content: ""

.p-queue-item:before
	inset: -1px -20px 0
	border-top: 1px solid var(--p-color-white-01)
	border-bottom: 1px solid var(--p-color-white-01)

.p-queue-item:after
	inset: 0 -20px 1px
	background-color: var(--p-color-white-005)
	opacity: 0
	transition: opacity 0.05s ease-in

.p-queue-item__button
	display: grid
	grid-template-columns: 50% 50%
	width: 100%
	line-height: 50px

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

.p-queue-item__pages,
.p-queue-item__attachments
	display: flex
	align-items: center

.p-queue-item__state
	display: flex
	align-items: center
	justify-content: flex-end

.p-queue-item__description
	color: var(--p-color-white-05)

.p-queue-item__controls
	position: absolute
	top: 0
	right: 0
	display: flex
	grid-area: 1 / 4
	align-items: center
	justify-content: flex-end
	height: 100%
	opacity: 0
	transition: opacity 0.05s ease-in
</style>
