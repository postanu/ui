<template lang="pug">
a.p-button-connect(:href="url" target="_blank")
	p-icon.p-button-connect__arrow(icon="arrowNorthEast")
	p-icon.p-button-connect__icon(:icon="icon")
	span.p-button-connect__label
		slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { icons } from '../../icons/index.js'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PButtonConnect',
	components: { PIcon },
	props: {
		icon: {
			type: String,
			required: true,
			validate: (iconName: string): boolean => {
				return [null, ...Object.keys(icons)].includes(iconName)
			}
		},
		url: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="stylus">
.p-button-connect
	position: relative
	box-sizing: border-box
	display: block
	width: 100px
	padding: 10px
	text-decoration: none
	cursor: pointer
	user-select: none
	background-color: var(--p-color-white-01)
	border-radius: 5px
	transition: background 0.05s ease-out

.p-button-connect:hover
	color: inherit
	background-color: var(--p-color-blue)

.p-button-connect__arrow
	position: absolute
	top: 12px
	right: 12px

.p-button-connect__icon
	display: block

.p-button-connect__label
	display: block
	margin-top: 25px
	margin-bottom: -5px
	text-align: left
</style>
