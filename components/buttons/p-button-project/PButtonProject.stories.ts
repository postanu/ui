import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonProject from './PButtonProject.vue'

export default {
	title: 'Buttons / PButtonProject',
	component: PButtonProject
} as Meta<typeof PButtonProject>

const Template: StoryFn<typeof PButtonProject> = args => ({
	components: { PButtonProject },
	setup: () => ({ args }),
	template: `
		<p-button-project />
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Button Project' }
