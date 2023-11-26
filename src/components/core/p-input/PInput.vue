<template lang="pug">
input.p-input(
	ref="el"
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

const { modelValue } = toRefs(props)
const el = ref<HTMLInputElement>()

function updateValue (): void {
	emit('update:modelValue', unref(el)?.value)
}

function emitValue (): void {
	emit('change', unref(modelValue))
}

defineExpose({
	el,
	focus: (): void => el.value?.focus(),
	blur: (): void => el.value?.blur()
})
</script>

<style lang="sass">
.p-input
	box-sizing: border-box
	padding: 20px 15px
</style>
