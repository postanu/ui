<template lang="pug">
.p-attachment(:class="{ 'p-attachment--loading': loading }")
	img.p-attachment__i(
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
.p-attachment
	--p-attachment-loaded: 1
	position: relative
	width: 20px
	height: 20px
	border: 1px solid var(--p-color-white-02)
	border-radius: 3px

.p-attachment--loading
	--p-attachment-loaded: 0

.p-attachment__i
	position: absolute
	inset: 0
	box-sizing: content-box
	width: 100%
	height: 100%
	border-radius: 3px
	opacity: var(--p-attachment-loaded)
	transition: opacity 0.1s ease-in
	object-fit: cover
</style>
