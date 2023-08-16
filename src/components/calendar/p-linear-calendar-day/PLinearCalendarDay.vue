<template lang="pug">
button.p-linear-calendar-day(
	ref="el"
	:class=`{
		'p-linear-calendar-day--today': isToday,
		'p-linear-calendar-day--selected': isSelected,
		'p-linear-calendar-day--past': isPast,
		'p-linear-calendar-day--weekend': isWeekend
	}`
	:aria-label="areaLabel"
)
	.p-linear-calendar-day__bg
	.p-linear-calendar-day__border
	.p-linear-calendar-day__date
		slot(name="date")
	.p-linear-calendar-day__day
		slot(name="day")
	.p-linear-calendar-day__state(v-if="drafts | posts")
		.p-linear-calendar-day__state-draft(
			v-for="n in counters.drafts"
			:key="n"
		)
		.p-linear-calendar-day__state-post(
			v-for="n in counters.posts"
			:key="n"
		)
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'

import { usePostsScale } from '../../../composables/use-posts-scale/index.js'

interface Props {
	isPast: boolean
	isToday: boolean
	isSelected: boolean
	isWeekend: boolean
	drafts: number
	posts: number
}

const props = defineProps<Props>()
const { drafts, posts } = toRefs(props)

const el = ref<HTMLButtonElement | null>(null)

const areaLabel = computed(
	() => `${drafts.value} drafts, ${posts.value} scheduled posts`
)

const counters = usePostsScale(drafts, posts)

defineExpose({ el })
</script>

<style lang="sass">
.p-linear-calendar-day
	position: relative
	box-sizing: border-box
	display: flex
	flex-direction: column
	gap: 10px
	align-items: center
	min-width: 110px
	height: 90px
	padding-top: 20px
	text-align: center

.p-linear-calendar-day:hover
	.p-linear-calendar-day__border
		background-color: var(--p-color-white-04)

.p-linear-calendar-day--past
	.p-linear-calendar-day__date
		color: var(--p-color-white-04)

.p-linear-calendar-day--today,
.p-linear-calendar-day--selected
	&:hover
		.p-linear-calendar-day__border
			background-color: var(--p-color-black) !important

	.p-linear-calendar-day__border
		background-color: var(--p-color-black) !important

	.p-linear-calendar-day__bg
		background-color: var(--p-color-white-07)

	.p-linear-calendar-day__date,
	.p-linear-calendar-day__day
		color: var(--p-color-black)

.p-linear-calendar-day--weekend
	.p-linear-calendar-day__border
		background-color: var(--p-color-red-02)

	&:hover
		.p-linear-calendar-day__border
			background-color: var(--p-color-red-05)

.p-linear-calendar-day__bg,
.p-linear-calendar-day__border
	position: absolute
	inset: 0
	z-index: -1
	content: ""

.p-linear-calendar-day__bg
	mask-image: url('./background.svg')
	background-color: transparent

.p-linear-calendar-day__border
	mask-image: url('./border.svg')
	background-color: var(--p-color-white-01)

.p-linear-calendar-day__date
	font-size: 41px
	font-weight: 500
	line-height: 30px
	color: var(--p-color-white-08)

.p-linear-calendar-day__day
	color: var(--p-color-white-05)

.p-linear-calendar-day__state
	position: absolute
	bottom: -16px
	display: flex
	gap: 4px
	align-items: center

.p-linear-calendar-day__state-post
	width: 4px
	height: 4px
	background-color: var(--p-color-white-05)
	border-radius: 50%

.p-linear-calendar-day__state-draft
	width: 6px
	height: 6px
	border: 1px solid var(--p-color-white-05)
	border-radius: 50%
</style>
