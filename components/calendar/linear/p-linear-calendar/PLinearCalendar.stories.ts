import { calendarMessages } from '@postanu/i18n'
import { useStore } from '@nanostores/vue'
import { isToday } from 'date-fns'
import { DAYS } from '@postanu/core'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import PLinearCalendarDay from '../p-linear-calendar-day/PLinearCalendarDay.vue'
import PLinearCalendar from './PLinearCalendar.vue'

type Story = StoryObj<typeof PLinearCalendar>

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	argTypes: {
		selectedDate: {
			control: 'date'
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
		setup: () => ({
			selectedDate: ref(args.selectedDate),
			DAYS,
			t: useStore(calendarMessages),
			isToday
		}),
		template: `
			<p-linear-calendar v-model:selected-date="selectedDate">
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
	}),
	args: {
		selectedDate: Date.now()
	}
}
