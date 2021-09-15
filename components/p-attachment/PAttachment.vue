<template lang="pug">
.p-attachment
	img.p-attachment__i(
		v-if="showImage"
		:src="image"
		@load="onLoad"
		@error="onError"
	)
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
	props: {
		image: {
			type: String,
			required: true
		}
	},
	setup (props) {
		let error = ref(false)
		let { image } = toRefs(props)

		let showImage = computed(() => {
			return !error.value && image.value.length > 0
		})

		function onLoad (): void {
			error.value = false
		}

		function onError (): void {
			error.value = true
		}

		return {
			showImage,
			onError,
			onLoad
		}
	}
})
</script>

<style lang="stylus">
.p-attachment
	width: 20px
	height: 20px
	position: relative

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
</style>
