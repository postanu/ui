import {
	getDaysInMonth,
	isWeekend,
	getMonth,
	getYear,
	getDate,
	getTime,
	setDate,
	isPast,
	getDay,
	sub,
	add
} from 'date-fns'

interface LinearCalendarDay {
	day: number
	date: number
	dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
	isPast: boolean
	isWeekend: boolean
}

interface LinearCalendarMonth {
	days: Map<number, LinearCalendarDay>
	// TODO: cleanup unnecessary
	isToday: boolean
	isHovered: boolean
	isSelected: boolean
}

type LinearCalendarYear<Nullable = true> = Map<
number,
Nullable extends true ? LinearCalendarMonth | null : LinearCalendarMonth
>
export type LinearCalendar<Nullable = true> = Map<number, LinearCalendarYear<Nullable>>

interface CreateLinearCalendarOptions {
	selectedDate: number
}

const FUTURE = 2
const PAST = 2

export function createLinearCalendar (options: CreateLinearCalendarOptions): {
	calendar: LinearCalendar
	addPastMonth: (calendar: LinearCalendar) => void
	addFutureMonth: (calendar: LinearCalendar) => void
	removePastMonth: (calendar: LinearCalendar) => void
	removeFutureMonth: (calendar: LinearCalendar) => void
} {
	let { selectedDate } = options
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
	let futureDate = monthsList[monthsList.length - 1]

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
	let month: LinearCalendarMonth = {
		days: new Map<number, LinearCalendarDay>(),
		isToday: false,
		isHovered: false,
		isSelected: false
	}

	let dates = Array.from(
		{ length: getDaysInMonth(monthDate) },
		(value, index) => setDate(monthDate, 1 + index)
	)

	for (let date of dates) {
		let day = getDate(date)
		month.days.set(
			day,
			{
				day,
				date: getTime(date),
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
