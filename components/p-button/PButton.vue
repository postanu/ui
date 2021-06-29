<template lang="pug">
component(
	:is="tag"
	:class=`{
		'p-button': true,
		'p-button--icon': showIcon,
		'p-button--image': showImage,
		'p-button--type--text': isText,
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

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

import { icons } from '../../index.js'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PButton',
	components: { PIcon },
	props: {
		tag: {
			type: String,
			default: 'button',
			validate: (tag: string): boolean => {
				return ['button', 'a'].includes(tag)
			}
		},
		type: {
			type: String,
			default: 'default',
			validate: (type: string): boolean => {
				return ['default', 'text'].includes(type)
			}
		},
		icon: {
			type: String,
			default: null,
			validate: (iconName: string): boolean => {
				return [null, ...Object.keys(icons)].includes(iconName)
			}
		},
		image: { type: String, default: null },
		danger: { type: Boolean, default: false },
		target: { type: Boolean, default: false },
		muted: { type: Boolean, default: false }
	},
	setup (props) {
		let {
			type,
			icon,
			image
		} = toRefs(props)
		return {
			isText: type.value === 'text',
			showIcon: icon.value && !image.value,
			showImage: image.value && !icon.value
		}
	}
})
</script>

<style lang="stylus">
.p-button
	display: flex
	align-items: center
	border-radius: 15px
	background: var(--p-color-white-01)
	transition: background 0.05s ease-in

a.p-button
	display: inline-flex
	text-decoration: none

a.p-button:hover
	cursor: pointer
	color: var(--p-color-white-09)

.p-button__text
	padding: 5px 15px

.p-button__text:empty
	display: none

.p-button__icon
	padding: 5px
	box-sizing: content-box
	line-height: 0

.p-button__image
	width: 24px
	height: 24px
	padding: 3px
	box-sizing: content-box

	img
		width: 100%
		height: 100%
		object-fit: cover
		border-radius: 50%

.p-button:not(:disabled):hover
	background: var(--p-color-blue)

.p-button:disabled
	color: var(--p-color-white-05)
	cursor: default

	.p-button__image
		opacity: 0.6

.p-button--type--text
	font-weight: 500
	background: none
	transition: background 0.05s ease-in
	border-radius: 6px

	.p-button__text
		padding: 5px 10px

.p-button--type--text:focus
	box-shadow: none

.p-button--type--text:not(:disabled):hover
	background: var(--p-color-white-01)

.p-button--type--text:not(:disabled):active
	background: var(--p-color-white-02)

.p-button--icon, .p-button--image
	.p-button__text
		padding-right: 5px

.p-button--danger
	color: var(--p-color-red-08)

.p-button--target
	color: var(--p-color-blue)

.p-button--muted
	color: var(--p-color-white-06)
</style>
