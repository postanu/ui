import type { Story } from '@storybook/vue3'

import PIconFacebook from './PIconFacebook.vue'

export default {
	title: 'PIconFacebook',
	component: PIconFacebook
}

export const Default: Story = () => ({
	components: { PIconFacebook },
	template: '<p-icon-facebook />'
})
