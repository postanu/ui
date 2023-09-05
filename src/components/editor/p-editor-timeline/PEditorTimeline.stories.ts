import type { Meta, StoryObj } from '@storybook/vue3'

import { members, randomInRange } from '../../../../generator/index.js'
import PAvatar from '../../core/p-avatar/PAvatar.vue'
import PEditorTimeline from './PEditorTimeline.vue'

type Story = StoryObj<typeof PEditorTimeline>

export default {
	title: 'Editor / PEditorTimeline',
	component: PEditorTimeline,
	argTypes: {},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PEditorTimeline>

const ALERTS = {
	'100': 'You can post up to 10 videos per post',
	'101': 'Only the first 30 hashtags will be active'
}

const USERS = {
	'100': members[randomInRange(0, members.length - 1)],
	'101': members[randomInRange(0, members.length - 1)],
	'102': members[randomInRange(0, members.length - 1)],
	'103': members[randomInRange(0, members.length - 1)]
}

const ACTIONS = {
	'100': 'created draft',
	'101': 'edited text',
	'102': 'changed time',
	'103': 'created another variant',
	'104': 'changed pages',
	'105': 'requested to review',
	'106': 'rejected draft',
	'107': 'approved draft',
	'108': 'scheduled post'
}

const TIMES = {
	'month-ago': 'a month ago',
	'2-weeks-ago': '2 week ago',
	'week-ago': 'a week ago',
	'2-days-ago': '2 days ago',
	'day-ago': 'a day ago',
	'2-hours-ago': '2 hours ago',
	'hour-ago': 'an hour ago',
	'2-minutes-ago': '2 minutes ago',
	'minute-ago': 'a minute ago'
}

const Template: Story = {
	decorators: [
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		() => ({
			template: '<div style="padding: 0 20px;"><story/></div>'
		})
	],
	render: args => ({
		components: {
			PEditorTimeline,
			PAvatar
		},
		setup: () => ({
			args,
			ALERTS,
			USERS,
			ACTIONS,
			TIMES
		}),
		template: `
			<p-editor-timeline
				v-model:active-tab="args.activeTab"
				v-model:activities-expanded="args.activitiesExpanded"
				:activities-visible-count="args.activitiesVisibleCount"
				:alerts="args.alerts"
				:activities="args.activities"
			>
				<template #alerts-title>Alerts</template>
				<template #activity-title>Activity</template>

				<template #network-name="{ network }">
					{{ network.charAt(0).toUpperCase() + network.slice(1) }}
				</template>
				<template #alert-text="{ id, type }">
					{{ ALERTS[id] }}
				</template>

				<template #hidden-activities-text="{ hiddenCount, visibleCount }">
					Only the last {{ visibleCount }} activities are shown
				</template>
				<template #hidden-activities-button-text="{ hiddenCount, visibleCount }">
					Show {{ hiddenCount }} hidden items
				</template>

				<template #action-avatar="{ userId }">
					<p-avatar
						:image="USERS[userId].avatar"
						:text="USERS[userId].name"
					/>
				</template>
				<template #action-username="{ userId }">
					{{ USERS[userId].name }}
				</template>
				<template #action-text="{ id, type }">
					{{ ACTIONS[type] }}
				</template>
				<template #action-time="{ time }">
					{{ TIMES[time] }}
				</template>
			</p-editor-timeline>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		activeTab: 'alerts',
		activitiesExpanded: false,
		activitiesVisibleCount: 5,
		alerts: {
			instagram: [
				{
					id: '100',
					type: 'error'
				},
				{
					id: '101',
					type: 'warning'
				}
			],
			facebook: [
				{
					id: '100',
					type: 'error'
				},
				{
					id: '101',
					type: 'warning'
				}
			]
		},
		activities: [
			{
				id: '1',
				type: 'action',
				userId: '100',
				list: [
					{
						id: '1',
						type: '100',
						time: 'month-ago'
					},
					{
						id: '2',
						type: '101',
						time: 'month-ago'
					},
					{
						id: '3',
						type: '102',
						time: 'month-ago'
					}
				]
			},
			{
				id: '2',
				type: 'action',
				userId: '101',
				list: [
					{
						id: '1',
						type: '102',
						time: '2-weeks-ago'
					},
					{
						id: '2',
						type: '103',
						time: '2-weeks-ago'
					}
				]
			},
			{
				id: '3',
				type: 'action',
				userId: '102',
				list: [
					{
						id: '1',
						type: '104',
						time: '2-days-ago'
					}
				]
			},
			{
				id: '4',
				type: 'action',
				userId: '100',
				list: [
					{
						id: '1',
						type: '105',
						time: 'day-ago'
					}
				]
			},
			{
				id: '5',
				type: 'action',
				userId: '103',
				list: [
					{
						id: '1',
						type: '106',
						time: 'day-ago'
					}
				]
			},
			{
				id: '6',
				type: 'action',
				userId: '100',
				list: [
					{
						id: '1',
						type: '101',
						time: '2-hours-ago'
					}
				]
			},
			{
				id: '7',
				type: 'action',
				userId: '103',
				list: [
					{
						id: '1',
						type: '107',
						time: 'hour-ago'
					}
				]
			},
			{
				id: '8',
				type: 'action',
				userId: '101',
				list: [
					{
						id: '1',
						type: '102',
						time: '2-minutes-ago'
					},
					{
						id: '2',
						type: '108',
						time: 'minute-ago'
					}
				]
			}
		]
	}
}
