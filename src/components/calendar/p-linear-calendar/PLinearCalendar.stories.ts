/* eslint-disable unicorn/consistent-function-scoping */
import type { Meta, StoryObj } from '@storybook/vue3'

import { useStore } from '@nanostores/vue'
import { DAYS, MONTHS } from '@postanu/core'
import { calendarMessages } from '@postanu/i18n'
import { ref } from 'vue'

import { getRandomNumber } from '../../../../generator/index.js'
import { usePostsScale } from '../../../composables/index.js'
import PLinearCalendarDay from '../p-linear-calendar-day/PLinearCalendarDay.vue'
import PLinearCalendar from './PLinearCalendar.vue'

type Story = StoryObj<typeof PLinearCalendar>

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	argTypes: {
		selectedDate: {
			control: 'text'
		}
	},
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PLinearCalendar>

export const Default: Story = {
	render: args => ({
		components: {
			PLinearCalendarDay,
			PLinearCalendar
		},
		setup: (): unknown => {
			let t = useStore(calendarMessages)
			let selectedDate = ref(args.selectedDate)

			function isToday (date: string): boolean {
				return date === getCurrentISODate()
			}

			function isSelectedDate (date: string): boolean {
				return date === selectedDate.value
			}

			function selectDate (date: string): void {
				selectedDate.value = date
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
					let drafts = ref(getRandomNumber(6))
					let posts = ref(getRandomNumber(6))
					let scale = usePostsScale(drafts, posts)
					counters.set(date, scale.value)
					return scale.value
				}
			}

			return {
				selectedDate,
				DAYS,
				MONTHS,
				t,
				isToday,
				isSelectedDate,
				selectDate,
				getCounters
			}
		},
		template: `
			<p-linear-calendar v-model:selected-date="selectedDate">
				<template v-slot:month="{ monthKey }">
					{{ t[MONTHS[monthKey]] }}
				</template>
				<template v-slot:nextMonth="{ monthKey }">
					{{ t[MONTHS[monthKey]] }}
				</template>
				<template v-slot:day="{ day }">
					<p-linear-calendar-day
						:is-past="day.isPast"
						:is-today="isToday(day.date)"
						:is-selected="isSelectedDate(day.date)"
						:is-weekend="day.isWeekend"
						:drafts="getCounters(day.date).drafts"
						:posts="getCounters(day.date).posts"
						@click="selectDate(day.date)"
					>
						<template #date> {{ day.day }} </template>
						<template #day> {{ t[DAYS[day.dayOfWeek]] }} </template>
					</p-linear-calendar-day>
				</template>
			</p-linear-calendar>
		`
	}),
	args: {
		selectedDate: getCurrentISODate()
	}
}

function getCurrentISODate (): string {
	return new Date().toISOString().split('T')[0]
}
