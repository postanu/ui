<template lang="pug">
.p-radio-group
	slot
</template>

<script lang="ts">
import { defineComponent, provide, readonly, toRefs } from 'vue'

import { PRadioValueKey, PRadioChangeKey } from './injectionKeys'

export default defineComponent({
	name: 'PRadioGroup',
	props: {
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: ['update:modelValue'],
	setup (props, { emit }) {
		let { modelValue } = toRefs(props)
		provide(PRadioValueKey, readonly(modelValue))
		provide(PRadioChangeKey, newValue => {
			emit('update:modelValue', newValue)
		})
	}
})
</script>

<style lang="stylus">
.p-radio-group
	display: flex
	gap: 20px
	user-select: none
</style>
