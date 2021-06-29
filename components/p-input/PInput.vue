<template lang="pug">
input.p-input(
	ref="input"
	:type="type"
	:value="value"
	@input="updateValue"
)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'PInput',
	props: {
		type: {
			type: String,
			default: 'text'
		},
		value: {
			type: String,
			default: ''
		}
	},
	emits: ['update:value'],
	setup (props, { emit }) {
		let input = ref<HTMLInputElement | null>(null)
		function updateValue (e: Event): void {
			emit('update:value', (e.target as HTMLInputElement).value)
		}

		return {
			updateValue,
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
