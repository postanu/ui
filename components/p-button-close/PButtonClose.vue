<template lang="pug">
p-button.p-button-close(@click="close")
	template(#icon)
		p-icon-close
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

import PIconClose from '../icons/p-icon-close/PIconClose.vue'
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
