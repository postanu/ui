<template lang="pug">
.p-calendar
	.p-calendar__scroll(v-bind="containerProps")
		.p-calendar__wrapper(v-bind="wrapperProps")
			.p-calendar__year-list
				.p-calendar__year(
					v-for="item in yearsList"
					:key="item.key"
					:style="item.style"
				)
					.p-calendar__year-label
						slot(
							name="year"
							:year="item.year"
						)
			.p-calendar__month-list
				.p-calendar__month(
					v-for="item in monthsList"
					:key="item.key"
					:style="item.style"
				)
					button.p-calendar__month-label(
						@click="scrollToMonth(item.month, item.year)"
					)
						slot(
							name="month"
							:month="item.month"
						)
			.p-calendar__day-list
				.p-calendar__day(
					v-for="item in datesList"
					:key="item.index"
				)
					slot(
						name="day"
						:day="item.data"
					)
	button.p-calendar__next-month(
		v-if="nextMonth"
		@click="scrollToMonth(nextMonth.month, nextMonth.year)"
	)
		slot(
			name="month"
			:month="nextMonth.month"
		)
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

import type { DatesListItem } from './create-lists/index.js'

import { useCalendar } from './use-calendar/index.js'

interface Props {
	initialDate: string
}

interface Slots {
	day (props: { day: DatesListItem }): unknown
	month (props: { month: number }): unknown
	year (props: { year: number }): unknown
}

defineSlots<Slots>()
const props = defineProps<Props>()
const { initialDate } = toRefs(props)

const {
	containerProps,
	wrapperProps,
	datesList,
	monthsList,
	yearsList,
	nextMonth,
	scrollToMonth
} = useCalendar(initialDate)
</script>

<style lang="sass">
.p-calendar
	position: relative

.p-calendar__scroll
	position: relative
	padding: 0 20px
	overflow: hidden
	overflow-x: scroll
	will-change: scroll-position

.p-calendar__next-month
	position: absolute
	top: 20px
	right: 0
	padding-right: 20px
	font-weight: 700
	color: var(--p-color-white-03)
	background-color: var(--p-color-black)
	box-shadow: -40px 0 20px 20px var(--p-color-black), 40px 0 20px 10px var(--p-color-black)

.p-calendar__next-month:hover
	color: var(--p-color-white-09)

.p-calendar__wrapper
	padding: 70px 0 90px

.p-calendar__day-list
	display: flex
	flex-direction: row
	gap: 10px
	will-change: contents

.p-calendar__month-list,
.p-calendar__year-list
	position: absolute
	top: 60px
	left: 0
	display: flex
	padding-left: 20px

.p-calendar__month-list
	top: 20px

.p-calendar__year-list
	top: 0

.p-calendar__month-label,
.p-calendar__year-label
	position: sticky
	top: 0
	left: 0
	display: inline-block
	padding-right: 20px
	font-weight: 700
</style>
