<template lang="pug">
.p-attachment(:class="{ '--loading': loading }")
	img.p-attachment__i(
		:src="image"
		loading="eager"
		@load="onLoad"
	)
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'

export default defineComponent({
	props: {
		image: {
			type: String,
			required: true
		}
	},
	setup () {
		let loading = ref(true)

		function onLoad (): void {
			nextTick(() => {
				loading.value = false
			})
		}

		return { loading, onLoad }
	}
})
</script>

<style lang="stylus">
.p-attachment
	width: 20px
	height: 20px
	position: relative

	&.--loading
		border: 1px solid var(--p-color-white-02)
		border-radius: 3px

		.p-attachment__i
			opacity: 0

.p-attachment__i
	width: 100%
	height: 100%
	position: absolute
	top: -1px
	left: -1px
	object-fit: cover
	border-radius: 3px
	border: 1px solid var(--p-color-white-02)
	box-sizing: content-box
	opacity: 1
	transition: opacity 0.05s ease-in
</style>
