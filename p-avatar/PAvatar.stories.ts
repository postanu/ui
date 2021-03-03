import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PAvatar from './PAvatar.vue'

export default {
	title: 'PAvatar',
	component: PAvatar,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL',
			defaultValue: ''
		},
		letter: {
			control: 'text',
			description: 'First letter of user’s name',
			defaultValue: 'A'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PAvatar },
	setup: () => ({ args }),
	template: '<p-avatar v-bind="args" />'
})

export const Image = Template.bind({})
Image.args = {
	image: 'https://scontent-hel3-1.xx.fbcdn.net/v/t1.0-1/p480x480/109056710_10215404289135149_5761895205596401501_n.jpg?_nc_cat=109&ccb=2&_nc_sid=7206a8&_nc_eui2=AeETX0MVFSFaawd2u90MrgrwQo82CMCHBBxCjzYIwIcEHBQ4ujzZj9XibD4oWYxgrG4&_nc_ohc=wsV1VTM4OlMAX_H8sIc&_nc_ht=scontent-hel3-1.xx&tp=6&oh=f20c116324bda3a8d0304640db6cd138&oe=60438FDE'
}

export const Letter = Template.bind({})
