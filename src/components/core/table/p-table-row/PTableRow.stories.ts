import type { Meta, StoryObj } from '@storybook/vue3'

import { discography, randomInRange } from '../../../../../generator/index.js'
import PTableRow from './PTableRow.vue'

// TODO: fix types
type Story = StoryObj<typeof PTableRow> & {
	args?: {
		default?: string
		common?: string
	}
}

export default {
	title: 'Table / PTableRow',
	component: PTableRow,
	argTypes: {
		default: {
			control: 'text'
		},
		common: {
			control: 'text'
		}
	}
} as Meta<typeof PTableRow>

const Template: Story = {
	render: args => ({
		inheritAttrs: false,
		components: { PTableRow },
		setup: () => ({
			// @ts-ignore
			items: args.default.split('\n'),
			// @ts-ignore
			columns: args.columns,
			getCommon: (text: string): null | string => {
				// @ts-ignore
				if (args.common) {
					// @ts-ignore
					return args.common
				}
				let common = text.match(/\((\D+)\)/)
				return common ? common[1] : null
			}
		}),
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
}

function generateContent (count: number): string {
	return Array.from({ length: count }).map(() => {
		return discography[randomInRange(0, discography.length - 1)]
	}).join('\n')
}

export const OneLine: Story = {
	...Template,
	args: {
		default: generateContent(1)
	}
}

export const OneLineWithCommon: Story = {
	...Template,
	args: {
		default: generateContent(1),
		common: 'Marilyn Manson'
	}
}

export const MultiLine: Story = {
	...Template,
	args: {
		default: generateContent(66)
	}
}
