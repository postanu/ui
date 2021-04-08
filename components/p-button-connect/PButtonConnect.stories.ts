import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PButtonConnect from './PButtonConnect.vue'
import { icons } from '../../icons'

export default {
	title: 'Button/PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		default: {
			control: 'text',
			defaultValue: 'Facebook',
			description: 'Slot content'
		},
		icon: {
			control: 'select',
			options: Object.keys(icons),
			defaultValue: 'facebook',
			description: 'Icon name'
		},
		url: {
			control: 'text',
			defaultValue: '#',
			description: 'URL'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButtonConnect },
	setup: () => ({ args }),
	template: `
		<p-button-connect v-bind="args">{{ args.default }}</p-button-connect>
	`
})

export const Default = Template.bind({})
