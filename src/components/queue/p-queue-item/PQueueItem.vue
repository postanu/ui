<template lang="pug">
.p-queue-item
	button.p-queue-item__button(@click="click")
		.p-queue-item__meta
			.p-queue-item__time
				slot(name="time")
			.p-queue-item__pages
				slot(name="pages")
			.p-queue-item__state
				slot(name="state")
		.p-queue-item__main
			.p-queue-item__attachments(v-if="slots.attachments")
				slot(name="attachments")
			.p-queue-item__title
				slot(name="title")
	.p-queue-item__controls
		slot(name="controls")
</template>

<script lang="ts" setup>
interface Slots {
	time: () => unknown
	pages: () => unknown
	state: () => unknown
	title: () => unknown
	attachments?: () => unknown
	controls: () => unknown
}

interface Emits {
	(event: 'click'): unknown
}

const slots = defineSlots<Slots>()
const emit = defineEmits<Emits>()

function click (): void {
	emit('click')
}
</script>

<style lang="sass">
.p-queue-item
	--p-queue-item-show-controls: 0
	--p-queue-item-controls-background: var(--p-color-black)

	position: relative
	user-select: none

	&:hover
		--p-queue-item-show-controls: 1
		--p-queue-item-controls-background: var(--p-color-white-005)

		&:before
			opacity: 1

.p-queue-item:before,
.p-queue-item:after
	position: absolute
	z-index: -1
	content: ""

.p-queue-item:after
	inset: -1px 0 0
	border-top: 1px solid var(--p-color-white-01)
	border-bottom: 1px solid var(--p-color-white-01)

.p-queue-item:before
	inset: 0 0 1px
	background-color: var(--p-color-white-005)
	opacity: 0
	transition: opacity 0.05s ease-in

.p-queue-item__button
	display: grid
	grid-template-columns: 50% 50%
	align-items: center
	width: 100%
	padding: 15px 0

.p-queue-item__meta
	display: grid
	grid-template-columns: minmax(120px, 25%) minmax(360px, 1fr) 120px
	gap: 20px
	justify-content: space-between
	padding: 0 20px

.p-queue-item__main
	display: grid
	grid-template-columns: 420px minmax(220px, 1fr)
	gap: 20px
	padding-right: 20px

.p-queue-item__title
	overflow: hidden
	text-overflow: ellipsis
	white-space: nowrap

.p-queue-item__attachments
	order: 1

.p-queue-item__state
	display: flex
	align-items: center
	justify-content: flex-end

.p-queue-item__description
	color: var(--p-color-white-05)

.p-queue-item__controls
	position: absolute
	inset: 0 10px 1px auto
	display: none
	grid-area: 1 / 4
	align-items: center
	justify-content: flex-end
	padding-left: 50px
	background: linear-gradient(to right, rgb(0 0 0 / 0%), var(--p-queue-item-controls-background) 10%)
	opacity: var(--p-queue-item-show-controls)
	transition: opacity 0.05s ease-in

@media (any-hover: hover)
	.p-queue-item__controls
		display: flex

@media (width < 1366px)
	.p-queue-item__button
		grid-template-columns: minmax(320px, 45%) minmax(420px, 1fr)
		padding-bottom: 20px

	.p-queue-item__meta
		grid-template-columns: 1fr
		gap: 15px

	.p-queue-item__main
		grid-template-columns: 1fr
		gap: 15px
		align-self: flex-start

	.p-queue-item__state
		position: absolute
		inset: auto 20px 20px auto

	.p-queue-item__controls
		inset: 10px 10px auto auto

@media (width < 800px)
	.p-queue-item__button
		box-sizing: border-box
		grid-template-columns: 1fr
		gap: 20px
		padding-top: 20px

	.p-queue-item__meta
		grid-template-columns: 1fr 1fr
		gap: 20px
		max-width: 100%

	.p-queue-item__pages
		grid-row: 2

	.p-queue-item__main
		display: block
		max-width: 100%
		padding-left: 20px
		word-break: break-all
		white-space: break-spaces

	.p-queue-item__attachments
		float: left
		padding-right: 10px

	.p-queue-item__state
		inset: 20px 20px auto auto

	.p-queue-item__controls
		inset: 15px 10px auto auto
</style>
