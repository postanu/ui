<template lang="pug">
.p-button-remove(
	@mouseenter="setHover(true)"
	@mouseleave="setHover(false)"
)
	p-button(
		v-if="!removing"
		type="text"
		danger
		@click="showQuestion"
	)
		slot(name="default") Remove
	template(v-else)
		.p-button-remove__question
			slot(name="question") Delete?
		p-button(
			type="text"
			muted
			@click="hideQuestion"
		)
			slot(name="disagree") Cancel
		p-button(
			type="text"
			danger
			@click="remove"
		)
			slot(name="agree") Confirm
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import PButton from '../p-button/PButton.vue'

interface Props {
	timeout?: number
}

const props = withDefaults(
	defineProps<Props>(),
	{
		timeout: 4000
	}
)

const emit = defineEmits<{
	(event: 'removing', state: boolean): void
	(event: 'remove'): void
}>()

const removing = ref(false)
const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const hover = ref(false)

watch([hover, removing, timeout], ([_hover, _removing, _timeout]) => {
	if (_removing) {
		if (_hover) {
			_timeout && stopTimeout()
		} else {
			!_timeout && startTimeout()
		}
	}
})

function setHover (value: boolean): void {
	hover.value = value
}

function startTimeout (): void {
	timeout.value = setTimeout(hideQuestion, props.timeout)
}

function stopTimeout (): void {
	if (timeout.value) {
		clearTimeout(timeout.value)
		timeout.value = null
	}
}

function showQuestion (): void {
	removing.value = true
	emit('removing', removing.value)
}

function hideQuestion (): void {
	emit('removing', false)
	setTimeout(() => {
		removing.value = false
	}, 100)
}

function remove (): void {
	emit('remove')
	hideQuestion()
}

function cancel (): void {
	hideQuestion()
}

defineExpose({ cancel })
</script>

<style lang="stylus">
.p-button-remove
	display: flex
	user-select: none

.p-button-remove__question
	padding-right: 30px
	line-height: 30px
</style>
