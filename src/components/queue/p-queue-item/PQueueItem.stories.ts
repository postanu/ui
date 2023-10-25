import type { Meta, StoryObj } from '@storybook/vue3'
import type { ConcreteComponent } from 'vue'

import { action } from '@storybook/addon-actions'

import { generatePosts } from '../../../../generator/index.js'
import { createButtonRemoveManager } from '../../../composables/index.js'
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

const useButtonRemoveManager = createButtonRemoveManager()

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
			// eslint-disable-next-line unicorn/no-array-reduce
			let controls = posts.reduce<{
				[id: string]: ReturnType<typeof useButtonRemoveManager>
			}>((prev, { id }) => {
				return {
					...prev,
					[id]: useButtonRemoveManager(id)
				}
			}, {})
			return {
				args,
				posts,
				controls
			}
		},
		template: `
			<p-queue-item
				v-for="post in posts"
				:style="{ '--p-queue-item-show-controls': controls[post.id][0].value ? '1' : undefined }"
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
						v-model:removing="controls[post.id][1].value"
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
