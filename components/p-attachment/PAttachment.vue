<template lang="pug">
.p-attachment(:class="{ '--loading': loading }")
	img.p-attachment__i(
		:src="image"
		loading="eager"
		@load="onLoad"
	)
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'

defineProps<{ image: string }>()

const loading = ref(true)

function onLoad (): void {
	nextTick(() => {
		loading.value = false
	})
}
</script>

<style lang="stylus">
.p-attachment
	position: relative
	width: 20px
	height: 20px

	&.--loading
		border: 1px solid var(--p-color-white-02)
		border-radius: 3px

		.p-attachment__i
			opacity: 0

.p-attachment__i
	position: absolute
	top: -1px
	left: -1px
	box-sizing: content-box
	width: 100%
	height: 100%
	border: 1px solid var(--p-color-white-02)
	border-radius: 3px
	opacity: 1
	transition: opacity 0.05s ease-in
	object-fit: cover
</style>
