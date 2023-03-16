import type { Meta, StoryFn } from '@storybook/vue3'

import PEditorPage from './PEditorPage.vue'

export default {
	title: 'Editor / PEditorPage',
	component: PEditorPage,
	argTypes: {
		style: {
			control: 'text'
		}
	}
} as Meta<typeof PEditorPage>

const Template: StoryFn<typeof PEditorPage> = args => ({
	components: { PEditorPage },
	setup: () => ({ args }),
	template: `
		<p-editor-page
			:style="args.style"
			icon="facebook"
			avatar="mm.jpg"
			fullname="Marilyn Manson"
			username="marilynmanson"
		/>
	`
})

export const Default = Template.bind({})

export const WithoutIcon = Template.bind({})
WithoutIcon.args = {
	style: '--p-editor-page-show-icon: 0'
}
