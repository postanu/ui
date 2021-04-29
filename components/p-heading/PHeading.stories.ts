import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PHeading from './PHeading.vue'

export default {
	title: 'PHeading',
	component: PHeading,
	argTypes: {
		default: {
			control: 'text',
			defaultValue: 'Heading',
			description: 'Heading text'
		},
		tag: {
			control: 'text',
			defaultValue: 'h1'
		},
		hero: {
			control: 'boolean'
		},
		headline: {
			control: 'boolean'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
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
	default: 'Hero heading',
	hero: true
}

export const Headline = Template.bind({})
Headline.args = {
	default: 'Headline heading',
	headline: true
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
