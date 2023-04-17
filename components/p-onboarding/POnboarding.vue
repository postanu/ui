<template lang="pug">
.p-onboarding
	.p-onboarding__line
		.p-onboarding__line-active(:style="lineStyle")
	ul.p-onboarding__step-list
		li.p-onboarding__step-list-item(
			:class="{ 'p-onboarding__step-list-item--active': activeStep === 1 }"
		)
			component(
				:is="activeStep === 1 ? 'div' : 'button'"
			).p-onboarding__step-title Type the name of&nbsp;the&nbsp;new&nbsp;project
			.p-onboarding__step-description A great name for the first project is your full name or&nbsp;nickname
			p-key.p-onboarding__step-key Enter
		li.p-onboarding__step-list-item
			.p-onboarding__step-title Connect at least one page
			.p-onboarding__step-description It's free — an unlimited number of connected pages in&nbsp;the&nbsp;project
			p-key.p-onboarding__step-key Enter
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'

import PKey from '../p-key/PKey.vue'

type Steps = 1 | 2

interface Props {
	openedSteps: Steps
	activeStep: Steps
}

const props = defineProps<Props>()
const { openedSteps, activeStep } = toRefs(props)

const stepsStyles = {
	1: {
		top: 0,
		height: '200px'
	},
	2: {
		top: '200px',
		height: 'calc(100vh - 200px)'
	}
}

// const openedSteps = ref<Steps>(1)
// const activeStep = ref<Steps>(1)

const lineStyle = computed(() => stepsStyles[activeStep.value])

// onPressEnter → next step
</script>

<style lang="sass">
.p-onboarding
	position: relative
	width: 240px
	height: 100vh // ???

.p-onboarding__line
	position: absolute
	top: 0
	bottom: 0
	left: 0
	width: 1px
	height: 100%
	background-color: var(--p-color-white-01)

.p-onboarding__line-active
	position: absolute
	top: 0
	bottom: 0
	left: 0
	width: 1px
	height: 100%
	content: ''
	background-color: var(--p-color-white-04)
	transition: top 0.15s ease-out, height 0.15s ease-out

.p-onboarding__step-list
	padding-left: 20px

.p-onboarding__step-list-item
	position: relative
	display: flex
	flex-direction: column
	gap: 20px
	align-items: flex-start

.p-onboarding__step-list-item:nth-child(1)
	height: 200px

.p-onboarding__step-list-item:nth-child(2)
	height: 600px

.p-onboarding__step-title
	font-weight: 700

.p-onboarding__step-description
	padding-bottom: 20px
</style>
