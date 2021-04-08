<template lang="pug">
a.p-button-connect(
	:href="url"
	target="_blank"
)
	p-icon.p-button-connect__arrow(icon="arrowNorthEast")
	p-icon.p-button-connect__icon(:icon="icon")
	span.p-button-connect__label
		slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { icons } from '../../icons'
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
	width: 100px
	cursor: pointer
	padding: 10px
	display: block
	position: relative
	border-radius: 5px
	text-decoration: none
	background-color: var(--p-color-white-01)
	transition: background 0.05s ease-out

.p-button-connect:hover
	color: inherit
	background-color: var(--p-color-blue)

.p-button-connect__arrow
	top: 12px
	right: 12px
	position: absolute

.p-button-connect__icon
	display: block

.p-button-connect__label
	display: block
	text-align: left
	margin-top: 25px
	margin-bottom: -5px
</style>
