<template lang="pug">
.p-avatar(
	:class="{ 'p-avatar--median': isMedian }"
	:title="letter"
)
	.p-avatar__l {{ l }}
	img.p-avatar__i(
		v-if="!error && image"
		:src="image"
		@load="onLoad"
		@error="onError"
	)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'

const medianLetters = new Set([
	'q', 'e', 'r', 'a', 's', 'z', 'x', 'c', 'n', 'm', 'w', 'y', 'u', 'o', 'p',
	'g', 'v',
	'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'а', 'п',
	'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ю', 'в'
])

interface Props {
	image?: string | null
	letter: string
}

const props = withDefaults(
	defineProps<Props>(),
	{ image: null }
)

const error = ref(false)
const { image, letter } = toRefs(props)

const l = computed(() => letter.value.charAt(0).toLowerCase())

const isMedian = computed(() => {
	let fistLetter = l.value.charAt(0)
	return medianLetters.has(fistLetter)
})

function onLoad (): void {
	error.value = false
}

function onError (): void {
	error.value = true
}
</script>

<style lang="sass">
.p-avatar
	position: relative
	width: 20px
	height: 20px

.p-avatar:before
	position: absolute
	inset: -1px
	content: ""
	background: var(--p-color-white-02)
	border-radius: 50%

.p-avatar--median
	.p-avatar__l
		line-height: 1.18

.p-avatar__i
	position: absolute
	width: 100%
	height: 100%
	border-radius: 50%
	object-fit: cover

.p-avatar__l
	position: absolute
	width: 20px
	height: 20px
	font-weight: 700
	line-height: var(--p-body-line-height)
	text-align: center
	text-transform: lowercase
	cursor: default
	user-select: none
	background: var(--p-color-black)
	border-radius: 50%
</style>
