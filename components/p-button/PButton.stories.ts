import type { Story } from '@storybook/vue3'

import { icons } from '../../icons/index.js'
import PButton from './PButton.vue'

export default {
	title: 'PButton/PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text'
		},
		tag: {
			control: 'select',
			options: ['button', 'a']
		},
		type: {
			control: 'select',
			options: [
				'default',
				'common',
				'text'
			]
		},
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
		image: {
			control: 'text',
			description: 'Image URL'
		},
		danger: {
			control: 'boolean'
		},
		target: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		},
		href: {
			control: 'text'
		}
	}
}

const Template: Story = args => ({
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

export const Common = Template.bind({})
Common.args = {
	default: 'Common Button',
	type: 'common'
}

export const Text = Template.bind({})
Text.args = {
	default: 'Text Button',
	type: 'text'
}

export const TextTarget = Template.bind({})
TextTarget.args = {
	default: 'Target Text Button',
	type: 'text',
	target: true
}

export const TextDanger = Template.bind({})
TextDanger.args = {
	default: 'Dander Text Button',
	type: 'text',
	danger: true
}

export const TextMuted = Template.bind({})
TextMuted.args = {
	default: 'Muted Text Button',
	type: 'text',
	muted: true
}

export const TextLink = Template.bind({})
TextLink.args = {
	default: 'Text as Link',
	type: 'text',
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
