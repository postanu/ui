<template lang="pug">
.p-linear-calendar(ref="root")
	.p-linear-calendar__year(
		v-for="[yearIndex, year] in calendar"
		:key="yearIndex"
	)
		.p-linear-calendar__year-header
			.p-linear-calendar__year-name {{ yearIndex }}
		.p-linear-calendar__month(
			v-for="[monthIndex, month] in year"
			:key="monthIndex"
		)
			.p-linear-calendar__month-header
				.p-linear-calendar__month-name(
					:data-month-id="monthIndex + ':' + yearIndex"
					v-intersection-observer="onIntersectionObserver()"
				) {{ t[MONTHS[monthIndex - 1]] }}
			template(
				v-for="[,day] in month.days"
				:key="day.date"
			)
				p-linear-calendar-day(
					:is-past="day.isPast"
					:is-today="isToday(day.date)"
					:is-selected="day.date === selectedDate"
					:is-weekend="day.isWeekend"
					:drafts="0"
					:posts="0"
					@click="selectDate(day.date)"
				)
					template(#date) {{ day.day }}
					template(#day) {{ t[DAYS[day.dayOfWeek]] }}
	transition(name="fade")
		button.p-linear-calendar__next-month(
			v-if="showNextMonth"
			@click="scrollToNextMonth"
		) {{ nextMonth }}
</template>

<script lang="ts" setup>
import { vIntersectionObserver } from '@vueuse/components'
import { calendarMessages } from '@postanu/i18n'
import { MONTHS, DAYS } from '@postanu/core'
import { useStore } from '@nanostores/vue'
import { isToday } from 'date-fns'
import { computed, ref } from 'vue'

import PLinearCalendarDay from '../p-linear-day/PLinearCalendarDay.vue'
import { createLinearCalendar } from '../../create-calendar/index.js'
import { parseMonthId, useScroll } from './composables/useScroll.js'

const selectedDate = ref(Date.now())
const calendar = ref(
	createLinearCalendar({
		selectedDate: selectedDate.value,
		subMonths: 1,
		addMonths: 3
	})
)

const root = ref<HTMLDivElement | null>(null)
const t = useStore(calendarMessages)
const {
	onIntersectionObserver,
	scrollToNextMonth,
	showNextMonth,
	nextMonthId
} = useScroll(root, selectedDate)

let nextMonth = computed(
	() => t.value[MONTHS[parseMonthId(nextMonthId.value)[0]]]
)

function selectDate (date: number): void {
	selectedDate.value = date
}
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
	overflow-x: auto

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
