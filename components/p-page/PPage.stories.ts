import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PPage from './PPage.vue'
import { icons } from '../p-icon/icons.js'

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
			defaultValue: 'facebook',
			description: 'Icon name'
		},
		avatar: {
			control: 'text',
			defaultValue: '',
			description: 'Image URL'
		},
		letter: {
			control: 'text',
			defaultValue: 'M',
			description: 'First letter of user’s name'
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
	components: { PPage },
	setup: () => ({ args }),
	template: '<p-page v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
	avatar: 'mm.jpg'
}

export const Letter = Template.bind({})

export const NoIcon = Template.bind({})
NoIcon.args = {
	icon: null
}
