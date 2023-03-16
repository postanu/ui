import type { Story } from '@storybook/vue3'

import PIconRune from './PIconRune.vue'

export default {
	title: 'Icons / PIconRune',
	component: PIconRune
}

export const Default: Story = () => ({
	components: { PIconRune },
	template: '<p-icon-rune />'
})
