<template lang="pug">
p-input.p-input-project-name(
	ref="input"
	size="25"
	type="text"
	name="project-name"
	:placeholder="placeholder"
	:model-value="modelValue"
	@update:model-value="emitUpdate"
	@keyup.enter="emitEnter"
)
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

import PInput from '../p-input/PInput.vue'

interface Props {
	modelValue: string
	placeholder: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: string | undefined): void
	(event: 'enter', value: string): void
}>()

const { modelValue } = toRefs(props)
const input = ref<HTMLInputElement | null>(null)

function emitUpdate (value: string | undefined): void {
	emit('update:modelValue', value)
}

function emitEnter ($event: KeyboardEvent): void {
	emit('enter', ($event.target as HTMLInputElement).value)
}

function focus (): void {
	input.value?.focus()
}

function blur (): void {
	input.value?.blur()
}

defineExpose({ focus, blur })
</script>

<style lang="sass" scoped>
.p-input-project-name
	padding: 15px 0
	overflow: hidden
	font-size: var(--p-h3-font-size)
	font-weight: var(--p-h3-font-weight-bold)
	text-overflow: ellipsis
	white-space: nowrap
</style>
