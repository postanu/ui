import { NETWORKS_ORDER } from '@postanu/core'
import type { Meta, StoryObj } from '@storybook/vue3'

import PPage from './PPage.vue'

type Story = StoryObj<typeof PPage>

export default {
	title: 'PPage',
	component: PPage,
	argTypes: {
		icon: {
			control: {
				type: 'select',
				labels: {
					undefined: 'No icon'
				}
			},
			options: [undefined, ...NETWORKS_ORDER]
		},
		avatar: {
			control: 'text'
		}
	}
} as Meta<typeof PPage>

export const Default: Story = {
	args: {
		icon: 'facebook',
		avatar: 'mm.jpg',
		fullname: 'Marilyn Manson',
		username: 'marilynmanson'
	}
}

export const Letter: Story = {
	args: {
		icon: 'facebook',
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
