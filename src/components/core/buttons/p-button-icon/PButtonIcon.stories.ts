import type { Meta, StoryObj } from '@storybook/vue3'

import PIconPlus from '../../icons/p-icon-plus/PIconPlus.vue'
import PButtonIcon from './PButtonIcon.vue'

type Story = StoryObj<typeof PButtonIcon>

export default {
	title: 'Buttons / PButtonIcon',
	component: PButtonIcon,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonIcon>

export const Default: Story = {
	render: args => ({
		components: {
			PButtonIcon,
			PIconPlus
		},
		setup: () => ({ args }),
		template: `
			<p-button-icon href="#">
				${args.default}
			</p-button-icon>
		`
	}),
	args: {
		default: '<p-icon-plus />'
	}
}
