import type { Meta, StoryFn } from '@storybook/vue3'

import POnboarding from './POnboarding.vue'

export default {
	title: 'POnboarding',
	component: POnboarding,
	argTypes: {
		openedSteps: {
			control: 'select',
			options: [1, 2]
		},
		activeStep: {
			control: 'select',
			options: [1, 2]
		}
	}
} as Meta<typeof POnboarding>

export const Default: StoryFn<typeof POnboarding> = args => ({
	components: { POnboarding },
	setup: () => ({
		openedSteps: args.openedSteps,
		activeStep: args.activeStep
	}),
	template: `
		<p-onboarding
			:opened-steps="openedSteps"
			:active-step="activeStep"
		/>`
})
Default.args = {
	openedSteps: 1,
	activeStep: 1
}
