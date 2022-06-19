import type { Story } from '@storybook/vue3'
import { NETWORKS_ORDER } from '@postanu/core'

import PButtonConnect from './PButtonConnect.vue'
// import { icons } from '../../icons/index.js'

export default {
	title: 'PButton/PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		network: {
			control: 'select',
			options: NETWORKS_ORDER
		},
		url: {
			control: 'text',
			description: 'URL'
		},
		default: {
			control: 'text'
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
	network: 'facebook',
	url: '#'
}
