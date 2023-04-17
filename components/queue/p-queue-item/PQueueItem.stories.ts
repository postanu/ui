import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'

import { generatePosts } from '../../../generator/post/index.js'
import PQueueItem from './PQueueItem.vue'

type Story = StoryObj<typeof PQueueItem>

export default {
	title: 'Queue / PQueueItem',
	component: PQueueItem,
	argTypes: {
		removing: { action: true },
		remove: { action: true },
		click: { action: true }
	}
} as Meta<typeof PQueueItem>

let post = generatePosts(1)[0]

const Template: Story = {
	render: args => ({
		components: { PQueueItem },
		setup: () => ({ args }),
		template: `
			<p-queue-item
				:time="args.time"
				:pages="args.pages"
				:title="args.title"
				:attachments="args.attachments"
				:state="args.state"
				@removing="args.removing"
				@remove="args.remove"
				@click="args.click"
			/>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		time: post.time,
		pages: post.pages,
		title: post.title,
		attachments: post.attachments,
		state: post.state,
		removing: action('removing'),
		remove: action('remove'),
		click: action('click')
	}
}
