import type { Story } from '@storybook/vue3'

import PEditorClock from './PEditorClock.vue'

export default {
	title: 'Editor / PEditorClock',
	component: PEditorClock,
	argTypes: {
		format: {
			control: 'select',
			options: ['12', '24']
		}
	}
}

const Template: Story = args => ({
	components: { PEditorClock },
	setup: () => ({ args }),
	template: '<p-editor-clock :format="args.format" />'
})

export const One = Template.bind({})
One.storyName = '12-hour'
One.args = { format: '12' }

export const Two = Template.bind({})
Two.storyName = '24-hour'
Two.args = { format: '24' }
