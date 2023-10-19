export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export function toISODate (date: Date): string {
	return date.toISOString().split('T')[0]
}

export function fromISODate (date: string): Date {
	return new Date(`${date}T00:00:00Z`)
}

export function getDaysInMonth (year: number, month: number): number {
	return new Date(year, month, 0).getDate()
}

export function isWeekend (date: Date): boolean {
	let day = getDay(date)
	return day === 0 || day === 6
}

export function getDay (date: Date): DayOfWeek {
	return date.getDay() as DayOfWeek
}
