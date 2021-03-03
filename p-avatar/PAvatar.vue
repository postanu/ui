<template lang="pug">
.p-avatar(:class="{ 'p-avatar--median': isMedian }")
	img(
		v-if="isImage"
		:src="image"
		@load="onLoad"
		@error="onError"
	)
	.p-avatar__l(v-else) {{ l }}
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'

const medianLetters = ['q', 'e', 'r', 'a', 's', 'z', 'x', 'c', 'n', 'm']

export default defineComponent({
	name: 'PAvatar',
	props: {
		image: {
			type: String,
			default: ''
		},
		letter: {
			type: String,
			required: true
		}
	},
	setup (props) {
		let error = ref(false)
		let { image, letter } = toRefs(props)

		let l = computed(() => letter.value.charAt(0))

		let isImage = computed(() => {
			return !error.value && image.value.length > 0
		})

		let isMedian = computed(() => {
			let fistLetter = l.value.charAt(0)
			return medianLetters.includes(fistLetter)
		})

		function onLoad (): void {
			error.value = false
		}

		function onError (): void {
			error.value = true
		}

		return {
			isMedian,
			isImage,
			onError,
			onLoad,
			l
		}
	}
})
</script>

<style lang="stylus">
.p-avatar
	width: 20px
	height: 20px
	position: relative

	img
		width: 100%
		height: 100%
		object-fit: cover
		border-radius: 50%

.p-avatar:before
	top: -1px
	left: -1px
	right: -1px
	bottom: -1px
	content: ""
	z-index: -1
	position: absolute
	background: var(--p-color-white-02)
	border-radius: 50%

.p-avatar--median
	.p-avatar__l
		height: 20px
		line-height: 1.18

.p-avatar__l
	text-align: center
	background: var(--p-color-black)
	font-weight: 700
	border-radius: 50%
	text-transform: lowercase
</style>
