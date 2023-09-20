<template lang="pug">
transition(
	name="p-queue-editor"
	mode="out-in"
)
	component.p-queue-editor(
		:is="component"
		:class=`{
			'p-queue-editor--activated': activated
		}`
		@click="activate"
	)
		template(v-if="!activated")
			.p-queue-editor__placeholder-time {{ placeholderTime }}
			.p-queue-editor__placeholder-content {{ placeholderContent }}
		template(v-else)
			p-button-icon.p-queue-editor__controls-close
				p-icon-close
			.p-queue-editor__meta
				.p-queue-editor__time
					p-editor-time(
						v-model="time"
						:allow-now="false"
					)
				.p-queue-editor__pages
					.p-queue-editor__pages-item(
						v-for="network in networks"
						:key="network"
						:class=`{
							'p-queue-editor__pages-item--disabled': !isAllowedNetwork(network)
						}`
					)
						p-icon-network(:network="network")
			.p-queue-editor__main
				p-headline.p-queue-editor__counters(
					v-if="showCounters"
					tag="div"
				)
					span {{ counters.text }}
					span(v-if="counters.tags > 0") {{ counters.tags }} #
				p-editor-text.p-queue-editor__textarea(
					ref="textareaRef"
					v-model:text="text"
					:placeholder="placeholder"
					@click="focusTextarea"
					@focus="onTextareaFocus"
				)
				.p-queue-editor__attachments
				.p-queue-editor__controls
					//
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/types'

import { useVModels } from '@vueuse/core'
import { computed, ref, toRefs, watch } from 'vue'

import { useTextCounters } from '../../../composables/index.js'
import {
	PButtonIcon,
	PHeadline,
	PIconClose,
	PIconNetwork
} from '../../core/index.js'
import { PEditorText, PEditorTime } from '../../editor/index.js'

interface Props {
	placeholder: string
	placeholderTime: string
	placeholderContent: string
	networks: PageNetwork[]
	allowedNetworks: PageNetwork[]
	activated: boolean
	time: number
	text: string
}

interface Emits {
	(event: 'update:activated', value: boolean): void
	(event: 'update:time', value: number): void
	(event: 'update:text', value: string): void
	(event: 'focus', value: boolean): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
const { allowedNetworks } = toRefs(props)
const { activated, text, time } = useVModels(props, emit)

const textareaRef = ref<InstanceType<typeof PEditorText> | null>(null)

const component = computed(() => activated.value ? 'div' : 'button')

const unwatchFocus = watch(
	() => [
		textareaRef.value,
		activated.value
	],
	([hasRef, isActivated]) => {
		if (hasRef && isActivated) {
			textareaRef.value?.focus()
			unwatchFocus()
		}
	},
	{ immediate: true }
)

const counters = useTextCounters(text)
const showCounters = computed(
	() => counters.value.text > 0 || counters.value.tags > 0
)

function onTextareaFocus (value: boolean): void {
	emit('focus', value)
}

function activate (): void {
	emit('update:activated', true)
}

function focusTextarea (): void {
	textareaRef.value?.focus()
}

function isAllowedNetwork (network: PageNetwork): boolean {
	return allowedNetworks.value.includes(network)
}
</script>

<style lang="sass">
.p-queue-editor
	position: relative
	display: grid
	grid-template-columns: 50% 50%
	width: 100%
	min-height: 50px
	color: var(--p-color-white-04)

.p-queue-editor--activated
	min-height: 150px
	color: var(--p-color-white-09)

.p-queue-editor:not(.p-queue-editor-leave-active, .p-queue-editor--activated):hover
	background-color: var(--p-color-white-005)

// transition out
.p-queue-editor-leave-active
	transition: min-height 0.2s ease-out

	.p-queue-editor__placeholder-time,
	.p-queue-editor__placeholder-content
		transition: opacity 0.2s ease-out

.p-queue-editor-leave-to
	min-height: 150px

	.p-queue-editor__placeholder-time,
	.p-queue-editor__placeholder-content
		opacity: 0

// transition in
.p-queue-editor-enter-active
	transition-duration: 0.05s

	.p-queue-editor__meta,
	.p-queue-editor__main
		transition: opacity 0.05s ease-in

.p-queue-editor-enter-from
	.p-queue-editor__meta,
	.p-queue-editor__main
		opacity: 0

.p-queue-editor:before
	position: absolute
	inset: -1px 0 0
	pointer-events: none
	content: ""
	border-top: 1px solid var(--p-color-white-01)
	border-bottom: 1px solid var(--p-color-white-01)

.p-queue-editor__placeholder-time,
.p-queue-editor__placeholder-content
	line-height: 50px

.p-queue-editor__placeholder-time
	padding-left: 20px

.p-queue-editor__controls-close
	position: absolute
	top: -70px
	left: 0
	--p-button-padding: 20px
	// padding: 10px

.p-queue-editor__meta
	display: grid
	grid-template-columns: 120px minmax(360px, 50%) 80px
	gap: 20px
	justify-content: space-between
	padding-right: 20px

.p-queue-editor__time
	padding: 10px // TODO

.p-queue-editor__pages
	display: flex
	gap: 10px
	padding: 15px 0

.p-queue-editor__pages-item--disabled
	color: var(--p-color-white-04)

.p-queue-editor__main
	display: grid
	grid-template-columns: 420px 150px auto 190px
	gap: 20px

.p-queue-editor__counters
	position: absolute
	top: -30px
	display: flex
	gap: 10px
	padding: 0

.p-queue-editor__textarea
	--p-editor-text-padding: 15px 0 30px 0
	cursor: text

.p-queue-editor__attachments
	padding: 15px 0
</style>
