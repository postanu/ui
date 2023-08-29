<template lang="pug">
.p-editor-text(
	:class=`{
		['p-editor-text--size-' + size]: size
	}`
)
	.p-editor-text__highlight(v-html="highlighted")
	textarea.p-editor-text__textarea(
		ref="textareaRef"
		v-model="text"
		spellcheck="true"
		:placeholder="placeholder"
		:style="{ height }"
		@focus="onFocus(true)"
		@blur="onFocus(false)"
	)
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'

import {
	useTextareaAutosize,
	useTextareaHighlight
} from '../../../composables/index.js'

interface Props {
	placeholder: string
	text: string
}

interface Emits {
	(event: 'update:text', value: string): void
	(event: 'focus', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const text = useVModel(props, 'text', emit)

const size = computed(() => {
	if (text.value.length < 64) {
		return 'large'
	}
	return false
})

const { height } = useTextareaAutosize(text, textareaRef)
const { highlighted } = useTextareaHighlight(text)

function onFocus (value: boolean): void {
	emit('focus', value)
}

defineExpose({
	focus: () => {
		textareaRef.value?.focus()
	},
	blur: () => {
		textareaRef.value?.blur()
	}
})
</script>

<style lang="sass">
.p-editor-text
	--p-editor-text-padding: 0 0 30px 0
	--p-editor-text-font-size: var(--p-body-font-size)
	--p-editor-text-font-weight: var(--p-body-font-weight)
	--p-editor-text-line-height: var(--p-body-line-height)

	position: relative

.p-editor-text--size-large
	--p-editor-text-font-size: var(--p-h4-font-size)
	--p-editor-text-font-weight: var(--p-h4-font-weight)
	--p-editor-text-line-height: var(--p-h4-line-height)

.p-editor-text__textarea
	all: unset
	width: 100%
	min-height: 20px
	color: transparent
	caret-color: white
	resize: none

.p-editor-text__highlight,
.p-editor-text__textarea
	padding: var(--p-editor-text-padding)
	font-size: var(--p-editor-text-font-size)
	font-weight: var(--p-editor-text-font-weight)
	line-height: var(--p-editor-text-line-height)
	word-break: break-word
	white-space: pre-wrap

.p-editor-text__highlight
	box-sizing: content-box
	width: 100%
	min-height: calc(var(--p-editor-text-font-size) * var(--p-editor-text-line-height))
	pointer-events: none

.p-editor-text__textarea
	position: absolute
	top: 0
	box-sizing: border-box

mark
	color: var(--p-color-blue-08)
	background: none

.p-editor-text__url
	text-decoration: underline
</style>
