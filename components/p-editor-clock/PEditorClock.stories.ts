import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import PEditorClock from './PEditorClock.vue'

export default {
	title: 'PEditor/PEditorClock',
	component: PEditorClock,
	argTypes: {
		format: {
			control: 'select',
			options: ['12', '24']
		}
	}
} as Meta

const Template: Story = args => defineComponent({
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
