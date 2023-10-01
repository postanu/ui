import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS } from '@postanu/shared'

import PPage from './PPage.vue'

type Story = StoryObj<typeof PPage>

export default {
	title: 'PPage',
	component: PPage,
	argTypes: {
		network: {
			control: {
				type: 'select',
				labels: {
					undefined: 'No icon'
				}
			},
			options: [undefined, ...NETWORKS]
		},
		avatar: {
			control: 'text'
		}
	}
} as Meta<typeof PPage>

export const Default: Story = {
	args: {
		network: 'facebook',
		avatar: 'mm.jpg',
		fullname: 'Marilyn Manson',
		username: 'marilynmanson'
	}
}

export const Letter: Story = {
	args: {
		network: 'facebook',
		avatar: null,
		fullname: 'Marilyn Manson',
		username: 'marilynmanson'
	}
}

export const NoIcon: Story = {
	args: {
		avatar: 'mm.jpg',
		fullname: 'Marilyn Manson',
		username: 'marilynmanson'
	}
}
