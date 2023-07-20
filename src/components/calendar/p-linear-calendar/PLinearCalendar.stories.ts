import type { Meta, StoryObj } from '@storybook/vue3'

import { useStore } from '@nanostores/vue'
import { DAYS } from '@postanu/core'
import { calendarMessages } from '@postanu/i18n'
import { ref } from 'vue'

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
		setup: () => ({
			selectedDate: ref(args.selectedDate),
			DAYS,
			t: useStore(calendarMessages),
			isToday: (date: string): boolean => {
				return date === getCurrentISODate()
			}
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
		selectedDate: getCurrentISODate()
	}
}

function getCurrentISODate (): string {
	return new Date().toISOString().split('T')[0]
}
