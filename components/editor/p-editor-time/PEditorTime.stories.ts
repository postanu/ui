import { ref } from 'vue'
import type { Story } from '@storybook/vue3'

import PEditorTime from './PEditorTime.vue'

export default {
	title: 'Editor / PEditorTime',
	component: PEditorTime,
	argTypes: {
		locales: {
			control: 'text'
		}
	}
}

const Template: Story = args => ({
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
