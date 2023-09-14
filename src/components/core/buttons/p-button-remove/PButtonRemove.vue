<template lang="pug">
.p-button-remove(
	@mouseenter="setHover(true)"
	@mouseleave="setHover(false)"
)
	p-button-text(
		v-if="!removing"
		variant="danger"
		@click="showQuestion"
	)
		slot(name="default") Remove
	template(v-else)
		.p-button-remove__question
			slot(name="question") Delete?
		p-button-text(
			variant="muted"
			@click="hideQuestion"
		)
			slot(name="disagree") Cancel
		p-button-text(
			variant="danger"
			@click="remove"
		)
			slot(name="agree") Confirm
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import PButtonText from '../p-button-text/PButtonText.vue'

interface Props {
	timeout?: number
}

interface Emits {
	(event: 'removing', state: boolean): void
	(event: 'remove'): void
}

interface Slots {
	default: () => unknown
	question: () => unknown
	disagree: () => unknown
	agree: () => unknown
}

defineSlots<Slots>()

const props = withDefaults(
	defineProps<Props>(),
	{
		timeout: 4000
	}
)

const emit = defineEmits<Emits>()

const removing = ref(false)
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)
const hover = ref(false)

watch([hover, removing, timeoutId], ([_hover, _removing, _timeout]) => {
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
	timeoutId.value = setTimeout(hideQuestion, props.timeout)
}

function stopTimeout (): void {
	if (timeoutId.value) {
		clearTimeout(timeoutId.value)
		timeoutId.value = null
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

<style lang="sass">
.p-button-remove
	display: flex
	user-select: none

.p-button-remove__question
	padding-right: 30px
	line-height: 30px
</style>
