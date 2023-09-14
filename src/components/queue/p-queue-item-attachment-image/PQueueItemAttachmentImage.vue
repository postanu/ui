<template lang="pug">
.p-queue-item-attachment-image(
	:class="{ 'p-queue-item-attachment-image--loading': loading }"
)
	img.p-queue-item-attachment-image__i(
		:src="image"
		loading="eager"
		@load="onLoad"
	)
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'

interface Props {
	image: string
}

defineProps<Props>()

const loading = ref(true)

function onLoad (): void {
	nextTick(() => {
		loading.value = false
	})
}
</script>

<style lang="sass">
.p-queue-item-attachment-image
	--p-queue-item-attachment-image-loaded: 1
	--p-queue-item-attachment-image-size: 20px

	position: relative
	width: var(--p-queue-item-attachment-image-size)
	height: var(--p-queue-item-attachment-image-size)
	background-color: var(--p-color-white-01)

.p-queue-item-attachment-image--loading
	--p-queue-item-attachment-image-loaded: 0

.p-queue-item-attachment-image:after
	position: absolute
	inset: -1px
	pointer-events: none
	content: ""
	border: 1px solid var(--p-color-white-02)
	border-radius: 3px

.p-queue-item-attachment-image__i
	position: absolute
	inset: 0
	box-sizing: content-box
	width: 100%
	height: 100%
	opacity: var(--p-queue-item-attachment-image-loaded)
	transition: opacity 0.1s ease-in
	object-fit: cover
</style>
