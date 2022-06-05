<template lang="pug">
input.p-input(
	ref="input"
	:type="type"
	:value="modelValue"
	@input="updateValue"
	@change="emitValue"
	)
</template>

<script lang="ts" setup>
import { ref, toRefs, unref } from 'vue'

interface Props {
	type?: string
	modelValue: string
}

interface Emits {
	(event: 'update:modelValue', value: string | undefined): void
	(event: 'change', value: string): void
}

const props = withDefaults(
	defineProps<Props>(),
	{
		type: 'text'
	}
)

const emit = defineEmits<Emits>()

let { modelValue } = toRefs(props)
let input = ref<HTMLInputElement>()

function updateValue (): void {
	emit('update:modelValue', unref(input)?.value)
}

function emitValue (): void {
	emit('change', unref(modelValue))
}

defineExpose({
	focus: (): void => input.value?.focus(),
	blur: (): void => input.value?.blur()
})
</script>

<style lang="stylus">
.p-input
	box-sizing: border-box
	padding: 20px 15px
</style>
