<template lang="pug">
.p-dot(:class="stateClass")
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
	state?: 'error' | 'loading' | 'success' | false
}

const props = defineProps<Props>()

const stateClass = computed(
	() => props.state ? `p-dot--${props.state}` : false
)
</script>

<style lang="sass">
.p-dot
	width: 6px
	height: 6px
	margin: 2px
	background-color: var(--p-color-white)
	border-radius: 50%
	opacity: 0
	transition: background-color 0.3s ease-out

.p-dot--error
	background-color: var(--p-color-red-09)
	opacity: 1

.p-dot--loading
	opacity: 1
	animation: p-dot-loading 0.6s infinite ease-out 0.3s

.p-dot--success
	background-color: var(--p-color-green)
	opacity: 1

@keyframes p-dot-loading
	0%
		opacity: 1

	50%
		opacity: 0.2

	100%
		opacity: 1
</style>
