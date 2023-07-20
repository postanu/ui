import type { Meta, StoryObj } from '@storybook/vue3'

import { ALLOWED_TAGS } from '../allowed-tags/index.js'
import PHeading from './PHeading.vue'

type Story = StoryObj<typeof PHeading>

export default {
	title: 'PHeading',
	component: PHeading,
	argTypes: {
		default: {
			control: 'text'
		},
		tag: {
			control: 'select',
			options: ALLOWED_TAGS
		}
	}
} as Meta<typeof PHeading>

const Template: Story = {
	render: args => ({
		components: { PHeading },
		setup: () => ({ args }),
		template: `
			<p-heading
				:tag="args.tag"
				v-html="args.default"
			/>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		default: 'Heading',
		tag: 'h1'
	}
}
