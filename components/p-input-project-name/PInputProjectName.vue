<template lang="pug">
.p-input-project-name
	p-input(
		ref="input"
		size="25"
		type="text"
		id="project-name"
		name="project-name"
		autocorrect="off"
		autocomplete="off"
		autocapitalize="off"
		:placeholder="placeholder"
		:model-value="modelValue"
		@update:model-value="emitUpdate"
		@keyup.enter="emitChange"
	)
	label.p-input-project-name__label(
		for="project-name"
		v-show="showPlaceholder"
	) {{ placeholder }}
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'

import PInput from '../p-input/PInput.vue'

interface Props {
	modelValue: string
	placeholder: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: string | undefined): void
	(event: 'change', value: string): void
}>()

const { modelValue } = toRefs(props)
const input = ref<HTMLInputElement | null>(null)

const showPlaceholder = computed(
	() => modelValue.value.length > 0 && props.placeholder.length > 0
)

function emitUpdate (value: string | undefined): void {
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

<style lang="sass" scoped>
.p-input-project-name
	min-height: 70px

.p-input-project-name > .p-input
	padding: 2px 0 8px
	font-size: var(--p-h2-regular-font-size)
	font-weight: 700

.p-input-project-name__label
	padding-bottom: 3px
	margin-top: -3px
</style>
