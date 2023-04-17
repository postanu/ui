import type { Meta, StoryObj } from '@storybook/vue3'

import PLinearCalendarDay from './PLinearCalendarDay.vue'

type Story = StoryObj<typeof PLinearCalendarDay>

export default {
	title: 'Calendar / PLinearCalendarDay',
	component: PLinearCalendarDay,
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
} as Meta<typeof PLinearCalendarDay>

export const Default: Story = {
	args: {
		date: '13',
		day: 'Fri',
		drafts: 2,
		posts: 3
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
