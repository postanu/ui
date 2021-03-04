import { Meta, Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { icons } from '../p-icon/icons.js'
import PButtonConnect from './PButtonConnect.vue'

export default {
	title: 'PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		default: {
			control: 'text',
			description: 'Slot content',
			defaultValue: 'Facebook'
		},
		icon: {
			control: {
				type: 'select',
				options: Object.keys(icons)
			},
			description: 'Icon name',
			defaultValue: 'facebook'
		},
		url: {
			control: 'text',
			description: 'URL',
			defaultValue: '#'
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
