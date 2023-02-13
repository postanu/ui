import {
	differenceInMonths,
	getWeekOfMonth,
	lastDayOfMonth,
	getDaysInMonth,
	startOfWeek,
	isWeekend,
	getMonth,
	isMonday,
	isSunday,
	isToday,
	getYear,
	getDate,
	setDate,
	subDays,
	isPast,
	getDay,
	sub,
	add
} from 'date-fns'

export interface CalendarDay extends LinearCalendarDay {
	isScheduled: boolean
	isAnotherMonth: boolean
}

export interface Calendar {
	[year: string]: {
		[month: string]: {
			weeks: {
				[week: string]: {
					[day: string]: CalendarDay
				}
			}
			isToday: boolean
			isHovered: boolean
			isSelected: boolean
		}
	}
}

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

export function createCalendar (
	selectedDate: number,
	options: {
		weekStartsOn: CalendarWeekStartsOn
	}
): Calendar {
	let { weekStartsOn } = options
	let calendar: Calendar = {}

	let now = Date.now()
	let todayYear = getYear(now)
	let todayMonth = getMonth(now)
	let isFirstWeek = true

	for (let year = todayYear; year <= todayYear + 2; year++) {
		let yearKey = year.toString()
		calendar[yearKey] = {}

		let firstMonthOfYear = 0
		if (year === todayYear) {
			firstMonthOfYear = todayMonth - 1
		}

		// if today year then loop from previous month else loop from Jan
		for (let month = firstMonthOfYear; month < 12; month++) {
			let monthKey = formatMonthKey(month)
			calendar[yearKey][monthKey] = {
				weeks: {},
				isToday: year === todayYear && month === todayMonth,
				isHovered: false,
				isSelected: false
			}

			/**
			 * Loop days of month.
			 * If it’s a first week of calendar then start from first monday
			 * else start from first day of last week of previous month
			 * or first day of month
			 */
			let day = 1
			if (isFirstWeek) {
				day = getFirstMondayOfMonth(year, month)
			} else {
				let firstDate = new Date(year, month, 1)
				let firstDayOfWeek = getDate(startOfWeek(firstDate, { weekStartsOn }))
				if (firstDayOfWeek !== 1) {
					let daysInMonth = getDaysInMonth(sub(firstDate, { months: 1 }))
					day -= daysInMonth - firstDayOfWeek + 1
				}
			}

			let lastFullWeekOfMonth = getLastFullWeekOfMonth(year, month, weekStartsOn)

			// loop weeks of month
			for (let week = 0; week < lastFullWeekOfMonth; week++) {
				// skip first week of calendar to start from monday
				if (isFirstWeek) {
					isFirstWeek = false
					continue
				}

				let weekKey = week.toString()
				calendar[yearKey][monthKey].weeks[weekKey] = {}

				// loop days of week
				for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
					let date = new Date(year, month, day).getTime()
					// let value = getDate(date)

					// console.log({ month, date: new Date(date).getMonth() })
					calendar[yearKey][monthKey].weeks[weekKey][dayNumber] = {
						day: getDay(date),
						date,
						// value,
						isPast: isPast(date + 24 * 60 * 60 * 1000),
						isToday: isToday(date),
						isWeekend: isWeekend(date),
						isSelected: date === selectedDate,
						isScheduled: false,
						isAnotherMonth: month !== new Date(date).getMonth()
					}
					day++
				}
			}
		}
	}

	return calendar
}

/**
 * Format month key to save object properties order
 * Update: use Map()
 */
export function formatMonthKey (number: number): string {
	return number < 10 ? `00${number}` : `0${number}`
}

/**
 * Get week of monday of month
 */
function getFirstMondayOfMonth (year: number, month: number): number {
	for (let day = 1; day < 8; day++) {
		if (isMonday(new Date(year, month, day))) {
			return day
		}
	}
	return 0
}

function lastSundayOfMonth (year: number, month: number): number {
	let lastDay = lastDayOfMonth(new Date(year, month, 1))
	for (let i = 0; i < 7; i++) {
		let day = subDays(lastDay, i)
		if (isSunday(day)) {
			return getDate(day)
		}
	}
	return 0
}

function getLastFullWeekOfMonth (
	year: number,
	month: number,
	weekStartsOn: CalendarWeekStartsOn
): number {
	let lastSunday = lastSundayOfMonth(year, month)
	let lastSundayDate = new Date(year, month, lastSunday)
	return getWeekOfMonth(lastSundayDate, { weekStartsOn })
}
