<template lang="pug">
.p-editor-time(
	:class=`{
		'--h': focus === 'h',
		'--m': focus === 'm',
		'--ampm': focus === 'ampm',
		'--military': isMilitary
	}`
)
	.p-editor-time__now(
		v-if="isNow"
		@click="hideNow"
	) Now
	template(v-else)
		p-input.p-editor-time__input(
			name="hours"
			maxlength="2"
			ref="hoursInput"
			v-model="hours"
			@blur="onFocus(false)"
			@focus="onFocus('h')"
			@keydown="onKeydown($event, 'h')"
			@keypress="onKeypress($event, 'h')"
		)
		.p-editor-time__colon :
		p-input.p-editor-time__input(
			name="minutes"
			maxlength="2"
			ref="minutesInput"
			v-model="minutes"
			@blur="onFocus(false)"
			@focus="onFocus('m')"
			@keydown="onKeydown($event, 'm')"
			@keypress="onKeypress($event, 'm')"
		)
		template(v-if="ampm")
			span.p-editor-time__space
			p-input.p-editor-time__input(
				name="ampm"
				maxlength="2"
				ref="ampmInput"
				v-model="ampm"
				@blur="onFocus(false)"
				@focus="onFocus('ampm')"
				@keydown="onKeydown($event, 'ampm')"
				@keypress="onKeypress($event, 'ampm')"
			)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, unref, watch } from 'vue'

import { timeRef } from '../../../composables/timeRef.js'
import { useNow } from '../../../composables/useNow.js'
import PInput from '../../p-input/PInput.vue'

type InputType = 'h' | 'm' | 'ampm'
type InputRef = InstanceType<typeof PInput> | null

const ALLOWED_SYMBOLS = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const ALLOWED_KEYS = new Set([
	'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'
])
const NOW_DIFF = 60_000

interface Props {
	modelValue: number
	locales?: string
}

interface Emits {
	(event: 'update:modelValue', value: number): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		locales: undefined
	}
)

const emit = defineEmits<Emits>()

const { locales, modelValue } = toRefs(props)

const { hours, minutes, ampm } = timeRef(
	modelValue,
	locales.value,
	newDate => {
		emit('update:modelValue', newDate)
	}
)
const focus = ref<false | InputType>(false)

const ampmInput = ref<InputRef>(null)
const hoursInput = ref<InputRef>(null)
const minutesInput = ref<InputRef>(null)

const isMilitary = computed(() => ampm.value === null)

const now = useNow()
const showNow = ref(true)
const isNow = computed(() => {
	let min = now.value.getTime() - NOW_DIFF
	let max = now.value.getTime() + NOW_DIFF
	return showNow.value && modelValue.value > min && modelValue.value < max
})

function hideNow (): void {
	showNow.value = false
}

let nowTimeout: ReturnType<typeof setTimeout> | undefined
watch(focus, () => {
	if (focus.value === false) {
		nowTimeout = setTimeout(() => {
			showNow.value = true
		}, 4000)
	} else {
		showNow.value = false
		if (nowTimeout) {
			clearTimeout(nowTimeout)
			nowTimeout = undefined
		}
	}
})

function setFocus (input: InputType, dir: 'prev' | 'next'): void {
	if (dir === 'prev') {
		if (input === 'ampm') minutesInput.value?.focus()
		if (input === 'm') hoursInput.value?.focus()
		if (input === 'h') ampmInput.value?.focus()
	} else {
		if (input === 'h') minutesInput.value?.focus()
		if (input === 'm') ampmInput.value?.focus()
		if (input === 'ampm') hoursInput.value?.focus()
	}
}

function onFocus (value: typeof focus.value): void {
	focus.value = value
}

function onKeydown (event: KeyboardEvent, input: InputType): void {
	let { key, shiftKey } = event
	if (ALLOWED_KEYS.has(key)) {
		event.preventDefault()
	}

	if (key === 'ArrowLeft' || key === 'ArrowRight') {
		setFocus(input, key === 'ArrowLeft' ? 'prev' : 'next')
	} else if (input === 'ampm') {
		if (key === 'ArrowUp' || key === 'ArrowDown') {
			ampm.change()
		}
	} else {
		let inputRef = input === 'h' ? hours : minutes
		// eslint-disable-next-line unicorn/prefer-switch
		if (key === 'ArrowUp') {
			inputRef.increase(shiftKey ? 10 : 1)
		} else if (key === 'ArrowDown') {
			inputRef.decrease(shiftKey ? 10 : 1)
		} else if (key === 'Backspace' || key === 'Delete') {
			inputRef.set('')
		}
	}
}

function onKeypress (event: KeyboardEvent, input: InputType): void {
	event.preventDefault()

	let key = event.key
	if (input === 'ampm') {
		key = key.toLowerCase()
		if (key === 'a') {
			ampm.change('AM')
		} else if (key === 'p') {
			ampm.change('PM')
		}
	} else {
		let number = Number(event.key)
		let inputRef = input === 'h' ? hours : minutes
		let value = Number(unref(inputRef))

		if (!ALLOWED_SYMBOLS.has(number)) return

		if (value.toString().length === 1) {
			inputRef.set(`${value}${number}`)
		} else {
			inputRef.set(`${number}`)
		}
	}
}
</script>

<style lang="sass">
.p-editor-time
	position: relative
	display: inline-flex
	cursor: default

.p-editor-time:hover:before
	opacity: 1

.p-editor-time:before
	position: absolute
	top: 0
	left: 0
	z-index: -1
	box-sizing: content-box
	width: 100%
	height: 100%
	content: ""
	background-color: var(--p-color-white-01)
	border-radius: 6px
	opacity: 0
	transition: opacity 0.1s ease-in, width 0.1s ease-in, margin-left 0.1s ease-in

.p-editor-time.--h
	&:before
		width: 30px
		margin-left: 4px
		opacity: 1

	.p-editor-time__input[name="hours"]
		padding-right: 5px

.p-editor-time.--m
	&:before
		width: 30px
		margin-left: 29px
		opacity: 1

	.p-editor-time__input[name="minutes"]
		padding-right: 5px
		padding-left: 5px

	.p-editor-time__input[name="hours"]
		margin-left: -4px

.p-editor-time.--ampm
	&:before
		width: 32px
		margin-left: 52px
		opacity: 1

.p-editor-time.--military
	.p-editor-time__input[name="minutes"]
		padding-right: 10px

.p-editor-time__now
	padding: 5px 10px

.p-editor-time__input
	box-sizing: content-box
	width: 19px
	padding: 5px 0px
	caret-color: transparent
	transition: margin-left 0.15s ease-in, padding 0.15s ease-in

	&::selection
		background-color: transparent

	&:focus
		box-shadow: none

	&[name="hours"]
		padding-left: 10px
		text-align: right

	&[name="ampm"]
		width: 23px
		padding-right: 10px

.p-editor-time__space:before
	content: "\00a0 "

.p-editor-time__colon
	padding: 5px 0px
</style>
