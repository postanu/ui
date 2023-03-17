import type { Meta, StoryFn } from '@storybook/vue3'

import PLinearCalendar from './PLinearCalendar.vue'

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PLinearCalendar>

const Template: StoryFn<typeof PLinearCalendar> = args => ({
	components: { PLinearCalendar },
	setup: () => ({ args }),
	template: `
		<p-linear-calendar />
	`
})

export const Default = Template.bind({})
Default.args = {
	date: '13',
	day: 'Fri'
}
