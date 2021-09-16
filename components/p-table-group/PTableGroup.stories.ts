import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { members } from '../../generator'
import PTableGroup from './PTableGroup.vue'
import PTableRow from '../p-table-row/PTableRow.vue'

export default {
	title: 'PTable/PTableGroup',
	component: PTableGroup,
	argTypes: {
		name: {
			control: 'text',
			description: 'Group content'
		},
		content: {
			control: 'text',
			description: 'Group name'
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
			groups: JSON.parse(args.content)
		}
	},
	template: `
		<p-table-group v-for="g in groups">
			<template v-slot:name>{{ name || g.name }}</template>
			<template v-slot:content>
				<ul>
					<li v-for="i in g.items">
						<p-table-row style="line-height: 50px;">{{ i.name }} — {{ i.years }}</p-table-row>
					</li>
				</ul>
			</template>
		</p-table-group>
	`
})

export const OneLine = Template.bind({})
OneLine.args = {
	name: 'Lead vocals',
	content: JSON.stringify(
		[{
			items: [{
				name: members[0].name,
				years: members[0].years
			}]
		}],
		null,
		'\t'
	)
}

export const OneGroup = Template.bind({})
OneGroup.args = {
	name: 'Members',
	content: JSON.stringify(
		[{
			items: members
				.filter(member => member.type === 'Current')
				.map(member => ({
					name: member.name,
					years: member.years
				}))
		}],
		null,
		'\t'
	)
}

export const MultiGroup = Template.bind({})
MultiGroup.args = {
	content: JSON.stringify(
		// eslint-disable-next-line unicorn/no-array-reduce
		members.reduce<Array<{
			name: string
			items: Array<{ name: string; years: string }>
		}>>((previous, current) => {
			let groupIndex = previous.findIndex(group => group.name === current.type)
			if (groupIndex === -1) groupIndex = previous.length
			previous[groupIndex] = previous[groupIndex] || { name: current.type, items: [] }
			previous[groupIndex].items.push({
				name: current.name,
				years: current.years
			})
			return previous
		}, []),
		null,
		'\t'
	)
}
