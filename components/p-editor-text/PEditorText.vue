<template lang="pug">
.p-editor-text(:class="{ '--large': isLarge }")
	.p-editor-text__counter.p-headline
		.p-editor-text__counter-text(v-show="counter.text") {{ counter.text }}
		.p-editor-text__counter-tags(v-show="counter.tags") {{ counter.tags }} #
	.p-editor-text__hl(
		ref='hl'
		v-html="highlighted"
	)
	textarea.p-textarea.p-editor-text__area(
		ref='textarea'
		spellcheck="true"
		:placeholder="placeholder"
		:style="{ height: textareaHeight }"
		@input="handleInput"
	)
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { parseTweet } from '@postanu/twitter-text'

import { hashtagRegex, highlight } from './highlight'

export default defineComponent({
	name: 'PEditorText',
	props: {
		placeholder: {
			type: String,
			default: 'Start typing…'
		}
	},
	setup () {
		let hl = ref<null | HTMLElement>(null)
		let highlighted = ref('')
		let text = ref('')
		let textarea = ref<null | HTMLTextAreaElement>(null)
		let textareaHeight = ref()
		let isLarge = ref(true)

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

		let counter = computed(() => {
			return {
				text: parseTweet(text.value).weightedLength,
				tags: text.value.match(hashtagRegex)?.length
			}
		})

		return {
			textareaHeight,
			highlighted,
			textarea,
			counter,
			isLarge,
			hl,
			handleInput
		}
	}
})
</script>

<style lang="stylus">
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
