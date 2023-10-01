<template lang="pug">
draggable.p-editor-attachments(
	v-model="items"
	:class=`{
		[countClass]: true,
		'--disabled': disabled
	}`
	tag="ul"
	item-key="id"
	:disabled="disabled"
	ghost-class="p-editor-attachments__ghost"
	chosen-class="p-editor-attachments__chosen"
)
	template(#item="{ element }")
		li
			p-queue-item-attachment-image.p-editor-attachments__item(
				:image="element.url"
			)
</template>

<script lang="ts" setup>
import type { Attachment } from '@postanu/shared'

import { useVModel } from '@vueuse/core'
import { computed, toRefs } from 'vue'
import draggable from 'vuedraggable'

import { PQueueItemAttachmentImage } from '../../queue/index.js'

interface Props {
	modelValue: Attachment[]
	disabled?: boolean
}

interface Emits {
	(event: 'update:modelValue', value: Attachment[]): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		disabled: false
	}
)

const emit = defineEmits<Emits>()

const { modelValue } = toRefs(props)

const items = useVModel(props, 'modelValue', emit)

// const items = computed({
// 	get: () => unref(modelValue),
// 	set: value => {
// 		emit('update:modelValue', value)
// 	}
// })
const count = computed(() => modelValue.value.length)
const countClass = computed(() => `--${count.value}`)
</script>

<style lang="sass">
.p-editor-attachments
	display: flex
	flex-flow: row wrap
	gap: 20px
	max-width: 420px

	&.--1 li
		aspect-ratio: 1.5

	&.--2 li
		aspect-ratio: 2 / 1.3

	&.--3 li
		aspect-ratio: 1.0236 / 1

	&.--4 li
		flex-basis: calc(50% - 10px)
		aspect-ratio: 2 / 1.3

	&.--5 li
		&:nth-child(-n+2)
			flex-basis: calc(50% - 10px)
			aspect-ratio: 2 / 1.3

		&:nth-child(n+3)
			aspect-ratio: 1.0236 / 1

	&.--6 li
		flex-basis: calc((100% - 40px) / 3)
		aspect-ratio: 1.0236 / 1

	&.--7 li
		&:nth-child(-n+3)
			flex-basis: calc((100% - 40px) / 3)
			aspect-ratio: 1.27 / 0.94

		&:nth-child(n+4)
			aspect-ratio: 1

	&.--8 li
		flex-basis: calc((100% - 60px) / 4)
		aspect-ratio: 1

	&.--9 li
		aspect-ratio: 1

		&:nth-child(-n+4)
			flex-basis: calc((100% - 60px) / 4)

		&:nth-child(n+5)
			flex-basis: calc((100% - 80px) / 5)

	&.--10 li
		flex-basis: calc((100% - 80px) / 5)
		aspect-ratio: 1

	&.--disabled
		.p-editor-attachments__item
			cursor: default

	&:not(.--disabled)
		li:hover
			.p-queue-item-attachment-image__i
				border-color: var(--p-color-white-05)

	li
		flex: 1
		width: 100%
		height: 100%

		&.p-editor-attachments__chosen
			.p-editor-attachments__item
				.p-queue-item-attachment-image__i
					border-color: var(--p-color-blue)

		&.p-editor-attachments__ghost
			.p-queue-item-attachment-image__i
				opacity: 0.5

.p-editor-attachments__item
	width: 100%
	height: 100%
	cursor: move
</style>
