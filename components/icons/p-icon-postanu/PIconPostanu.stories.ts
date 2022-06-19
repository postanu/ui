import type { Story } from '@storybook/vue3'

import PIconPostanu from './PIconPostanu.vue'

export default {
	title: 'PIconPostanu',
	component: PIconPostanu
}

export const Default: Story = () => ({
	components: { PIconPostanu },
	template: '<p-icon-postanu />'
})
