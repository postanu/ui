import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PPageListItem from './PPageListItem.vue'
import { icons } from '../p-icon/icons.js'

export default {
	title: 'PPageListItem',
	component: PPageListItem,
	argTypes: {
		icon: {
			control: {
				type: 'select',
				options: [undefined, ...Object.keys(icons)]
			},
			description: 'Icon name',
			defaultValue: 'facebook'
		},
		avatar: {
			control: 'text',
			description: 'Image URL',
			defaultValue: ''
		},
		letter: {
			control: 'text',
			description: 'First letter of user’s name',
			defaultValue: 'e'
		},
		fullname: {
			control: 'text',
			defaultValue: 'Marilyn Manson',
			description: 'Page Full Name'
		},
		username: {
			control: 'text',
			defaultValue: 'marilynmanson',
			description: 'Page Username / Nickname / URL'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PPageListItem },
	setup: () => ({ args }),
	template: '<p-page-list-item v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
	avatar: 'mm.jpg'
}

export const Letter = Template.bind({})

export const NoIcon = Template.bind({})
NoIcon.args = {
	icon: ''
}
