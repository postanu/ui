import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import PButtonPage from './PButtonPage.vue'
import PPage from '../p-page/PPage.vue'

export default {
	title: 'PButton/PButtonPage',
	component: PButtonPage,
	argTypes: {
		tag: {
			control: 'select',
			options: ['button', 'a']
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButtonPage, PPage },
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
