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

<script lang="ts">
import {
	defineComponent,
	computed,
	inject,
	toRefs,
	unref
} from 'vue'

import { PRadioChangeKey, PRadioValueKey } from './injectionKeys'
import PInput from '../p-input/PInput.vue'

export default defineComponent({
	name: 'PRadioButton',
	components: { PInput },
	props: {
		value: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	setup (props) {
		let { value } = toRefs(props)
		let modelValue = inject(PRadioValueKey)
		let modelChange = inject(PRadioChangeKey)

		if (!modelValue || !modelChange) {
			throw new Error('Wrap `PRadioButton` componenets in `PRadioGroup`.')
		}

		let isChecked = computed(() => value.value === modelValue?.value)

		function changeValue (): void {
			modelChange?.(unref(value))
		}

		return {
			isChecked,
			changeValue
		}
	}
})
</script>

<style lang="stylus">
@import '../../styles/mixins/visually-hidden'

.p-radio-button
	min-height: 50px

.p-radio-button.--checked
	.p-radio-button__label
		color: var(--p-color-white-09)

.p-radio-button__input
	visually-hidden()

.p-radio-button__label
	color: var(--p-color-white-05)
	cursor: pointer
	display: block
	line-height: 50px

	&:hover
		color: var(--p-color-white-06)
</style>
