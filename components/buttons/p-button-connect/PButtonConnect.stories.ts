import type { Meta, StoryFn } from '@storybook/vue3'
import { NETWORKS_ORDER } from '@postanu/core'

import PButtonConnect from './PButtonConnect.vue'
// import { icons } from '../../icons/index.js'

export default {
	title: 'Buttons / PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		network: {
			control: 'select',
			options: NETWORKS_ORDER
		},
		href: {
			control: 'text'
		},
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonConnect>

const Template: StoryFn<typeof PButtonConnect> = args => ({
	components: { PButtonConnect },
	setup: () => ({
		args,
		network: args.network,
		href: args.href
	}),
	template: `
		<p-button-connect
			:href="href"
			:network="network"
		>
			{{ args.default }}
		</p-button-connect>
	`
})

export const Default = Template.bind({})
Default.args = {
	default: 'Facebook',
	network: 'facebook',
	href: '#'
}
