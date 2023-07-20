<template lang="pug">
.p-linear-calendar(ref="root")
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
				.p-linear-calendar__month-name {{ t[MONTHS[monthKey - 1]] }}
			template(
				v-for="[,day] in month"
				:key="day.date"
			)
				slot(
					:day="day"
					:selected-date="selectedDate"
					:select-date="selectDate"
				)
	transition(name="fade")
		button.p-linear-calendar__next-month(
			v-if="showNextMonth"
			@click="scrollToNextMonth"
		) {{ nextMonth }}
</template>

<script lang="ts" setup>
import { useStore } from '@nanostores/vue'
import { MONTHS } from '@postanu/core'
import { calendarMessages } from '@postanu/i18n'
import { computed, ref } from 'vue'

import type { LinearCalendarDay } from '../create-calendar/index.js'

import { useCalendar } from '../composables/useCalendar/index.js'

interface Props {
	selectedDate: string
}

interface Slots {
	default (props: {
		day: LinearCalendarDay
		selectedDate: string
		selectDate: (date: string) => void
	}): unknown
}

interface Emits {
	(event: 'update:selectedDate', selectedDate: string): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()
defineSlots<Slots>()

const selectedDate = ref(props.selectedDate)
const root = ref<HTMLDivElement | null>(null)

const {
	calendar,
	nextMonthKey,
	showNextMonth,
	setRef,
	scrollToNextMonth
} = useCalendar({
	root,
	selectedDate
})

const t = useStore(calendarMessages)

let nextMonth = computed(
	() => t.value[MONTHS[nextMonthKey.value - 1]]
)

function selectDate (date: string): void {
	selectedDate.value = date
	emit('update:selectedDate', date)
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
