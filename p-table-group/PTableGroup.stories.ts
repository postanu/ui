import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import PTableGroup from './PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'

export default {
	title: 'PTableGroup',
	component: PTableGroup,
	argTypes: {
		name: {
			control: 'text',
			description: 'Group content',
			defaultValue: 'Facebook'
		},
		content: {
			control: 'text',
			description: 'Group name',
			defaultValue: 'Feed'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: {
		PTableGroup,
		PTableRow
	},
	setup: () => {
		return {
			name: args.name,
			content: args.content.split(/\r?\n/).filter((item: string) => item.length)
		}
	},
	template: `
		<p-table-group>
			<template v-slot:name>{{ name }}</template>
			<template v-slot:content>
				<ul>
					<li v-for="item in content">
						<p-table-row>{{ item }}</p-table-row>
					</li>
				</ul>
			</template>
		</p-table-group>
	`
})

export const OneLine = Template.bind({})
OneLine.args = {
	name: 'Lead vocals',
	content: 'Marilyn Manson'
}

export const OneGroup = Template.bind({})
OneGroup.args = {
	name: 'Members',
	content: `
		Marilyn Manson
		Paul Wiley
		Juan Alderete
		Brandon Pertzborn
		Tyler Bates
		Gil Sharone
		Fred Sablan`
}
