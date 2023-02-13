import {
	differenceInMonths,
	getDaysInMonth,
	isWeekend,
	getMonth,
	isToday,
	getYear,
	getDate,
	setDate,
	isPast,
	getDay,
	sub,
	add
} from 'date-fns'

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface LinearCalendarDay {
	day: number
	date: number
	isPast: boolean
	isToday: boolean
	isWeekend: boolean
	isSelected: boolean
}

export interface LinearCalendarMonth {
	days: Map<number, LinearCalendarDay>
	isToday: boolean
	isHovered: boolean
	isSelected: boolean
}

export type LinearCalendarYear = Map<number, LinearCalendarMonth>
export type LinearCalendar = Map<number, LinearCalendarYear>

interface CreateLinearCalendarOptions {
	selectedDate: number
	subMonths: number
	addMonths: number
}

export function createLinearCalendar (options: CreateLinearCalendarOptions): LinearCalendar {
	let { selectedDate, subMonths, addMonths } = options
	let calendar: LinearCalendar = new Map()

	let startDate = sub(selectedDate, { months: subMonths })
	let endDate = add(selectedDate, { months: addMonths })

	let monthsList = Array.from(
		{ length: differenceInMonths(endDate, startDate) },
		(value, index) => add(startDate, { months: index })
	)

	for (let monthDate of monthsList) {
		let month: LinearCalendarMonth = {
			days: new Map<number, LinearCalendarDay>(),
			isToday: false,
			isHovered: false,
			isSelected: false
		}
		let yearKey = getYear(monthDate)
		let monthKey = getMonth(monthDate) + 1

		let days = Array.from(
			{ length: getDaysInMonth(monthDate) },
			(value, index) => setDate(monthDate, 1 + index)
		)

		for (let date of days) {
			let dateOfMonth = getDate(date)
			month.days.set(
				dateOfMonth,
				{
					day: getDay(date),
					date: dateOfMonth,
					isPast: isPast(date),
					isToday: isToday(date),
					isWeekend: isWeekend(date),
					// todo
					isSelected: date.getTime() === selectedDate
				}
			)
		}

		let year = calendar.get(yearKey)
		if (year) {
			calendar.set(yearKey, year.set(monthKey, month))
		} else {
			let months = new Map()
			months.set(monthKey, month)
			calendar.set(yearKey, months)
		}
	}

	return calendar
}
