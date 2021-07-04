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
			@change="emitValue"
		)
		slot
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs, unref } from 'vue'
import { nanoid } from 'nanoid'

import PInput from '../p-input/PInput.vue'

export default defineComponent({
	name: 'PRadioButton',
	components: { PInput },
	props: {
		modelValue: {
			type: String,
			default: undefined
		},
		value: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	emits: ['update:modelValue'],
	setup (props, { emit }) {
		let { value, modelValue } = toRefs(props)

		let id = nanoid()
		let isChecked = computed(() => value.value === modelValue.value)
		let currentInstance = getCurrentInstance()

		function emitValue (): void {
			emit('update:modelValue', unref(value))
			currentInstance?.parent?.emit('change', unref(value))
		}

		return {
			id,
			isChecked,
			emitValue
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
	test()
	visually-hidden()

.p-radio-button__label
	color: var(--p-color-white-05)
	cursor: pointer
	display: block
	line-height: 50px

	&:hover
		color: var(--p-color-white-06)
</style>
