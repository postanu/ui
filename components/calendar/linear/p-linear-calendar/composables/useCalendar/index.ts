import { computed, nextTick, onBeforeUpdate, onMounted, reactive, ref } from 'vue'
import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import type { Ref, ComputedRef, VNodeRef } from 'vue'

import type { LinearCalendar } from '../../../../create-calendar/index.js'
import { createLinearCalendar } from '../../../../create-calendar/index.js'

interface UseCalendarOptions {
	root: Ref<HTMLElement | null>
	selectedDate: Ref<number>
}

interface UseCalendarReturn {
	calendar: ComputedRef<LinearCalendar<false>>
	nextMonthKey: Ref<number>
	showNextMonth: Ref<boolean>
	setRef: (
		yearKey: number,
		monthKey: number
	) => VNodeRef
	scrollToNextMonth: () => Promise<void>
}

type MonthRef = HTMLDivElement | null
type MonthDisconnectObserver = (() => void) | null
type MonthList = Array<{
	year: number
	month: number
	ref: MonthRef
	disconnectObserver: MonthDisconnectObserver
}>

// one and a half of day
const SHIFT = 10 + 110 + 10 + 55

export function useCalendar (options: UseCalendarOptions): UseCalendarReturn {
	let { root, selectedDate } = options
	let {
		calendar,
		addPastMonth,
		addFutureMonth,
		removePastMonth,
		removeFutureMonth
	} = reactive(
		createLinearCalendar({
			selectedDate: selectedDate.value
		})
	)

	onMounted(() => {
		scrollTo(root, '.p-linear-calendar-day--today')
	})

	let timeoutId: ReturnType<typeof setTimeout> | undefined
	let currentMonth = new Date(selectedDate.value).getMonth()
	let nextMonthKey = ref<number>(
		currentMonth + 2 === 12 ? 1 : currentMonth + 2
	)
	let showNextMonth = ref(false)

	useEventListener(root, 'scroll', () => {
		timeoutId && clearTimeout(timeoutId)
		showNextMonth.value = false
		timeoutId = setTimeout(() => {
			showNextMonth.value = true
		}, 200)
	})

	let monthList: MonthList = []

	onBeforeUpdate(() => {
		monthList.forEach(month => {
			month.disconnectObserver?.()
		})
		monthList = []
	})

	function setRef (
		yearKey: number,
		monthKey: number
	): VNodeRef {
		// @ts-ignore
		return (el: HTMLDivElement | null): void => {
			if (el === null) return
			setMonthRef(el, yearKey, monthKey)
		}
	}

	function setMonthRef (
		el: HTMLDivElement,
		yearKey: number,
		monthKey: number
	): void {
		let index = monthList.push({
			ref: el,
			year: yearKey,
			month: monthKey,
			disconnectObserver: null
		})
		let { stop } = useIntersectionObserver(
			monthList[index - 1].ref,
			([{ isIntersecting }]) => {
				if (isIntersecting) {
					switch (index) {
						case 1: {
							stop()
							extend('past')
							break
						}
						case 2: {
							let next = monthKey + 2
							if (next > 12) next = next - 12
							changeNextMonth(next)
							break
						}
						case 4: {
							let next = monthKey + 1
							if (next === 12) next = 1
							changeNextMonth(next)
							break
						}
						case 5: {
							stop()
							extend('future')
							break
						}
					}
				} else if (nextMonthKey.value - monthKey === 1) {
					changeNextMonth(monthKey)
				}
			},
			{
				threshold: 0.01
			}
		)
		monthList[index - 1].disconnectObserver = stop
	}

	async function changeNextMonth (monthKey: number): Promise<void> {
		showNextMonth.value = false
		nextMonthKey.value = monthKey
		await nextTick()
		showNextMonth.value = true
	}

	async function scrollToNextMonth (): Promise<void> {
		let nextMonth = monthList.find(
			month => month.month === nextMonthKey.value
		)
		if (nextMonth?.ref) {
			await scrollTo(root, nextMonth.ref, true)
			extend('future')
		}
	}

	async function extend (time: 'past' | 'future'): Promise<void> {
		if (!root.value) return
		let isPast = time === 'past'

		let initialScrollWidth = root.value.scrollWidth
		let initialScrollLeft = root.value.scrollLeft
		isPast ? addPastMonth(calendar) : removePastMonth(calendar)

		await nextTick()
		root.value.scrollLeft =
			initialScrollLeft - (initialScrollWidth - root.value.scrollWidth)

		isPast ? removeFutureMonth(calendar) : addFutureMonth(calendar)
	}

	let calendarWithoutEmpties = computed(() => {
		let yearsWithoutEmpties = new Map()
		for (let [yearKey, year] of calendar) {
			let monthsWithoutEmpties = new Map()
			for (let [monthKey, month] of year) {
				if (month !== null) {
					monthsWithoutEmpties.set(monthKey, month)
				}
			}
			if (monthsWithoutEmpties.size > 0) {
				yearsWithoutEmpties.set(yearKey, monthsWithoutEmpties)
			}
		}
		return yearsWithoutEmpties
	})

	return {
		calendar: calendarWithoutEmpties,
		nextMonthKey,
		showNextMonth,
		setRef,
		scrollToNextMonth
	}
}

function scrollTo (
	root: Ref<HTMLElement | null>,
	to: string | HTMLElement,
	smooth = false
): Promise<void> {
	return new Promise(resolve => {
		if (!root.value) {
			resolve()
			return
		}

		let el = typeof to === 'string' ? root.value.querySelector(to) : to
		if (!el) {
			resolve()
			return
		}

		let timeoutId: ReturnType<typeof setTimeout> | undefined
		let scrollLeft = root.value.scrollLeft
		let coordinates = el.getBoundingClientRect()
		let targetPosition = scrollLeft + coordinates.x - SHIFT
		let scrollHandler = (): void => {
			if (root.value?.scrollLeft === targetPosition) {
				root.value.removeEventListener('scroll', scrollHandler)
				clearTimeout(timeoutId)
				resolve()
			}
		}

		root.value.addEventListener('scroll', scrollHandler)

		timeoutId = setTimeout(() => {
			root.value?.removeEventListener('scroll', scrollHandler)
			resolve()
		}, 1000)

		root.value.scrollTo({
			top: 0,
			left: targetPosition,
			behavior: smooth ? 'smooth' : 'auto'
		})
	})
}
