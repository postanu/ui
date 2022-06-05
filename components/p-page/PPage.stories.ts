import type { Story } from '@storybook/vue3'

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
			options: [undefined, ...Object.keys(icons)],
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
}

const Template: Story = args => ({
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
