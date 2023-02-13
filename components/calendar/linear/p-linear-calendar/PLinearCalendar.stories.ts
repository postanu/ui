import type { Story } from '@storybook/vue3'

import PLinearCalendar from './PLinearCalendar.vue'

export default {
	title: 'Calendar / PLinearCalendar',
	component: PLinearCalendar,
	parameters: {
		layout: 'fullscreen'
	}
}

export const parameters = { layout: 'fullscreen' }

const Template: Story = args => ({
	components: { PLinearCalendar },
	setup: () => ({ args }),
	template: `
		<p-linear-calendar>
		</p-linear-calendar>
	`
})

export const Default = Template.bind({})
Default.args = {
	date: '13',
	day: 'Fri'
}
