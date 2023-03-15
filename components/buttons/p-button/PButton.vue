<template lang="pug">
component.p-button(:is="tag")
	.p-button__content
		slot
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()
const tag = computed(() => {
	return attrs.href ? 'a' : 'button'
})
</script>

<style lang="sass">
.p-button
	--p-button-padding: 0px
	--p-button-content-padding: 5px 15px
	--p-button-radius: 15px
	--p-button-background: var(--p-color-white-01)
	--p-button-hover-background: var(--p-color-blue-09)
	--p-button-active-background: var(--p-color-blue-06)
	--p-button-border: none
	--p-button-hover-border: none
	--p-button-active-border: none

	padding: var(--p-button-padding)

a.p-button
	display: inline-flex
	text-decoration: none
	user-select: none

a.p-button:hover
	color: var(--p-color-white-09)
	cursor: pointer

.p-button__content
	min-width: 100%
	padding: var(--p-button-content-padding)
	background: var(--p-button-background)
	border: var(--p-button-border)
	border-radius: var(--p-button-radius)
	transition: background 0.05s ease-in

.p-button:disabled
	color: var(--p-color-white-05)
	cursor: default

.p-button:not(:disabled):hover .p-button__content
	background-color: var(--p-button-hover-background)
	border: var(--p-button-hover-border)

.p-button:not(:disabled):active .p-button__content
	background: var(--p-button-active-background)
	border: var(--p-button-active-border)
</style>
