<template lang="pug">
p-input.p-input-project-name(
	ref="input"
	size="25"
	type="text"
	name="project-name"
	autocorrect="off"
	autocomplete="off"
	autocapitalize="off"
	placeholder="Type the name of the new project"
	:model-value="modelValue"
	@update:modelValue="emitUpdate"
	@keyup.enter="emitChange"
)
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

import PInput from '../p-input/PInput.vue'

const props = defineProps<{
	modelValue: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void
	(event: 'change', value: string): void
}>()

const { modelValue } = toRefs(props)
const input = ref<HTMLInputElement | null>(null)

function emitUpdate (value: string): void {
	emit('update:modelValue', value)
}

function emitChange ($event: KeyboardEvent): void {
	emit('change', ($event.target as HTMLInputElement).value)
}

function focus (): void {
	input.value?.focus()
}

defineExpose({ focus })
</script>

<style lang="stylus" scoped>
.p-input-project-name
	font-size: var(--p-h2-regular-font-size)
	font-weight: 700
	mix-blend-mode: difference
</style>
