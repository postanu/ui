<template lang="pug">
.p-image(
	:class="{ 'p-image--loading': isLoading }"
)
	img.p-image__img(
		:src="src"
		:srcset="srcset"
		:sizes="sizes"
		:alt="alt"
		:loading="loading"
		:crossOrigin="crossOrigin"
		@load="onLoad"
	)
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'

interface Props {
	src: string
	srcset?: string
	sizes?: string
	alt?: string
	loading?: HTMLImageElement['loading']
	crossOrigin?: string
}

defineProps<Props>()

const isLoading = ref(true)

function onLoad (): void {
	nextTick(() => {
		isLoading.value = false
	})
}
</script>

<style lang="sass">
.p-image
	--p-image-loaded: 1
	--p-image-size: 100px
	--p-image-border-size: 1px
	--p-image-border-color: var(--p-color-white-02)
	--p-image-border: var(--p-image-border-size) solid var(--p-image-border-color)

	position: relative
	width: var(--p-image-size)
	height: var(--p-image-size)
	background-color: var(--p-color-white-01)

.p-image--loading
	--p-image-loaded: 0

.p-image:after
	position: absolute
	inset: -1px
	pointer-events: none
	content: ""
	border: var(--p-image-border)
	border-radius: 3px

.p-image__img
	position: absolute
	inset: 0
	box-sizing: content-box
	width: 100%
	height: 100%
	opacity: var(--p-image-loaded)
	transition: opacity 0.1s ease-in
	object-fit: cover
</style>
