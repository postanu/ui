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
		},
		hero: {
			control: 'boolean'
		},
		multiline: {
			control: 'boolean'
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
				:hero="args.hero"
				:multiline="args.multiline"
				v-html="args.default"
			/>
		`
	})
}

export const Heading: Story = {
	...Template,
	args: {
		default: 'Heading',
		tag: 'h1'
	}
}

export const Hero: Story = {
	...Template,
	args: {
		default: 'Hero Heading',
		tag: 'h1',
		hero: true
	}
}

export const HeroMultiline: Story = {
	...Template,
	args: {
		default: `
			Sharing your opinion<br>
			and talking about your life<br>
			should be easy
		`,
		tag: 'h1',
		hero: true,
		multiline: true
	}
}
