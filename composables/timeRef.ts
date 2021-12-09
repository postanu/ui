import { computed, ref, watch } from 'vue'
import type { Refable } from '@postanu/types'
import type { Ref } from 'vue'

import { extendRef } from './extendRef'

type TimeElementRef = Refable<string> & {
	set: (value: string) => void
	increase: (value: number) => void
	decrease: (value: number) => void
}

export interface TimeRef {
	ampm: Ref<string | null> & { change: (value?: 'AM' | 'PM') => void }
	hours: TimeElementRef
	minutes: TimeElementRef
}

/**
 * @param timestamp Date in in milliseconds
 * @param locales Intl locales string
 * @param onChange Callback for changes
 * @returns Computed hours, minutes and ampm
 */
export function timeRef (
	timestamp: Ref<number>,
	locales: string | undefined,
	onChange: (value: number) => void
): TimeRef {
	let date = ref(timestamp.value)

	watch(timestamp, value => {
		if (date.value !== timestamp.value) {
			date.value = value
		}
	})

	watch(date, value => { onChange(value) })

	let limits = {
		hours: [0, 23],
		hours12: [1, 12],
		minutes: [0, 59]
	}

	let time = computed(() => {
		return new Intl.DateTimeFormat(
			locales,
			{ hour: '2-digit', minute: '2-digit' }
		).format(date.value)
	})
	let ampm = computed(() => time.value.split(' ')[1] || null)
	let hours = computed(() => time.value.split(' ')[0].split(':')[0])
	let minutes = computed(() => time.value.split(' ')[0].split(':')[1])

	let isMilitary = ampm.value

	let set = (type: 'hours' | 'minutes') =>
		(value: string | number): void => {
			let [from, to] = limits[type]
			let isHours = type === 'hours'
			if (isHours && !isMilitary) {
				[from, to] = type === 'hours' ? limits[`${type}12`] : limits.minutes
			}
			value = Number(value)
			if (value < from) value = from
			if (value > to) value = Number(value.toString().slice(1, 2))
			let newDate = new Date(date.value)
			isHours ? newDate.setHours(value) : newDate.setMinutes(value)
			date.value = newDate.getTime()
		}

	let add = (type: 'hours' | 'minutes') =>
		(value: number): void => {
			let [from, to] = limits[type]
			let isHours = type === 'hours'
			let newDate = new Date(date.value)
			value = Number(isHours ? newDate.getHours() : minutes.value) + value
			if (value < from) value = to
			if (value > to) value = from
			isHours ? newDate.setHours(value) : newDate.setMinutes(value)
			date.value = newDate.getTime()
		}

	let change = (value?: 'AM' | 'PM'): void => {
		let newDate = new Date(date.value)
		let currentHours = newDate.getHours()
		if (value) {
			if (ampm.value !== value) {
				if (value === 'AM') {
					newDate.setHours(currentHours - 12)
				} else {
					newDate.setHours(currentHours + 12)
				}
			}
		} else if (currentHours < 12) {
			newDate.setHours(currentHours + 12)
		} else if (currentHours > 12) {
			newDate.setHours(currentHours - 12)
		} else if (currentHours === 12) {
			newDate.setHours(0)
		}
		date.value = newDate.getTime()
	}

	return {
		ampm: extendRef(ampm, { change }),
		hours: extendRef(hours, {
			set: set('hours'),
			increase: add('hours'),
			decrease: (value: number) => {
				add('hours')(value * -1)
			}
		}),
		minutes: extendRef(minutes, {
			set: set('minutes'),
			increase: add('minutes'),
			decrease: (value: number) => {
				add('minutes')(value * -1)
			}
		})
	}
}
