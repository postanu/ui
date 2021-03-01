<template lang="pug">
input.p-input(
	ref="input"
	:value="value"
	@input="$emit('update:value', $event.target.value)"
)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'PInput',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	emits: ['update:value'],
	setup () {
		let input = ref<HTMLInputElement | null>(null)

		return {
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
