<template lang="pug">
.p-radio-group
	slot
</template>

<script lang="ts" setup>
import { provide, readonly, toRefs } from 'vue'

import { PRadioChangeKey, PRadioValueKey } from './injectionKeys.js'

interface Props {
	modelValue: string
}

interface Emits {
	(event: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { modelValue } = toRefs(props)
provide(PRadioValueKey, readonly(modelValue))
provide(PRadioChangeKey, newValue => {
	emit('update:modelValue', newValue)
})
</script>

<style lang="sass">
.p-radio-group
	display: flex
	gap: 20px
	user-select: none
</style>
