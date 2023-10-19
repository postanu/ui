import type { Meta, StoryObj } from '@storybook/vue3'

import PCalendarDay from './PCalendarDay.vue'

type Story = StoryObj<typeof PCalendarDay>

export default {
	title: 'Calendar / PCalendarDay',
	component: PCalendarDay,
	argTypes: {
		date: {
			control: 'text'
		},
		day: {
			control: 'text'
		},
		drafts: {
			control: 'number'
		},
		posts: {
			control: 'number'
		}
	}
} as Meta<typeof PCalendarDay>

export const Default: Story = {
	args: {
		date: '13',
		day: 'Fri',
		drafts: 2,
		posts: 3,
		isSelected: false,
		isWeekend: false,
		isToday: false,
		isPast: false
	}
}

export const Selected: Story = {
	args: {
		...Default.args,
		isSelected: true
	}
}

export const Weekend: Story = {
	args: {
		...Default.args,
		isWeekend: true
	}
}

export const Past: Story = {
	args: {
		...Default.args,
		isPast: true
	}
}

export const Today: Story = {
	args: {
		...Default.args,
		isToday: true
	}
}
