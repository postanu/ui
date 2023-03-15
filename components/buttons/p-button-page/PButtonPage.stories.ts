import type { Meta, StoryFn } from '@storybook/vue3'

import PButtonPage from './PButtonPage.vue'
import PPage from '../../p-page/PPage.vue'

export default {
	title: 'Buttons / PButtonPage',
	component: PButtonPage
} as Meta<typeof PButtonPage>

const Template: StoryFn<typeof PButtonPage> = args => ({
	components: {
		PButtonPage,
		PPage
	},
	setup: () => ({ args }),
	template: `
		<p-button-page v-bind="args">
			<p-page
				icon="facebook"
				avatar="mm.jpg"
				fullname="Marilyn Manson"
				username="marilynmanson"
			/>
		</p-button-page>
	`
})

export const Default = Template.bind({})
Default.args = {
	tag: 'button'
}

export const HideIcon = Template.bind({})
HideIcon.args = {
	tag: 'button',
	hideIcon: true
}
