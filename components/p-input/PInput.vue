<template lang="pug">
input.p-input(
	ref="input"
	:type="type"
	:value="modelValue"
	@input="updateValue"
	@change="emitValue"
)
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref } from 'vue'

export default defineComponent({
	name: 'PInput',
	props: {
		type: {
			type: String,
			default: 'text'
		},
		modelValue: {
			type: String,
			default: ''
		}
	},
	emits: [
		'update:modelValue',
		'change'
	],
	setup (props, { emit }) {
		let { modelValue } = toRefs(props)
		let input = ref<HTMLInputElement>()

		function updateValue (): void {
			emit('update:modelValue', unref(input)?.value)
		}

		function emitValue (): void {
			emit('change', unref(modelValue))
		}

		return {
			updateValue,
			emitValue,
			focus: (): void => input.value?.focus(),
			blur: (): void => input.value?.blur(),
			input
		}
	}
})
</script>

<style lang="stylus">
.p-input
	padding: 20px 15px
	box-sizing: border-box
</style>
