<template lang="pug">
.p-button-remove(
	@mouseenter="handleHover(true)"
	@mouseleave="handleHover(false)"
)
	p-button-text(
		v-if="!removing"
		variant="danger"
		@click="handleQuestion(true)"
	)
		slot(name="default") Remove
	template(v-else)
		.p-button-remove__question
			slot(name="question") Delete?
		p-button-text(
			variant="muted"
			@click="handleQuestion(false)"
		)
			slot(name="disagree") Cancel
		p-button-text(
			variant="danger"
			@click="emitRemove"
		)
			slot(name="agree") Confirm
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { getCurrentScope, onScopeDispose } from 'vue'

import PButtonText from '../p-button-text/PButtonText.vue'

interface Slots {
	default: () => unknown
	question: () => unknown
	disagree: () => unknown
	agree: () => unknown
}

interface Props {
	removing: boolean
}

interface Emits {
	(event: 'update:removing', value: boolean): void
	(event: 'remove'): void
}

const TIMEOUT = 4000

defineSlots<Slots>()
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const removing = useVModel(props, 'removing', emit)
let timeoutId: ReturnType<typeof setTimeout> | null = null

function handleHover (value: boolean): void {
	if (!removing.value) return
	value ? handleTimeout(false) : handleTimeout(true)
}

function handleTimeout (start = false): void {
	if (start) {
		timeoutId = setTimeout(handleQuestion, TIMEOUT)
	} else if (timeoutId) {
		clearTimeout(timeoutId)
		timeoutId = null
	}
}

function handleQuestion (show = false): void {
	if (show) {
		removing.value = true
		handleTimeout(true)
	} else {
		handleTimeout(false)
		removing.value = false
	}
}

function emitRemove (): void {
	emit('remove')
}

getCurrentScope() && onScopeDispose(() => {
	handleTimeout(false)
})
</script>

<style lang="sass">
.p-button-remove
	display: flex
	user-select: none

.p-button-remove__question
	padding-right: 30px
	line-height: 30px
</style>
