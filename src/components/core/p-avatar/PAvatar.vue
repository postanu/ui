<template lang="pug">
.p-avatar
	.p-avatar__l {{ letter }}
	img.p-avatar__i(
		v-if="image && !error"
		:src="image"
		@load="imageLoaded"
		@error="imageErrored"
	)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'

interface Props {
	image?: string
	text: string
}

const props = defineProps<Props>()

const error = ref(false)
const { image, text } = toRefs(props)

const letter = computed(() => text.value.charAt(0))

function imageLoaded (): void {
	error.value = false
}

function imageErrored (): void {
	error.value = true
}
</script>

<style lang="sass">
.p-avatar
	--p-avatar-size: 20px
	--p-avatar-border-size: 1px
	position: relative
	width: var(--p-avatar-size)
	height: var(--p-avatar-size)

.p-avatar:before
	position: absolute
	inset: calc(var(--p-avatar-border-size) * -1)
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
	inset: 0
	font-weight: 700
	line-height: var(--p-avatar-size)
	text-align: center
	text-transform: lowercase
	cursor: default
	user-select: none
	background: var(--p-color-black)
	border-radius: 50%
</style>
