import { Story, Meta } from '@storybook/vue3'
import { defineComponent } from 'vue'

import { getRandomInRange } from '../../utils'
import { discography } from '../../data'
import PTableRow from './PTableRow.vue'

export default {
	title: 'Table/PTableRow',
	component: PTableRow,
	argTypes: {
		default: {
			control: 'text',
			defaultValue: discography[getRandomInRange(0, discography.length - 1)],
			description: 'Slot content'
		},
		lines: {
			control: 'number',
			defaultValue: '1',
			description: 'Lines count'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PTableRow },
	setup: () => ({
		lines: args.lines,
		content: args.default,
		discography,
		getRandomInRange
	}),
	template: `
		<p-table-row
			v-if="lines > 1"
			v-for="n in lines"
			style="line-height: 50px;"
		>{{ discography[getRandomInRange(0, discography.length - 1)] }}</p-table-row>
		<p-table-row style="line-height: 50px;" v-else>{{ content }}</p-table-row>
	`
})

export const OneLine = Template.bind({})

export const MultiLine = Template.bind({})
MultiLine.args = {
	lines: 66,
	default: undefined
}
