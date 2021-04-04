import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { generatePages } from '../../data'
import PSettingsPages from './PSettingsPages.vue'

export default {
	title: 'PSettingsPages',
	component: PSettingsPages,
	argTypes: {
		count: {
			control: 'number',
			defaultValue: '13',
			description: 'Property of generative view'
		},
		networks: {
			control: 'number',
			defaultValue: '4',
			description: 'Property of generative view'
		},
		removable: {
			control: 'boolean',
			description: 'Show remove button for each page.'
		},
		pages: {
			control: 'text',
			description: 'Pages object in JSON'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PSettingsPages },
	setup: () => {
		return {
			pages: args.pages
				? JSON.parse(args.pages)
				: generatePages(args.count, args.networks),
			removable: args.removable
		}
	},
	template: '<p-settings-pages :pages="pages" :removable="removable" />'
})

export const OnePage = Template.bind({})
OnePage.args = {
	pages: JSON.stringify(generatePages(1), null, '\t')
}

export const MultiPage = Template.bind({})
MultiPage.args = {
	pages: JSON.stringify(generatePages(10, 3), null, '\t')
}

export const Generative = Template.bind({})
