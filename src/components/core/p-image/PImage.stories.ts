import type { Meta, StoryObj } from '@storybook/vue3'

import { getRandomImage } from '../../../../generator/index.js'
import PImage from './PImage.vue'

type Story = StoryObj<typeof PImage>

export default {
	title: 'PImage',
	component: PImage
} as Meta<typeof PImage>

const Template: Story = {
	render: args => ({
		components: { PImage },
		setup: () => ({ args }),
		template: `
			<p-image v-bind="args" />
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		src: getRandomImage()
	}
}
