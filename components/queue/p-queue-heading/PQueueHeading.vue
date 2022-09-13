<template lang="pug">
.p-queue-heading(:class="{ 'p-queue-heading--muted': muted }")
	p-heading.p-queue-heading__title(
		tag="div"
		hero
	) {{ title }}
	.p-queue-heading__subtitle {{ subtitle }}
</template>

<script lang="ts" setup>
import { format, isToday, isTomorrow, isThisYear, isYesterday } from 'date-fns'
import { computed, toRefs } from 'vue'

import PHeading from '../../p-heading/PHeading.vue'

interface Props {
	date: number
	muted?: boolean
}

const props = withDefaults(
	defineProps<Props>(),
	{
		muted: false
	}
)

const { date } = toRefs(props)
const title = computed(() => {
	if (isYesterday(date.value)) {
		return 'Yesterday'
	}
	if (isToday(date.value)) {
		return 'Today'
	}
	if (isTomorrow(date.value)) {
		return 'Tomorrow'
	}
	return isThisYear(date.value)
		? format(date.value, 'MMMM dd')
		: format(date.value, 'MMMM dd, yyyy')
})
const subtitle = computed(() => {
	if (
		isYesterday(date.value) ||
		isToday(date.value) ||
		isTomorrow(date.value)
	) {
		return isThisYear(date.value)
			? format(date.value, 'dd.LL')
			: format(date.value, 'dd.LL.yyyy')
	}
	return format(date.value, 'EEEE')
})
</script>

<style lang="stylus">
.p-queue-heading
	display: flex

.p-queue-heading--muted
	.p-queue-heading__title
		color: var(--p-color-white-04)

// .p-queue-heading__title
// color: var(--p-color-white-08)
// font-size: 68px
// font-weight: 500
// line-height: 0.7353
// text-transform: uppercase

.p-queue-heading__subtitle
	margin-left: 20px
	font-size: var(--p-h2-regular-font-size)
	line-height: 0.7334
	color: var(--p-color-white-04)
</style>
