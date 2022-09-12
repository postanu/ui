import type { Story } from '@storybook/vue3'

import PIconArrowNorthEast from './PIconArrowNorthEast.vue'

export default {
	title: 'Icons / PIconArrowNorthEast',
	component: PIconArrowNorthEast
}

export const Default: Story = () => ({
	components: { PIconArrowNorthEast },
	template: '<p-icon-arrow-north-east />'
})
