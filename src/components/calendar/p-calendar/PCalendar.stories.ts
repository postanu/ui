/* eslint-disable unicorn/consistent-function-scoping */
import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import { getRandomNumber } from '../../../../generator/index.js'
import PCalendarDay from '../p-calendar-day/PCalendarDay.vue'
import PCalendar from './PCalendar.vue'

type Story = StoryObj<typeof PCalendar>

export default {
	title: 'Calendar / PCalendar',
	component: PCalendar,
	argTypes: {
		selectedDate: {
			control: 'text'
		}
	},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PCalendar>

export const Default: Story = {
	decorators: [
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		() => ({
			template: '<div style="padding-top: 30px;"><story/></div>'
		})
	],
	render: args => ({
		components: {
			PCalendarDay,
			PCalendar
		},
		setup: (): unknown => {
			let initialDate = ref(args.initialDate)

			function isPast (date: Date): boolean {
				return date.getTime() < Date.now()
			}

			function isToday (date: string): boolean {
				return date === getCurrentISODate()
			}

			function isSelectedDate (date: string): boolean {
				return date === initialDate.value
			}

			function selectDate (date: string): void {
				initialDate.value = date
			}

			let counters = new Map<number, {
				drafts: number
				posts: number
			}>()

			function getCounters (date: number): {
				drafts: number
				posts: number
			} {
				if (counters.has(date)) {
					return counters.get(date)!
				} else {
					let scale = {
						drafts: getRandomNumber(4),
						posts: getRandomNumber(4)
					}
					counters.set(date, scale)
					return scale
				}
			}

			return {
				initialDate,
				isPast,
				isToday,
				isSelectedDate,
				selectDate,
				getCounters
			}
		},
		template: `
			<p-calendar :initial-date="initialDate">
				<template v-slot:year="{ year }">
					{{ year }}
				</template>
				<template v-slot:month="{ month }">
					{{ new Date(0, month - 1).toLocaleString('en-en', { month: 'long' }) }}
				</template>
				<template v-slot:day="{ day }">
					<p-calendar-day
						:is-past="isPast(day.date)"
						:is-today="isToday(day.date)"
						:is-selected="isSelectedDate(day.date)"
						:is-weekend="day.isWeekend"
						:drafts="getCounters(day.date).drafts"
						:posts="getCounters(day.date).posts"
						@click="selectDate(day.date)"
					>
						<template #date> {{ day.day }} </template>
						<template #day>
							{{ new Date(0, 0, day.dayOfWeek).toLocaleString('en-en', { weekday: 'short' }) }}
						</template>
					</p-calendar-day>
				</template>
			</p-calendar>
		`
	}),
	args: {
		initialDate: getCurrentISODate()
	}
}

function getCurrentISODate (): string {
	return new Date().toISOString().split('T')[0]
}
