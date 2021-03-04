<template lang="pug">
.p-avatar(:class="{ 'p-avatar--median': isMedian }")
	.p-avatar__l {{ l }}
	img.p-avatar__i(
		v-if="showImage"
		:src="image"
		@load="onLoad"
		@error="onError"
	)
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'

const medianLetters = [
	'q', 'e', 'r', 'a', 's', 'z', 'x', 'c', 'n', 'm', 'w', 'y', 'u', 'o', 'p', 'g', 'v',
	'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ю'
]

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

		let l = computed(() => letter.value.charAt(0).toLowerCase())

		let showImage = computed(() => {
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
			showImage,
			isMedian,
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
		line-height: 1.18

.p-avatar__i
	width: 100%
	height: 100%
	position: absolute
	object-fit: cover
	border-radius: 50%

.p-avatar__l
	width: 20px
	height: 20px
	position: absolute
	text-align: center
	background: var(--p-color-black)
	font-weight: 700
	border-radius: 50%
	text-transform: lowercase
</style>
