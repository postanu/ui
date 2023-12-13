import type { Meta, StoryObj } from '@storybook/vue3'

import { computed } from 'vue'

import { getRandomIdsList, getRandomImage } from '../../../../generator/index.js'
import PImage from '../../core/p-image/PImage.vue'
import PEditorAttachments from './PEditorAttachments.vue'

type Story = StoryObj<typeof PEditorAttachments>

export default {
	title: 'Editor / PEditorAttachments',
	component: PEditorAttachments,
	argTypes: {
		count: {
			control: {
				type: 'number',
				min: 0,
				max: 10
			}
		}
	}
} as Meta<typeof PEditorAttachments>

const Template: Story = {
	render: args => ({
		components: {
			PEditorAttachments,
			PImage
		},
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		setup: () => {
			// @ts-expect-error custom argument
			let list = computed(() => getRandomIdsList(args.count))
			return { args, list, getRandomImage }
		},
		template: `
			<p-editor-attachments
				v-model="list"
				:disabled="args.disabled"
				v-slot="{ id }"
			>
				<p-image :src="getRandomImage()" />
			</p-editor-attachments>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		// @ts-expect-error custom argument
		count: 5
	}
}
