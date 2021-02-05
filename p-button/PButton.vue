<template lang="pug">
button(
	:class="{\
		'p-button': true,\
		'p-button--icon': showIcon,\
		'p-button--image': showImage\
	}"
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

<script>
import { toRefs } from 'vue'

import { PIcon, icons } from '..'

export default {
	name: 'PButton',
	components: { PIcon },
	props: {
		icon: {
			type: String,
			default: undefined,
			validate: iconName => {
				return [undefined, ...Object.keys(icons)].includes(iconName)
			}
		},
		image: {
			type: String,
			default: undefined
		}
	},
	setup (props) {
		let { icon, image } = toRefs(props)
		return {
			showIcon: icon.value && !image.value,
			showImage: image.value && !icon.value
		}
	}
}
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

.p-button--icon, .p-button--image
	.p-button__text
		padding-right: 5px
</style>
