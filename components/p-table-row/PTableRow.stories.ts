import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { getRandomInRange } from '../../utils'
import { discography } from '../../data'
import PTableRow from './PTableRow.vue'

export default {
	title: 'Table/PTableRow',
	component: PTableRow,
	argTypes: {
		content: {
			control: 'text'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PTableRow },
	setup: () => {
		return {
			items: args.content.split('\n')
		}
	},
	template: `
		<p-table-row
			v-for="text in items"
			style="line-height: 50px;"
		>
			{{ text }}
		</p-table-row>
	`
})

function generateContent (count: number): string {
	return Array.from({ length: count }).map(() => {
		return discography[getRandomInRange(0, discography.length - 1)]
	}).join('\n')
}

export const OneLine = Template.bind({})
OneLine.args = {
	content: generateContent(1)
}

export const MultiLine = Template.bind({})
MultiLine.args = {
	content: generateContent(66)
}
