import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { generatePosts } from '../../generator/post'
import PQueueItem from './PQueueItem.vue'

export default {
	title: 'PQueue/PQueueItem',
	component: PQueueItem,
	argTypes: {
		removing: { action: true },
		remove: { action: true }
	}
} as Meta

export const Default: Story = args => defineComponent({
	components: { PQueueItem },
	setup: () => ({
		args,
		time: args.time,
		pages: args.pages,
		title: args.title,
		attachments: args.attachments,
		state: args.state,
		removing: args.removing,
		remove: args.remove
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
