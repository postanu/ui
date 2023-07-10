import type { Meta, StoryObj } from '@storybook/vue3'

import PHeading from './PHeading.vue'
import { ALLOWED_TAGS } from './allowed-tags/index.js'

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
				:hero="args.hero"
				:headline="args.headline"
				:tag="args.tag"
			>
				{{ args.default }}
			</p-heading>
		`
	})
}

export const Hero: Story = {
	...Template,
	args: {
		default: 'Hero',
		hero: true,
		tag: 'h1'
	}
}

export const Headline: Story = {
	...Template,
	args: {
		default: 'Headline',
		headline: true,
		tag: 'h1'
	}
}
