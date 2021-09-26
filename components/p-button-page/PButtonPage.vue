<template lang="pug">
component.p-button-page(
	:is="tag"
	:class="{ 'p-button-page--show-icon': icon }"
)
	slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PButtonPage',
	props: {
		tag: {
			type: String,
			default: 'button',
			validate: (tag: string): boolean => {
				return ['button', 'a'].includes(tag)
			}
		},
		icon: {
			type: Boolean,
			default: false
		}
	}
})
</script>

<style lang="stylus">
.p-button-page
	padding: 10px
	cursor: pointer
	user-select: none
	border-radius: 7.5px
	transition: background 0.05s ease-in

	&:hover
		background: var(--p-color-white-01)

		.p-page .p-icon
			opacity: 1

	&:focus
		background: var(--p-color-white-01)
		box-shadow: none

		.p-page .p-icon
			opacity: 1

	.p-page
		cursor: pointer

		.p-icon
			opacity: 0
			transition: opacity 0.05s ease-in

a.p-button-page
	display: inline-flex

	&:hover
		color: var(--p-color-white-09)

.p-button-page--show-icon
	.p-page .p-icon
		opacity: 1
</style>
