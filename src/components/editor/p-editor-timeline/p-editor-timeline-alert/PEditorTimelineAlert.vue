<template lang="pug">
.p-editor-timeline-alert
	p-editor-timeline-scroll-opacity
		.p-editor-timeline-alert__network
			//- component.p-editor-timeline-alert__network-icon(:is="'p-icon-' + network")
			p-icon-network.p-editor-timeline-alert__network-icon(:network="network")
			.p-editor-timeline-alert__network-name
				slot(name="network-name")
	ul.p-editor-timeline-alert__list
		li.p-editor-timeline-alert__list-item(
			v-for="alert in alerts"
			:key="alert.id"
			:class=`{
				'p-editor-timeline-alert__list-item--error': alert.type === 'error',
				'p-editor-timeline-alert__list-item--warning': alert.type === 'warning'
			}`
		)
			p-editor-timeline-scroll-opacity
				.p-editor-timeline-alert__list-item-content(
					:class=`{
						'p-editor-timeline-alert__list-item-content--error': alert.type === 'error',
						'p-editor-timeline-alert__list-item-content--warning': alert.type === 'warning'
					}`
				)
					slot(
						name="alert"
						v-bind="alert"
					)
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/shared'

import type { AlertsListItem } from '../types/index.js'

import { PIconNetwork } from '../../../core/index.js'
import PEditorTimelineScrollOpacity from '../p-editor-timeline-scroll-opacity/PEditorTimelineScrollOpacity.vue'

interface Props {
	network: PageNetwork
	alerts: AlertsListItem[]
}

interface Slots {
	'network-name' (): unknown
	alert: (
		props: Props['alerts'][number]
	) => unknown
}

defineProps<Props>()
defineSlots<Slots>()
</script>

<style lang="sass">
.p-editor-timeline-alert
	display: flex
	flex-direction: column
	gap: 10px

.p-editor-timeline-alert__network
	display: flex
	gap: 10px
	align-items: center

.p-editor-timeline-alert__network-icon
	box-sizing: content-box
	padding: 10px 0
	background: var(--p-color-black)

.p-editor-timeline-alert__network-name
	font-weight: var(--p-body-font-weight-bold)

.p-editor-timeline-alert__list
	display: flex
	flex-direction: column
	gap: 10px

.p-editor-timeline-alert__list-item-content
	display: flex
	gap: 10px
	align-items: center

.p-editor-timeline-alert__list-item-content:before
	box-sizing: content-box
	width: 6px
	height: 6px
	margin: 0 7px
	content: ''
	border-top: 10px solid var(--p-color-black)
	border-bottom: 10px solid var(--p-color-black)
	border-radius: 50%

.p-editor-timeline-alert__list-item-content--error:before
	background: var(--p-color-red-08)

.p-editor-timeline-alert__list-item-content--warning:before
	background: var(--p-color-white-08)
</style>
