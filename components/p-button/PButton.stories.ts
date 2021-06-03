import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from '../../icons/index.js'
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
		tag: {
			control: 'select',
			options: ['button', 'a'],
			defaultValue: 'button'
		},
		type: {
			control: 'select',
			options: ['default', 'text'],
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
		danger: {
			control: 'boolean',
			defaultValue: false
		},
		target: {
			control: 'boolean',
			defaultValue: false
		},
		disabled: {
			control: 'boolean',
			defaultValue: false
		},
		href: {
			control: 'text',
			defaultValue: undefined
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButton },
	setup: () => ({
		args,
		tag: args.tag,
		type: args.type,
		icon: args.icon,
		image: args.image,
		danger: args.danger,
		target: args.target,
		muted: args.muted,
		disabled: args.disabled,
		href: args.href
	}),
	template: `
		<p-button
			:tag="tag"
			:type="type"
			:icon="icon"
			:image="image"
			:danger="danger"
			:target="target"
			:muted="muted"
			:disabled="disabled"
			:href="href"
		>{{ args.default }}</p-button>
	`
})

export const Default = Template.bind({})
Default.args = { default: 'Default Button' }

export const DefaultLink = Template.bind({})
DefaultLink.args = {
	default: 'Default as Link',
	href: '#',
	tag: 'a'
}
DefaultLink.storyName = 'Default as Link'

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
	default: 'Default with Icon',
	icon: 'facebook'
}
DefaultIcon.storyName = 'Default with Icon'

export const DefaultAvatar = Template.bind({})
DefaultAvatar.args = {
	default: 'Default Button with Avatar',
	image: 'mm.jpg'
}
DefaultAvatar.storyName = 'Default with Avatar'

export const Text = Template.bind({})
Text.args = {
	default: 'Text Button',
	type: 'link'
}

export const TextTarget = Template.bind({})
TextTarget.args = {
	default: 'Target Text Button',
	type: 'link',
	target: true
}

export const TextDanger = Template.bind({})
TextDanger.args = {
	default: 'Dander Text Button',
	type: 'link',
	danger: true
}

export const TextMuted = Template.bind({})
TextMuted.args = {
	default: 'Muted Text Button',
	type: 'link',
	muted: true
}

export const TextLink = Template.bind({})
TextLink.args = {
	default: 'Text as Link',
	type: 'link',
	href: '#',
	tag: 'a'
}
TextLink.storyName = 'Text as Link'

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
