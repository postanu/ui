<template lang="pug">
component.p-button-page(
	:is="tag"
	:class="{ 'p-button-page--show-icon': icon }"
)
	slot
</template>

<script lang="ts" setup>
interface Props {
	tag?: 'button' | 'a'
	icon?: boolean
}

withDefaults(
	defineProps<Props>(),
	{
		tag: 'button',
		icon: false
	}
)
</script>

<style lang="sass">
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
