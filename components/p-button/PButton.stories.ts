import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from '../p-icon/icons.js'
import PButton from './PButton.vue'

export default {
	title: 'Button/PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text',
			description: 'Slot content',
			defaultValue: 'Button'
		},
		type: {
			control: 'select',
			options: ['default', 'link'],
			defaultValue: 'default'
		},
		icon: {
			control: {
				type: 'select',
				labels: {
					null: 'No icon'
				}
			},
			options: [null, ...Object.keys(icons)],
			defaultValue: null,
			description: 'Icon name'
		},
		image: {
			control: 'text',
			description: 'Image URL'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false
		},
		danger: {
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
		disabled: args.disabled,
		danger: args.danger
	}),
	template: `
		<p-button
			:type="type"
			:icon="icon"
			:image="image"
			:disabled="disabled"
			:danger="danger"
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
	image: 'mm.jpg'
}
TextAvatar.storyName = 'Text with Avatar'

export const Link = Template.bind({})
Link.args = {
	default: 'Link Button',
	type: 'link'
}

export const LinkDanger = Template.bind({})
LinkDanger.args = {
	default: 'Link Button',
	type: 'link',
	danger: true
}

export const Icon = Template.bind({})
Icon.args = {
	default: undefined,
	icon: 'close'
}

export const Avatar = Template.bind({})
Avatar.args = {
	default: undefined,
	image: 'mm.jpg'
}
