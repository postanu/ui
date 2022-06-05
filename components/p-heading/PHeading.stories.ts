import type { Story } from '@storybook/vue3'

import { ALLOWED_TAGS } from './allowed-tags'
import PHeading from './PHeading.vue'

export default {
	title: 'PHeading',
	component: PHeading,
	argTypes: {
		default: {
			control: 'text',
			description: 'Heading text'
		},
		tag: {
			control: 'select',
			options: ALLOWED_TAGS
		},
		hero: {
			control: 'boolean'
		},
		headline: {
			control: 'boolean'
		}
	}
}

const Template: Story = args => ({
	components: { PHeading },
	setup: () => ({ args }),
	template: `
		<p-heading
			:tag="args.tag"
			:hero="args.hero"
			:headline="args.headline"
		>{{ args.default }}</p-heading>
	`
})

export const Hero = Template.bind({})
Hero.args = {
	default: 'Hero',
	hero: true,
	tag: 'h1'
}

export const Headline = Template.bind({})
Headline.args = {
	default: 'Headline',
	headline: true,
	tag: 'h1'
}

// export const H1 = Template.bind({})
// H1.args = { tag: 'h1' }

// export const H2 = Template.bind({})
// H2.args = { tag: 'h2' }

// export const H3 = Template.bind({})
// H3.args = { tag: 'h3' }

// export const H4 = Template.bind({})
// H4.args = { tag: 'h4' }

// export const H5 = Template.bind({})
// H5.args = { tag: 'h5' }

// export const H6 = Template.bind({})
// H6.args = { tag: 'h6' }
