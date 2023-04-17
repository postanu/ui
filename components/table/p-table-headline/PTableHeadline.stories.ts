import type { Meta, StoryObj } from '@storybook/vue3'

import { ALLOWED_TAGS } from '../../p-heading/allowed-tags.js'
import PTableHeadline from './PTableHeadline.vue'

type Story = StoryObj<typeof PTableHeadline>

export default {
	title: 'Table / PTableHeadline',
	component: PTableHeadline,
	argTypes: {
		default: {
			control: 'text'
		},
		tag: {
			control: 'select',
			options: ALLOWED_TAGS
		}
	}
} as Meta<typeof PTableHeadline>

export const Default: Story = {
	args: {
		default: 'System',
		tag: 'h3'
	}
}
