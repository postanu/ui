<template lang="pug">
.p-editor-timeline(
	ref="el"
	:class=`{
		['p-editor-timeline--tab-' + activeTab]: activeTab !== null
	}`
)
	.p-editor-timeline__scroll
		.p-editor-timeline__controls
			.p-editor-timeline__switcher
				p-button-common.p-editor-timeline__switcher-button(
					@click="setActiveTab('alerts')"
				)
					slot(name="alerts-title")
				p-button-common.p-editor-timeline__switcher-button(
					@click="setActiveTab('activities')"
				)
					slot(name="activity-title")
		.p-editor-timeline__content(v-if="activeTab === 'alerts'")
			ul.p-editor-timeline__list
				li.p-editor-timeline__list-item(
					v-for="(item, network) in alerts"
					:key="network"
				)
					p-editor-timeline-alert(
						v-if="item"
						:network="network"
						:alerts="item"
					)
						template(#network-name)
							slot(
								name="network-name"
								:network="network"
							)
						template(#alert="alert")
							slot(
								name="alert-text"
								v-bind="alert"
							)
		.p-editor-timeline__content(v-else-if="activeTab === 'activities'")
			p-editor-timeline-scroll-opacity
				p-editor-timeline-hidden(
					v-if="!activitiesExpanded"
					v-model:expanded="activitiesExpanded"
				)
					template(#hidden-text)
						slot(
							name="hidden-activities-text"
							:hidden-count="activities.length - activitiesVisibleCount"
							:visible-count="activitiesVisibleCount"
						)
					template(#hidden-button-text)
						slot(
							name="hidden-activities-button-text"
							:hidden-count="activities.length - activitiesVisibleCount"
							:visible-count="activitiesVisibleCount"
						)
			ul.p-editor-timeline__list
				li.p-editor-timeline__list-item(
					v-for="item in visibleActivities"
					:key="item.id"
				)
					p-editor-timeline-action(
						v-if="item.type === 'action'"
						:user-id="item.userId"
						:actions="item.list"
					)
						template(#avatar="{ userId }")
							slot(
								name="action-avatar"
								:user-id="userId"
							)
						template(#username="{ userId }")
							slot(
								name="action-username"
								:user-id="userId"
							)
						template(#text="{ id, type }")
							slot(
								:id="id"
								name="action-text"
								:type="type"
							)
						template(#time="{ time }")
							slot(
								name="action-time"
								:time="time"
							)
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/shared'

import { useVModel } from '@vueuse/core'
import { computed, nextTick, ref, toRefs } from 'vue'

import type { ActiveTab, ActivitiesList, AlertsList } from './types/index.js'

import PButtonCommon from '../../core/buttons/p-button-common/PButtonCommon.vue'
import PEditorTimelineAction from './p-editor-timeline-action/PEditorTimelineAction.vue'
import PEditorTimelineAlert from './p-editor-timeline-alert/PEditorTimelineAlert.vue'
import PEditorTimelineHidden from './p-editor-timeline-hidden/PEditorTimelineHidden.vue'
import PEditorTimelineScrollOpacity from './p-editor-timeline-scroll-opacity/PEditorTimelineScrollOpacity.vue'

interface Props {
	activeTab: ActiveTab
	activitiesVisibleCount: number
	activitiesExpanded: boolean
	alerts: AlertsList
	activities: ActivitiesList
}

interface Emits {
	(event: 'update:activeTab', value: ActiveTab): void
	(event: 'update:activitiesExpanded', value: boolean): void
}

interface Slots {
	'alerts-title': () => unknown
	'activity-title': () => unknown
	'network-name': (
		props: {
			network: PageNetwork
		}
	) => unknown
	'alert-text': (
		props: {
			id: string
			type: 'error' | 'warning'
		}
	) => unknown
	'hidden-activities-text': (
		props: {
			hiddenCount: number
			visibleCount: number
		}
	) => unknown
	'hidden-activities-button-text': (
		props: {
			hiddenCount: number
			visibleCount: number
		}
	) => unknown
	'action-avatar': (
		props: {
			userId: string
		}
	) => unknown
	'action-username': (
		props: {
			userId: string
		}
	) => unknown
	'action-text': (
		props: {
			id: string
			type: string
		}
	) => unknown
	'action-time': (
		props: {
			time: string
		}
	) => unknown
}

defineSlots<Slots>()

const props = defineProps<Props>()
const { alerts, activities, activitiesVisibleCount } = toRefs(props)

const emit = defineEmits<Emits>()

const activeTab = useVModel(props, 'activeTab', emit)
const activitiesExpanded = useVModel(props, 'activitiesExpanded', emit)

const el = ref<HTMLElement | null>(null)
const lastScrollTop = ref({
	activities: 0,
	alerts: 0
})

const visibleActivities = computed(() => {
	return activitiesExpanded.value
		? activities.value
		: activities.value.slice(activitiesVisibleCount.value * -1)
})

async function setActiveTab (type: 'activities' | 'alerts'): Promise<void> {
	if (activeTab.value !== null) {
		lastScrollTop.value[activeTab.value] = el.value!.scrollTop
	}
	activeTab.value = type === activeTab.value ? null : type
	await nextTick()
	el.value!.scrollTop = lastScrollTop.value[type]
}
</script>

<style lang="sass">
.p-editor-timeline
	--p-editor-timeline-space: 180px

	max-height: 100vh
	padding-left: 1px
	margin-left: 30px
	overflow-x: hidden
	overflow-y: scroll

.p-editor-timeline--tab-alerts,
.p-editor-timeline--tab-activities
	margin-left: 0

.p-editor-timeline__scroll
	position: relative
	display: flex
	flex-direction: column
	gap: var(--p-editor-timeline-space)
	margin-bottom: 120px

.p-editor-timeline__scroll:before
	position: absolute
	top: 50px
	bottom: 0
	left: 9px
	z-index: -1
	width: 1px
	content: ''
	background: var(--p-color-white-01)

.p-editor-timeline__controls
	position: sticky
	top: 0
	z-index: 1
	display: flex
	align-items: center
	height: 30px
	padding-top: 20px
	background: black

.p-editor-timeline--tab-alerts .p-editor-timeline__controls:before,
.p-editor-timeline--tab-activities .p-editor-timeline__controls:before
	display: flex
	width: 21px
	height: 15px
	margin: 15px 0 0 9px
	content: ''
	mask-image: url('./angle.svg')
	background-color: var(--p-color-white-01)

.p-editor-timeline__switcher
	display: flex
	gap: 1px

.p-editor-timeline__switcher-button
	--p-button-hover-background: var(--p-color-white-02)
	--p-button-active-background: var(--p-color-white-03)

.p-editor-timeline__switcher-button:nth-child(1)
	--p-button-radius: 7.5px 0 0 7.5px

.p-editor-timeline__switcher-button:nth-child(2)
	--p-button-radius: 0 7.5px 7.5px 0

.p-editor-timeline--tab-alerts .p-editor-timeline__switcher-button:nth-child(1),
.p-editor-timeline--tab-activities .p-editor-timeline__switcher-button:nth-child(2)
	--p-button-background: var(--p-color-white-02)

.p-editor-timeline__list
	display: flex
	flex-direction: column

.p-editor-timeline--tab-alerts .p-editor-timeline__list
	gap: 30px

.p-editor-timeline--tab-activities .p-editor-timeline__list
	gap: 10px
</style>
