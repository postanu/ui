import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS_ORDER } from '@postanu/core'
import { action } from '@storybook/addon-actions'

import PQueueEditor from './PQueueEditor.vue'

type Story = StoryObj<typeof PQueueEditor>

export default {
	title: 'Queue / PQueueEditor',
	component: PQueueEditor,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PQueueEditor>

const Template: Story = {
	render: args => ({
		components: {
			PQueueEditor
		},
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		setup: () => {
			return { args }
		},
		template: `
			<p-queue-editor
				:placeholder="args.placeholder"
				:placeholder-time="args.placeholderTime"
				:placeholder-content="args.placeholderContent"
				:networks="args.networks"
				:allowed-networks="args.allowedNetworks"
				v-model:activated="args.activated"
				v-model:time="args.time"
				v-model:text="args.text"
				@focus="args.onFocus"
			/>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		activated: false,
		placeholder: 'Type your text here',
		placeholderTime: 'Now',
		placeholderContent: 'Create new post',
		// @ts-expect-error
		networks: NETWORKS_ORDER,
		allowedNetworks: ['facebook', 'instagram', 'twitter'],
		time: Date.now(),
		text: '',
		onFocus: action('focus')
	}
}
