<template lang="pug">
.p-queue-heading(:class="{ 'p-queue-heading--muted': muted }")
	p-heading.p-queue-heading__title(tag="div" hero) {{ title }}
	.p-queue-heading__subtitle {{ subtitle }}
</template>

<script lang="ts">
import { format, isToday, isTomorrow, isThisYear, isYesterday } from 'date-fns'
import { computed, defineComponent, toRefs } from 'vue'

import PHeading from '../p-heading/PHeading.vue'

export default defineComponent({
	name: 'PQueueHeading',
	components: { PHeading },
	props: {
		date: {
			type: Number,
			required: true
		},
		muted: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		let { date } = toRefs(props)
		let title = computed(() => {
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
		let subtitle = computed(() => {
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
		return { title, subtitle }
	}
})
</script>

<style lang="stylus">
.p-queue-heading
	display: flex

.p-queue-heading--muted
	.p-queue-heading__title
		color: var(--p-color-white-04)

.p-queue-heading__title
	// color: var(--p-color-white-08)
	// font-size: 68px
	// font-weight: 500
	// line-height: 0.7353
	// text-transform: uppercase

.p-queue-heading__subtitle
	color: var(--p-color-white-04)
	font-size: var(--p-h2-regular-font-size)
	line-height: 0.7334
	margin-left: 20px
</style>
