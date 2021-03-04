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
			description: 'Page Full Name',
			defaultValue: 'Eduard Aksamitov'
		},
		username: {
			control: 'text',
			description: 'Page Username / Nickname / URL',
			defaultValue: 'euaaaio'
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
	avatar: 'https://scontent-hel3-1.xx.fbcdn.net/v/t1.0-1/p480x480/109056710_10215404289135149_5761895205596401501_n.jpg?_nc_cat=109&ccb=2&_nc_sid=7206a8&_nc_eui2=AeETX0MVFSFaawd2u90MrgrwQo82CMCHBBxCjzYIwIcEHBQ4ujzZj9XibD4oWYxgrG4&_nc_ohc=wsV1VTM4OlMAX_H8sIc&_nc_ht=scontent-hel3-1.xx&tp=6&oh=f20c116324bda3a8d0304640db6cd138&oe=60438FDE'
}

export const Letter = Template.bind({})

export const NoIcon = Template.bind({})
NoIcon.args = {
	icon: ''
}
