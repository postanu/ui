<template lang="pug">
ul.p-editor-attachments(
	ref="el"
	:class=`{
		[countClass]: true,
		'--disabled': isDisabled
	}`
)
	li.p-editor-attachments__item(
		v-for="id in list"
		:key="id"
	)
		slot(:id="id")
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { computed, ref, toRefs } from 'vue'

interface Props {
	modelValue: string[]
	movable?: boolean
}

interface Emits {
	(event: 'update:modelValue', value: string[]): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		movable: true
	}
)
const emit = defineEmits<Emits>()
const { movable } = toRefs(props)
const list = useVModel(props, 'modelValue', emit)

const el = ref<HTMLElement | null>()

const countClass = computed(() => `--${list.value.length}`)
const isDisabled = computed(() => !movable.value)

useSortable(el, list, {
	disabled: isDisabled.value,
	ghostClass: '--ghost'
})
</script>

<style lang="sass">
.p-editor-attachments
	--p-editor-border-color: var(--p-color-white-02)

	display: flex
	flex-flow: row wrap
	gap: 20px
	max-width: 420px

	&.--1 .p-editor-attachments__item
		aspect-ratio: 1.5

	&.--2 .p-editor-attachments__item
		aspect-ratio: 2 / 1.3

	&.--3 .p-editor-attachments__item
		aspect-ratio: 1.0236 / 1

	&.--4 .p-editor-attachments__item
		flex-basis: calc(50% - 10px)
		aspect-ratio: 2 / 1.3

	&.--5 .p-editor-attachments__item
		&:nth-child(-n+2)
			flex-basis: calc(50% - 10px)
			aspect-ratio: 2 / 1.3

		&:nth-child(n+3)
			aspect-ratio: 1.0236 / 1

	&.--6 .p-editor-attachments__item
		flex-basis: calc((100% - 40px) / 3)
		aspect-ratio: 1.0236 / 1

	&.--7 .p-editor-attachments__item
		&:nth-child(-n+3)
			flex-basis: calc((100% - 40px) / 3)
			aspect-ratio: 1.27 / 0.94

		&:nth-child(n+4)
			aspect-ratio: 1

	&.--8 .p-editor-attachments__item
		flex-basis: calc((100% - 60px) / 4)
		aspect-ratio: 1

	&.--9 .p-editor-attachments__item
		aspect-ratio: 1

		&:nth-child(-n+4)
			flex-basis: calc((100% - 60px) / 4)

		&:nth-child(n+5)
			flex-basis: calc((100% - 80px) / 5)

	&.--10 .p-editor-attachments__item
		flex-basis: calc((100% - 80px) / 5)
		aspect-ratio: 1

	&.--disabled
		.p-editor-attachments__item
			cursor: default

	&:not(.--disabled)
		.p-editor-attachments__item:hover
			--p-editor-border-color: var(--p-color-white-05)

.p-editor-attachments__item
	position: relative
	flex: 1
	width: 100%
	height: 100%
	cursor: move

	&.--ghost
		--p-editor-border-color: var(--p-color-blue)

	.p-image
		--p-image-size: 100%
		--p-image-border: none

	.p-image:after
		content: none

.p-editor-attachments__item:after
	position: absolute
	inset: -1px
	pointer-events: none
	content: ""
	border: 1px solid var(--p-editor-border-color)
	border-radius: 3px
</style>
