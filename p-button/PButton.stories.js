import PButton from './PButton.vue'
import { icons } from '..'

export default {
	title: 'PButton',
	component: PButton,
	argTypes: {
		text: {
			description: 'Slot content',
			control: { type: 'text' },
			defaultValue: 'Button'
		},
		icon: {
			description: 'Icon name',
			control: {
				type: 'select',
				options: [undefined, ...Object.keys(icons)]
			},
			defaultValue: undefined
		},
		image: {
			description: 'Image url',
			control: { type: 'text' },
			defaultValue: undefined
		},
		disabled: {
			control: { type: 'boolean' },
			defaultValue: false
		}
	}
}

const Template = (args, { argTypes }) => ({
	components: { PButton },
	props: Object.keys(argTypes),
	template: `
		<p-button v-bind="$props">{{ text }}</p-button>
	`
})

export const Default = Template.bind({})
Default.args = { text: 'Default Button' }

export const DefaultWithIcon = Template.bind({})
DefaultWithIcon.args = {
	text: 'Default Button with Icon',
	icon: 'facebook'
}

export const DefaultWith = Template.bind({})
DefaultWith.args = {
	text: 'Default Button with Image',
	image: 'https://scontent-hel3-1.xx.fbcdn.net/v/t1.0-1/p480x480/109056710_10215404289135149_5761895205596401501_n.jpg?_nc_cat=109&ccb=2&_nc_sid=7206a8&_nc_eui2=AeETX0MVFSFaawd2u90MrgrwQo82CMCHBBxCjzYIwIcEHBQ4ujzZj9XibD4oWYxgrG4&_nc_ohc=wsV1VTM4OlMAX_H8sIc&_nc_ht=scontent-hel3-1.xx&tp=6&oh=f20c116324bda3a8d0304640db6cd138&oe=60438FDE'
}

export const Text = Template.bind({})
Text.args = {
	type: 'text',
	text: 'Text Button'
}
