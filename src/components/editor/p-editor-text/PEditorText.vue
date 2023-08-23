<template lang="pug">
.p-editor-text
	.p-editor-text__highlight(v-html="highlighted")
	textarea.p-editor-text__textarea(
		ref="textareaRef"
		v-model="text"
		spellcheck="true"
		:placeholder="placeholder"
		:style="{ height }"
	)
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'

import {
	useTextareaAutosize,
	useTextareaHighlight
} from '../../../composables/index.js'

interface Props {
	placeholder: string
	text: string
}

interface Emits {
	(event: 'update:text', text: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const text = useVModel(props, 'text', emit)

const { height } = useTextareaAutosize(text, textareaRef)
const { highlighted } = useTextareaHighlight(text)
</script>

<style lang="sass">
.p-editor-text
	position: relative

.p-editor-text__textarea
	all: unset
	width: 100%
	padding-bottom: 30px
	color: transparent
	caret-color: white
	resize: none

.p-editor-text__highlight,
.p-editor-text__textarea
	position: absolute
	top: 0
	word-break: break-word
	white-space: pre-wrap

.p-editor-text__highlight
	width: 100%

mark
	color: var(--p-color-blue-08)
	background: none

.p-editor-text__url
	text-decoration: underline
</style>
