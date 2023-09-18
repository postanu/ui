import type { Meta, StoryObj } from '@storybook/vue3'
import type { ConcreteComponent } from 'vue'

import { action } from '@storybook/addon-actions'

import { generatePosts } from '../../../../generator/index.js'
import { useButtonRemoveList } from '../../../composables/index.js'
import { PAvatar, PButtonRemove } from '../../core/index.js'
import {
	PQueueItem,
	PQueueItemAttachmentsList,
	PQueueItemPages
} from '../index.js'

type Story = StoryObj<typeof PQueueItem>

export default {
	title: 'Queue / PQueueItem',
	component: PQueueItem,
	parameters: {
		layout: 'fullscreen'
	}
} as Meta<typeof PQueueItem>

const Template: Story = {
	decorators: [
		(): ConcreteComponent => ({
			template: '<div style="padding-top: 20px;"><story/></div>'
		})
	],
	render: args => ({
		components: {
			PAvatar,
			PButtonRemove,
			PQueueItem,
			PQueueItemPages,
			PQueueItemAttachmentsList
		},
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		setup: () => {
			let posts = generatePosts(6)
			let [
				setRemovingRef,
				setRemoving,
				isRemoving
			] = useButtonRemoveList()
			return {
				args,
				posts,
				setRemovingRef,
				setRemoving,
				isRemoving
			}
		},
		template: `
			<p-queue-item
				v-for="post in posts"
				:style="{ '--p-queue-item-show-controls': isRemoving(post.id) ? '1' : undefined }"
				:description="args.description"
				@click="args.onClick"
			>
				<template #time>
					{{ post.time }}
				</template>
				<template #pages>
					<p-queue-item-pages
						:items="post.pages"
					/>
				</template>
				<template #state>
					<p-avatar
						v-for="editor in post.editors"
						:style="{ marginLeft: '5px' }"
						:text="editor.name"
						:image="editor.avatar"
					/>
				</template>
				<template #title>
					{{ post.title || 'No title' }}
				</template>
				<template #attachments v-if="post.attachments.length > 0">
					<p-queue-item-attachments-list
						:items="post.attachments"
					/>
				</template>
				<template #controls>
					<p-button-remove
						:ref="el => setRemovingRef(post.id, el)"
						@removing="value => setRemoving(post.id, value)"
					/>
				</template>
			</p-queue-item>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		onClick: action('click')
	}
}
