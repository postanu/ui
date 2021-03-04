import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from '../p-icon/icons.js'
import PButton from './PButton.vue'

export default {
	title: 'PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text',
			description: 'Slot content',
			defaultValue: 'Button'
		},
		type: {
			control: {
				type: 'select',
				options: ['default', 'link']
			},
			defaultValue: 'default'
		},
		icon: {
			control: {
				type: 'select',
				options: [undefined, ...Object.keys(icons)]
			},
			description: 'Icon name'
		},
		image: {
			control: 'text',
			description: 'Image URL'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButton },
	setup: () => ({
		args,
		type: args.type,
		icon: args.icon,
		image: args.image,
		disabled: args.disabled
	}),
	template: `
		<p-button
			:type="type"
			:icon="icon"
			:image="image"
			:disabled="disabled"
		>{{ args.default }}</p-button>
	`
})

export const Text = Template.bind({})
Text.args = { default: 'Text Button' }

export const TextIcon = Template.bind({})
TextIcon.args = {
	default: 'Text Button with Icon',
	icon: 'facebook'
}
TextIcon.storyName = 'Text with Icon'

export const TextAvatar = Template.bind({})
TextAvatar.args = {
	default: 'Text Button with Avatar',
	image: 'https://scontent-hel3-1.xx.fbcdn.net/v/t1.0-1/p480x480/109056710_10215404289135149_5761895205596401501_n.jpg?_nc_cat=109&ccb=2&_nc_sid=7206a8&_nc_eui2=AeETX0MVFSFaawd2u90MrgrwQo82CMCHBBxCjzYIwIcEHBQ4ujzZj9XibD4oWYxgrG4&_nc_ohc=wsV1VTM4OlMAX_H8sIc&_nc_ht=scontent-hel3-1.xx&tp=6&oh=f20c116324bda3a8d0304640db6cd138&oe=60438FDE'
}
TextAvatar.storyName = 'Text with Avatar'

export const Link = Template.bind({})
Link.args = {
	default: 'Link Button',
	type: 'link'
}

export const Avatar = Template.bind({})
Avatar.args = {
	default: undefined,
	image: 'https://scontent-hel3-1.xx.fbcdn.net/v/t1.0-1/p480x480/109056710_10215404289135149_5761895205596401501_n.jpg?_nc_cat=109&ccb=2&_nc_sid=7206a8&_nc_eui2=AeETX0MVFSFaawd2u90MrgrwQo82CMCHBBxCjzYIwIcEHBQ4ujzZj9XibD4oWYxgrG4&_nc_ohc=wsV1VTM4OlMAX_H8sIc&_nc_ht=scontent-hel3-1.xx&tp=6&oh=f20c116324bda3a8d0304640db6cd138&oe=60438FDE'
}
