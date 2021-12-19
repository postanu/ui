<template lang="pug">
p-button.p-button-close(
	icon="close"
	@click="close"
)
</template>

<script lang="ts" setup>
import { defineEmits, onBeforeUnmount, onMounted } from 'vue'

import PButton from '../p-button/PButton.vue'

const emit = defineEmits<{
	(event: 'close'): void
}>()

function escapeListener (event: KeyboardEvent): void {
	if (event.code === 'Escape') {
		event.preventDefault()
		emit('close')
	}
}

onMounted(() => {
	window.addEventListener('keydown', escapeListener)
})

onBeforeUnmount(() => {
	window.removeEventListener('keydown', escapeListener)
})

function close (): void {
	emit('close')
}
</script>
