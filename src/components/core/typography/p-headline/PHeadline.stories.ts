import type { Meta, StoryObj } from '@storybook/vue3'

import { ALLOWED_TAGS } from '../allowed-tags/index.js'
import PHeadline from './PHeadline.vue'

type Story = StoryObj<typeof PHeadline>

export default {
	title: 'PHeadline',
	component: PHeadline,
	argTypes: {
		default: {
			control: 'text'
		},
		tag: {
			control: 'select',
			options: ALLOWED_TAGS
		}
	}
} as Meta<typeof PHeadline>

const Template: Story = {
	render: args => ({
		components: { PHeadline },
		setup: () => ({ args }),
		template: `
			<p-headline :tag="args.tag">
				{{ args.default }}
			</p-headline>
		`
	})
}

export const Headline: Story = {
	...Template,
	args: {
		default: 'Headline',
		tag: 'h1'
	}
}
