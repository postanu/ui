import { defineComponent, ref } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PEditorTime from './PEditorTime.vue'

export default {
	title: 'PEditor/PEditorTime',
	component: PEditorTime,
	argTypes: {
		locales: {
			control: 'text'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorTime },
	setup: () => ({
		args,
		time: ref(Date.now()),
		locales: args.locales
	}),
	template: '<p-editor-time :locales="locales" v-model="time"/>'
})

export const Now = Template.bind({})
Now.args = {
	locales: undefined
}
