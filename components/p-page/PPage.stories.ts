import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from '../../icons/index.js'
import PPage from './PPage.vue'

export default {
	title: 'PPage',
	component: PPage,
	argTypes: {
		icon: {
			control: {
				type: 'select',
				labels: {
					null: 'No icon'
				}
			},
			options: [null, ...Object.keys(icons)],
			description: 'Icon name'
		},
		avatar: {
			control: 'text',
			description: 'Image URL'
		},
		fullname: {
			control: 'text',
			description: 'Page Full Name'
		},
		username: {
			control: 'text',
			description: 'Page Username / Nickname / URL'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PPage },
	setup: () => ({ args }),
	template: '<p-page v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
	icon: 'facebook',
	avatar: 'mm.jpg',
	fullname: 'Marilyn Manson',
	username: 'marilynmanson'
}

export const Hoverable = Template.bind({})
Hoverable.args = {
	icon: 'facebook',
	avatar: 'mm.jpg',
	fullname: 'Marilyn Manson',
	username: 'marilynmanson',
	hoverable: true
}

export const Letter = Template.bind({})
Letter.args = {
	icon: 'facebook',
	fullname: 'Marilyn Manson',
	username: 'marilynmanson'
}

export const NoIcon = Template.bind({})
NoIcon.args = {
	avatar: 'mm.jpg',
	fullname: 'Marilyn Manson',
	username: 'marilynmanson'
}
