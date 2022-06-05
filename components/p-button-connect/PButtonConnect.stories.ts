import type { Story } from '@storybook/vue3'

import PButtonConnect from './PButtonConnect.vue'
import { icons } from '../../icons/index.js'

export default {
	title: 'PButton/PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		default: {
			control: 'text'
		},
		icon: {
			control: 'select',
			options: Object.keys(icons),
			description: 'Icon name'
		},
		url: {
			control: 'text',
			description: 'URL'
		}
	}
}

const Template: Story = args => ({
	components: { PButtonConnect },
	setup: () => ({ args }),
	template: `
		<p-button-connect v-bind="args">{{ args.default }}</p-button-connect>
	`
})

export const Default = Template.bind({})
Default.args = {
	default: 'Facebook',
	icon: 'facebook',
	url: '#'
}
