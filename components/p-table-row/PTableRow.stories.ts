import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { discography, randomInRange } from '../../generator'
import PTableRow from './PTableRow.vue'

export default {
	title: 'PTable/PTableRow',
	component: PTableRow,
	argTypes: {
		default: {
			control: 'text'
		},
		common: {
			control: 'text'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PTableRow },
	setup: () => {
		return {
			items: args.default.split('\n'),
			columns: args.columns,
			getCommon: (text: string): string | null => {
				if (args.common) {
					return args.common
				}
				let common = text.match(/\((\D+)\)/)
				return common ? common[1] : null
			}
		}
	},
	template: `
		<p-table-row
			v-for="text in items"
			style="line-height: 50px;"
		>
			{{ text }}
			<template v-if="getCommon(text)" v-slot:common>
				{{ getCommon(text) }}
			</template>
		</p-table-row>
	`
})

function generateContent (count: number): string {
	return Array.from({ length: count }).map(() => {
		return discography[randomInRange(0, discography.length - 1)]
	}).join('\n')
}

export const OneLine = Template.bind({})
OneLine.args = {
	default: generateContent(1)
}

export const OneLineWithCommon = Template.bind({})
OneLineWithCommon.args = {
	default: generateContent(1),
	common: 'Marilyn Manson'
}

export const MultiLine = Template.bind({})
MultiLine.args = {
	default: generateContent(66)
}
