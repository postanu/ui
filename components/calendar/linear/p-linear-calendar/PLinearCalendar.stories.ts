import { calendarMessages } from '@postanu/i18n'
import { useStore } from '@nanostores/vue'
import { isToday } from 'date-fns'
import { DAYS } from '@postanu/core'
import type { Meta, StoryObj } from '@storybook/vue3'

import PLinearCalendarDay from '../p-linear-calendar-day/PLinearCalendarDay.vue'
import PLinearCalendar from './PLinearCalendar.vue'

type Story = StoryObj<typeof PLinearCalendar>

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PLinearCalendar>

export const Default: Story = {
	render: () => ({
		components: {
			PLinearCalendarDay,
			PLinearCalendar
		},
		setup: () => ({
			t: useStore(calendarMessages),
			DAYS,
			isToday
		}),
		template: `
			<p-linear-calendar>
				<template v-slot="{ day, selectedDate, selectDate }">
					<p-linear-calendar-day
						:is-past="day.isPast"
						:is-today="isToday(day.date)"
						:is-selected="day.date === selectedDate"
						:is-weekend="day.isWeekend"
						:drafts="0"
						:posts="0"
						@click="selectDate(day.date)"
					>
						<template #date> {{ day.day }} </template>
						<template #day> {{ t[DAYS[day.dayOfWeek]] }} </template>
					</p-linear-calendar-day>
				</template>
			</p-linear-calendar>
		`
	})
}
