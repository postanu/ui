<template lang="pug">
.p-linear-calendar(ref="el")
	.p-linear-calendar__year(
		v-for="[yearKey, year] in calendar"
		:key="yearKey"
	)
		.p-linear-calendar__year-header
			.p-linear-calendar__year-name {{ yearKey }}
		.p-linear-calendar__month(
			v-for="[monthKey, month] in year"
			:key="`${yearKey}:${monthKey}`"
			:ref="setRef(yearKey, monthKey)"
		)
			.p-linear-calendar__month-header
				.p-linear-calendar__month-name
					slot(
						name="month"
						:month-key="monthKey - 1"
					)
			template(
				v-for="[,day] in month"
				:key="day.date"
			)
				slot(
					name="day"
					:day="day"
				)
	transition(name="fade")
		button.p-linear-calendar__next-month(
			v-if="showNextMonth"
			@click="scrollToNextMonth"
		)
			slot(
				name="nextMonth"
				:month-key="nextMonthKey - 1"
			)
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { LinearCalendarDay } from '../create-calendar/index.js'

import { useCalendar } from '../composables/useCalendar/index.js'

interface Props {
	selectedDate: string
}

interface Slots {
	day (props: { day: LinearCalendarDay }): unknown
	month (props: { monthKey: number }): unknown
	nextMonth (props: { monthKey: number }): unknown
}

interface Emits {
	(event: 'update:selectedDate', selectedDate: string): void
}

const props = defineProps<Props>()
const selectedDate = ref(props.selectedDate)
const el = ref<HTMLDivElement | null>(null)

defineEmits<Emits>()
defineSlots<Slots>()
defineExpose({ el })

const {
	calendar,
	nextMonthKey,
	showNextMonth,
	setRef,
	scrollToNextMonth
} = useCalendar({
	root: el,
	selectedDate
})
</script>

<style lang="sass">
.fade-enter-active
	transition: opacity 0.3s ease-in

.fade-leave-active
	transition: opacity 0.15s ease-out

.fade-enter-from,
.fade-leave-to
	opacity: 0

.p-linear-calendar
	padding: 20px 20px 110px
	overflow: hidden
	overflow-x: scroll
	will-change: contents, scroll-position

.p-linear-calendar::-webkit-scrollbar
	display: none

.p-linear-calendar,
.p-linear-calendar__year,
.p-linear-calendar__month,
.p-linear-calendar__week
	display: flex
	gap: 10px

.p-linear-calendar__next-month
	position: absolute
	top: 40px
	right: 20px
	font-weight: 700
	color: var(--p-color-white-03)
	background-color: var(--p-color-black)
	box-shadow: -40px 0 20px 20px var(--p-color-black), 40px 0 20px 10px var(--p-color-black)

.p-linear-calendar__next-month:hover
	color: var(--p-color-white-09)

.p-linear-calendar__year
	position: relative

.p-linear-calendar__year:first-child
	margin-left: 15px

.p-linear-calendar__year:last-child
	padding-right: 20px

.p-linear-calendar__year-header
	position: absolute
	z-index: 101
	display: flex
	width: 100%

.p-linear-calendar__year-name
	position: sticky
	top: 0
	left: 0
	padding-right: 20px
	font-weight: 700
	cursor: default

.p-linear-calendar__month
	position: relative
	display: flex
	flex-direction: row
	padding-top: 70px

.p-linear-calendar__month-header
	position: absolute
	top: 20px
	display: flex
	width: 100%

.p-linear-calendar__month-name
	position: sticky
	top: 0
	left: 0
	padding-right: 20px
	font-weight: 700
	cursor: default
	background-color: black
	box-shadow: -40px 0 20px 20px var(--p-color-black), 40px 0 20px 10px var(--p-color-black)

.p-linear-calendar__week
	margin-top: 50px
</style>
