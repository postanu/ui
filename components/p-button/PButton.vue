<template lang="pug">
button(
	:class=`{
		'p-button': true,
		'p-button--icon': showIcon,
		'p-button--image': showImage,
		'p-button--link': isLink,
		'p-button--danger': isDanger
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

import { icons } from '../p-icon/icons.js'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PButton',
	components: { PIcon },
	props: {
		type: {
			type: String,
			default: 'default',
			validate: (type: string): boolean => {
				return ['default', 'link'].includes(type)
			}
		},
		icon: {
			type: String,
			default: null,
			validate: (iconName: string): boolean => {
				return [null, ...Object.keys(icons)].includes(iconName)
			}
		},
		image: {
			type: String,
			default: null
		},
		danger: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		let {
			type,
			icon,
			image,
			danger
		} = toRefs(props)
		return {
			showIcon: icon.value && !image.value,
			showImage: image.value && !icon.value,
			isLink: type.value === 'link',
			isDanger: danger.value
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

.p-button__text
	padding: 5px 15px

.p-button__text:empty
	display: none

.p-button__icon
	padding: 5px
	line-height: 0

.p-button__image
	width: 24px
	height: 24px
	padding: 3px

	img
		width: 100%
		height: 100%
		object-fit: cover
		border-radius: 50%

.p-button:not(:disabled):hover
	background: var(--p-color-blue)

.p-button:disabled
	color: var(--p-color-white-05)

	.p-button__image
		opacity: 0.6

.p-button--link
	color: var(--p-color-blue)
	background: none
	transition: background 0.05s ease-in
	border-radius: 6px

	.p-button__text
		padding: 5px 10px

.p-button--link:not(:disabled):hover
	background: var(--p-color-white-01)

.p-button--icon, .p-button--image
	.p-button__text
		padding-right: 5px

.p-button--danger
	color: var(--p-color-red-08)
</style>
