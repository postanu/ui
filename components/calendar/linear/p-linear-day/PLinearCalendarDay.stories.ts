import type { Story } from '@storybook/vue3'

import PLinearCalendarDay from './PLinearCalendarDay.vue'

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
}

const Template: Story = args => ({
	components: { PLinearCalendarDay },
	setup: () => ({ args }),
	template: `
		<p-linear-calendar-day
			:is-past="args.isPast"
			:is-today="args.isToday"
			:is-selected="args.isSelected"
			:is-weekend="args.isWeekend"
			:drafts="args.drafts"
			:posts="args.posts"
		>
			<template v-slot:date>{{ args.date }}</template>
			<template v-slot:day>{{ args.day }}</template>
		</p-linear-calendar-day>
	`
})

export const Default = Template.bind({})
Default.args = {
	date: '13',
	day: 'Fri',
	drafts: 2,
	posts: 3
}
