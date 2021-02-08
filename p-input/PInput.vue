<template lang="pug">
input.p-input(
	ref="input"
	v-bind="$attrs"
	@input="$emit('update:value', $event.target.value)"
)
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'PInput',
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	emits: ['update:value'],
	setup () {
		let input = ref(null)

		return {
			focus: () => input.value.focus(),
			blur: () => input.value.blur(),
			input
		}
	}
}
</script>

<style lang="stylus">
.p-input
	padding: 20px 15px
	box-sizing: border-box
</style>
