import { add, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'

import type { DayOfWeek } from '../utils/index.js'

import { FUTURE_YEARS, ITEM_WIDTH } from '../constants/index.js'
import { getDay, getDaysInMonth, isWeekend, toISODate } from '../utils/index.js'

export interface DatesListItem {
	key: string
	date: Date
	day: number
	month: number
	year: number
	dayOfWeek: DayOfWeek
	isWeekend: boolean
}

export type DatesList = DatesListItem[]

export interface MonthsListItem {
	key: string
	month: number
	year: number
	style: {
		width: string
	}
}

export type MonthsList = MonthsListItem[]

export interface YearsListItem {
	key: string
	year: number
	style: {
		width: string
	}
}

export type YearsList = YearsListItem[]

export interface CreateListsReturn {
	dates: DatesList
	months: MonthsList
	years: YearsList
}

export function createLists (initialDate: Date): CreateListsReturn {
	let startDate = new Date(2023, 0, 1)
	let endYear = initialDate.getFullYear() + FUTURE_YEARS
	let endDate = new Date(endYear, 11, 32) // XXXX-12-31

	let datesCount = differenceInDays(endDate, startDate)
	let monthsCount = differenceInMonths(endDate, startDate)
	let yearsCount = differenceInYears(endDate, startDate)

	let dates = Array.from<string, DatesListItem>(
		{ length: datesCount },
		(_, index) => {
			let date = add(startDate, { days: index + 1 }) // +1 because of 0 index
			let key = toISODate(date)
			let [year, month, day] = key.split('-').map(Number)
			let data: DatesListItem = {
				key,
				date,
				day,
				month,
				year,
				dayOfWeek: getDay(date),
				isWeekend: isWeekend(date)
			}

			return data
		}
	)

	let months = Array.from<string, MonthsListItem>(
		{ length: monthsCount },
		(_, index) => {
			let date = add(startDate, { months: index + 1 }) // +1 because of 0 index
			let key = toISODate(date)
			let [year, month] = key.split('-').map(Number)
			let daysInMonth = getDaysInMonth(year, month)
			return {
				key,
				month,
				year,
				style: {
					width: `${daysInMonth * ITEM_WIDTH}px`
				}
			}
		}
	)

	let years = Array.from<string, YearsListItem>(
		{ length: yearsCount },
		(_, index) => {
			let date = add(startDate, { years: index + 1 }) // +1 because of 0 index
			let key = toISODate(date)
			let [year] = key.split('-').map(Number)

			let width = 0
			for (let i = 0; i < 12; i++) {
				width += getDaysInMonth(year, i) * ITEM_WIDTH
			}

			return {
				key,
				year,
				style: {
					width: `${width}px`
				}
			}
		}
	)

	return {
		dates,
		months,
		years
	}
}
