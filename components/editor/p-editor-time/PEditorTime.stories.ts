import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import PEditorTime from './PEditorTime.vue'

type Story = StoryObj<typeof PEditorTime>

export default {
	title: 'Editor / PEditorTime',
	component: PEditorTime,
	argTypes: {
		locales: {
			control: 'text'
		}
	}
} as Meta<typeof PEditorTime>

export const Now: Story = {
	render: args => ({
		components: { PEditorTime },
		setup: () => ({
			locales: args.locales,
			time: ref(Date.now())
		}),
		template: '<p-editor-time :locales="locales" v-model="time"/>'
	}),
	args: {
		locales: 'en-US'
	}
}
