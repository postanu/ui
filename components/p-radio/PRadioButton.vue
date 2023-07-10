<template lang="pug">
.p-radio-button(
	:class="{ '--checked': isChecked }"
)
	label.p-radio-button__label
		p-input.p-radio-button__input(
			type="radio"
			:name="name"
			:checked="isChecked"
			:model-value="value"
			@change="changeValue"
		)
		slot
</template>

<script lang="ts" setup>
import { computed, inject, toRefs, unref } from 'vue'

import PInput from '../p-input/PInput.vue'
import { PRadioChangeKey, PRadioValueKey } from './injectionKeys.js'

interface Props {
	name: string
	value: string
}

const props = defineProps<Props>()

const { value } = toRefs(props)
const modelValue = inject(PRadioValueKey)
const modelChange = inject(PRadioChangeKey)

if (!modelValue || !modelChange) {
	throw new Error('Wrap `PRadioButton` components in `PRadioGroup`.')
}

const isChecked = computed(() => value.value === modelValue.value)

function changeValue (): void {
	modelChange?.(unref(value))
}
</script>

<style lang="sass">
@use '../../styles/mixins/visually-hidden'

.p-radio-button
	min-height: 50px

.p-radio-button.--checked
	.p-radio-button__label
		color: var(--p-color-white-09)

.p-radio-button__input
	@include visually-hidden.visually-hidden

.p-radio-button__label
	display: block
	line-height: 50px
	color: var(--p-color-white-05)
	cursor: pointer

	&:hover
		color: var(--p-color-white-06)
</style>
