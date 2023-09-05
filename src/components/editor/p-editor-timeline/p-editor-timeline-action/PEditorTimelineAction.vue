<template lang="pug">
.p-editor-timeline-action
	p-editor-timeline-scroll-opacity
		.p-editor-timeline-action__avatar
			slot(
				:user-id="userId"
				name="avatar"
			)
	ul.p-editor-timeline-action__list
		li.p-editor-timeline-action__list-item(
			v-for="(action, index) in actions"
			:key="action.id"
		)
			p-editor-timeline-scroll-opacity
				.p-editor-timeline-action__text
					span.p-editor-timeline-action__text-name(v-if="index === 0")
						slot(
							:user-id="userId"
							name="username"
						)
					|&#32;
					slot(
						:id="action.id"
						:type="action.type"
						name="text"
					)
				.p-editor-timeline-action__time
					slot(
						:time="action.time"
						name="time"
					)
</template>

<script lang="ts" setup>
import type { ActivitiesAction } from '../types/index.js'

import PEditorTimelineScrollOpacity from '../p-editor-timeline-scroll-opacity/PEditorTimelineScrollOpacity.vue'

interface Props {
	userId: string
	actions: ActivitiesAction[]
}

interface Slots {
	avatar: (
		props: {
			userId: string
		}
	) => unknown
	username: (
		props: {
			userId: string
		}
	) => unknown
	text: (
		props: {
			id: string
			type: string
		}
	) => unknown
	time: (
		props: {
			time: string
		}
	) => unknown
}

defineProps<Props>()
defineSlots<Slots>()
</script>

<style lang="sass">
.p-editor-timeline-action
	display: flex
	gap: 10px

.p-editor-timeline-action__avatar
	border-top: 10px solid var(--p-color-black)

.p-editor-timeline-action__avatar .p-avatar
	box-sizing: content-box
	border-bottom: 10px solid var(--p-color-black)

.p-editor-timeline-action__list
	display: flex
	flex-direction: column
	gap: 10px

.p-editor-timeline-action__list
	padding-top: 10px

.p-editor-timeline-action__text-name
	font-weight: var(--p-body-font-weight-bold)

.p-editor-timeline-action__time
	font-size: var(--p-caption-font-size)
	font-weight: var(--p-caption-font-weight)
	line-height: var(--p-caption-line-height)
	color: var(--p-color-white-04)
</style>
