<template lang="pug">
component(
	:is="tag"
	:class=`{
		'p-button': true,
		'p-button--icon': showIcon,
		'p-button--image': showImage,
		'p-button--type--text': isText,
		'p-button--type--common': isCommon,
		'p-button--danger': danger,
		'p-button--target': target,
		'p-button--muted': muted
	}`
)
	span.p-button__text
		slot
	p-icon.p-button__icon(
		v-if='showIcon'
		:icon='icon'
	)
	.p-button__image(v-if='showImage')
		img(:src='image')
</template>

<script lang="ts" setup>
import { defineProps, toRefs, withDefaults } from 'vue'

import PIcon from '../p-icon/PIcon.vue'

interface Props {
	tag: 'button' | 'a'
	type: 'default' | 'common' | 'text'
	icon?: string
	image?: string
	danger: boolean
	target: boolean
	muted: boolean
}

let props = withDefaults(
	defineProps<Props>(),
	{
		tag: 'button',
		type: 'default',
		icon: undefined,
		image: undefined,
		danger: false,
		target: false,
		muted: false
	}
)

let { type, icon, image } = toRefs(props)

let isText = type.value === 'text'
let isCommon = type.value === 'common'
let showIcon = icon.value && !image.value && !isCommon
let showImage = image.value && !icon.value && !isCommon
</script>

<style lang="stylus">
.p-button
	position: relative
	display: flex
	align-items: center
	user-select: none
	background: var(--p-color-white-01)
	background-clip: content-box
	border-radius: 15px
	transition: background 0.05s ease-in

a.p-button
	display: inline-flex
	text-decoration: none

a.p-button:hover
	color: var(--p-color-white-09)
	cursor: pointer

.p-button__text
	padding: 5px 15px

.p-button__text:empty
	display: none

.p-button__icon
	box-sizing: content-box
	padding: 5px
	line-height: 0

.p-button__image
	box-sizing: content-box
	width: 24px
	height: 24px
	padding: 3px

	img
		width: 100%
		height: 100%
		border-radius: 50%
		object-fit: cover

.p-button:not(:disabled):hover
	background-color: var(--p-color-blue)

.p-button:disabled
	color: var(--p-color-white-05)
	cursor: default

	.p-button__image
		opacity: 0.6

.p-button--type--common
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
	border-radius: 7.5px

	.p-button__text
		padding: 3px 15px

.p-button--type--text
	font-weight: 500
	background: none
	border-radius: 6px
	transition: background 0.05s ease-in

	.p-button__text
		padding: 5px 10px

.p-button--type--text:focus
	box-shadow: none

.p-button--type--text:not(:disabled):hover
	background: var(--p-color-white-01)

.p-button--type--text:not(:disabled):active
	background: var(--p-color-white-02)

.p-button--icon
	border-radius: 50%

.p-button--icon,
.p-button--image
	.p-button__text
		padding-right: 5px

.p-button--danger
	color: var(--p-color-red-08)

.p-button--target
	color: var(--p-color-blue)

.p-button--muted
	color: var(--p-color-white-06)
</style>
