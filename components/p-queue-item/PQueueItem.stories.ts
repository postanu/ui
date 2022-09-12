import type { Story } from '@storybook/vue3'

import { generatePosts } from '../../generator/post'
import PQueueItem from './PQueueItem.vue'

export default {
	title: 'Queue / PQueueItem',
	component: PQueueItem,
	argTypes: {
		removing: { action: true },
		remove: { action: true },
		click: { action: true }
	}
}

export const Default: Story = args => ({
	components: { PQueueItem },
	setup: () => ({
		args,
		time: args.time,
		pages: args.pages,
		title: args.title,
		attachments: args.attachments,
		state: args.state,
		removing: args.removing,
		remove: args.remove,
		click: args.click
	}),
	template: `
		<p-queue-item
			:time="time"
			:pages="pages"
			:title="title"
			:attachments="attachments"
			:state="state"
			@removing="removing"
			@remove="remove"
			@click="click"
		/>
	`
})

let post = generatePosts(1)[0]
Default.args = {
	time: post.time,
	pages: post.pages,
	title: post.title,
	attachments: post.attachments,
	state: post.state
}
