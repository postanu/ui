<template lang="pug">
a.p-button-connect(:href="url")
	p-icon-arrow-north-east.p-button-connect__arrow
	component.p-button-connect__icon(:is="icon")
	span.p-button-connect__label
		slot
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { NETWORKS_ORDER } from '@postanu/core'

import PIconArrowNorthEast from '../icons/p-icon-arrow-north-east/PIconArrowNorthEast.vue'

const props = defineProps<{
	network: typeof NETWORKS_ORDER[number]
	url: string
}>()

const icon = computed(() => `p-icon-${props.network}`)
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
