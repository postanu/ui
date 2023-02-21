<template lang="pug">
.p-editor-text(:class="{ '--large': isLarge }")
	.p-editor-text__counter.p-headline
		.p-editor-text__counter-text(v-show="counter.text") {{ counter.text }}
		.p-editor-text__counter-tags(v-show="counter.tags") {{ counter.tags }} #
	.p-editor-text__hl(
		ref="hl"
		v-html="highlighted"
	)
	textarea.p-textarea.p-editor-text__area(
		ref="textarea"
		spellcheck="true"
		:placeholder="placeholder"
		:style="{ height: textareaHeight }"
		@input="handleInput"
	) {{ text }}
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, toRefs } from 'vue'
import { parseTweet } from '@postanu/twitter-text'

import { hashtagRegex, highlight } from './highlight.js'

interface Props {
	placeholder: string
	text: string
}

const props = withDefaults(
	defineProps<Props>(),
	{
		placeholder: 'Start typing…',
		text: ''
	}
)

const { text: initialText } = toRefs(props)

const hl = ref<null | HTMLElement>(null)
const highlighted = ref('')
const text = ref('')
const textarea = ref<null | HTMLTextAreaElement>(null)
const textareaHeight = ref()
const isLarge = ref(true)

onMounted(() => {
	if (initialText.value.length > 0) {
		handleInput()
	}
})

async function updateTextareaHeight (): Promise<void> {
	await nextTick()
	textareaHeight.value = `${hl.value?.offsetHeight}px`
}

async function handleInput (): Promise<void> {
	if (!textarea.value || !hl.value) return
	text.value = textarea.value.value
	highlighted.value = highlight(text.value)

	await updateTextareaHeight()

	let lineBreaks = highlighted.value.split('<br>').length
	isLarge.value = counter.value.text < 280 && lineBreaks < 8
	await updateTextareaHeight()
}

const counter = computed(() => {
	return {
		text: parseTweet(text.value).weightedLength,
		tags: text.value.match(hashtagRegex)?.length
	}
})
</script>

<style lang="sass">
.p-textarea
	all: unset
	width: 100%
	height: auto
	resize: none

.p-editor-text
	position: relative
	max-width: 420px // temp

	&.--large
		max-width: 560px // temp
		font-size: 30px

.p-editor-text__counter
	display: flex
	gap: 10px
	cursor: default

.p-editor-text__hl,
.p-editor-text__area
	position: absolute
	top: 30px
	word-break: break-word
	white-space: pre-wrap

.p-editor-text__hl
	width: 100%
	min-height: 60px

mark
	color: var(--p-color-blue-07)
	background: none

	&.p-editor-text__link
		text-decoration: underline

.p-editor-text__area
	padding-bottom: 30px
	color: transparent
	caret-color: white
</style>
