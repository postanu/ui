import type { Meta, StoryObj } from '@storybook/vue3'

import PEditorPage from './PEditorPage.vue'

type Story = StoryObj<typeof PEditorPage>

export default {
	title: 'Editor / PEditorPage',
	component: PEditorPage,
	argTypes: {
		style: {
			control: 'text'
		}
	}
} as Meta<typeof PEditorPage>

export const Default: Story = {
	args: {
		icon: 'facebook',
		avatar: 'mm.jpg',
		fullname: 'Marilyn Manson',
		username: 'marilynmanson'
	}
}

export const WithoutIcon: Story = {
	args: {
		...Default.args,
		style: '--p-editor-page-show-icon: 0'
	}
}
