<template lang="pug">
.p-dot(:class="`p-dot--${state}`")
</template>

<script lang="ts" setup>
interface Props {
	state: 'error' | 'loading'
}

defineProps<Props>()
</script>

<style lang="sass">
.p-dot
	width: 6px
	height: 6px
	margin: 2px
	background-color: var(--p-color-white)
	border-radius: 50%
	transition: background-color 0.3s ease-out

.p-dot--loading
	animation: p-dot-loading 0.6s infinite ease-out 0.3s

.p-dot--error
	background-color: var(--p-color-red-09)

@keyframes p-dot-loading
	0%
		opacity: 1

	50%
		opacity: 0.2

	100%
		opacity: 1
</style>
