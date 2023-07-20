import {
	add,
	getDate,
	getDay,
	getDaysInMonth,
	getMonth,
	getYear,
	isPast,
	isWeekend,
	setDate,
	sub
} from 'date-fns'

export interface LinearCalendarDay {
	day: number
	date: string
	dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
	isPast: boolean
	isWeekend: boolean
}

type LinearCalendarMonth = Map<number, LinearCalendarDay>

type LinearCalendarYear<IsNullable = true> =
Map<
number,
IsNullable extends true ? LinearCalendarMonth | null : LinearCalendarMonth
>

export type LinearCalendar<IsNullable = true> = Map<number, LinearCalendarYear<IsNullable>>

interface CreateLinearCalendarOptions {
	selectedDate: string
}

interface CreateLinearCalendarReturn {
	calendar: LinearCalendar
	addPastMonth: (calendar: LinearCalendar) => void
	addFutureMonth: (calendar: LinearCalendar) => void
	removePastMonth: (calendar: LinearCalendar) => void
	removeFutureMonth: (calendar: LinearCalendar) => void
}

const FUTURE = 6
const PAST = 6

export function createLinearCalendar (
	options: CreateLinearCalendarOptions
): CreateLinearCalendarReturn {
	let selectedDate = new Date(`${options.selectedDate}T00:00:00Z`)
	let calendar: LinearCalendar = new Map()

	let currentYear = getYear(selectedDate)
	for (let i = 3; i >= 0; i--) {
		calendar.set(
			currentYear - i,
			new Map(
				Array.from({ length: 12 }, (value, index) => [index + 1, null])
			)
		)
	}

	let startDate = sub(selectedDate, { months: PAST })

	let monthsList = Array.from(
		{ length: PAST + 1 + FUTURE },
		(value, index) => add(startDate, { months: index })
	)

	let pastDate = monthsList[0]
	let futureDate = monthsList.at(-1)!

	for (let monthDate of monthsList) {
		addMonth(calendar, monthDate)
	}

	function addPastMonth (object: LinearCalendar): void {
		pastDate = sub(pastDate, { months: 1 })
		addMonth(object, pastDate)
	}

	function addFutureMonth (object: LinearCalendar): void {
		futureDate = add(futureDate, { months: 1 })
		addMonth(object, futureDate)
	}

	function removePastMonth (object: LinearCalendar): void {
		removeMonth(object, pastDate)
		pastDate = add(pastDate, { months: 1 })
	}

	function removeFutureMonth (object: LinearCalendar): void {
		removeMonth(object, futureDate)
		futureDate = sub(futureDate, { months: 1 })
	}

	return {
		calendar,
		addPastMonth,
		addFutureMonth,
		removePastMonth,
		removeFutureMonth
	}
}

function createMonth (monthDate: Date): LinearCalendarMonth {
	let month: LinearCalendarMonth = new Map<number, LinearCalendarDay>()

	let dates = Array.from(
		{ length: getDaysInMonth(monthDate) },
		(value, index) => setDate(monthDate, 1 + index)
	)

	for (let date of dates) {
		let day = getDate(date)
		month.set(
			day,
			{
				day,
				date: getISODate(date),
				dayOfWeek: getDay(date),
				isPast: isPast(date),
				isWeekend: isWeekend(date)
			}
		)
	}

	return month
}

function addMonth (
	calendar: LinearCalendar,
	monthDate: Date
): void {
	let month = createMonth(monthDate)
	let yearKey = getYear(monthDate)
	let monthKey = getMonth(monthDate) + 1

	let year = calendar.get(yearKey)
	if (year) {
		year.set(monthKey, month)
	} else {
		let months = new Map()
		months.set(monthKey, month)
		calendar.set(yearKey, months)
	}
}

function removeMonth (
	calendar: LinearCalendar,
	monthDate: Date
): void {
	let yearKey = getYear(monthDate)
	let monthKey = getMonth(monthDate) + 1

	let year = calendar.get(yearKey)
	if (year) {
		year.set(monthKey, null)
	}
}

function getISODate (date: Date): string {
	return date.toISOString().split('T')[0]
}
