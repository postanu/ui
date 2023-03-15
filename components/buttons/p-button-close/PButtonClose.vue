<template lang="pug">
p-button-icon.p-button-close(@click="close")
	p-icon-close
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

import PIconClose from '../../icons/p-icon-close/PIconClose.vue'
import PButtonIcon from '../p-button-icon/PButtonIcon.vue'

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

<style lang="sass">
.p-button-close
	--p-button-content-padding: 5px
	--p-button-hover-background: var(--p-color-white-02)
	--p-button-active-background: var(--p-color-white-03)
</style>
