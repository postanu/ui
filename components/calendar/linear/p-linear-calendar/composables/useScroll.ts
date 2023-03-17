import { nextTick, onMounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { UseIntersectionObserverOptions } from '@vueuse/core'
import type { Ref } from 'vue'

interface UseScrollReturn {
	onIntersectionObserver: () => [
		IntersectionObserverCallback,
		UseIntersectionObserverOptions
	]
	scrollToNextMonth: () => void
	showNextMonth: Ref<boolean>
	nextMonthId: Ref<string>
}

// one and a half of day
const SHIFT = 10 + 110 + 10 + 55

export const parseMonthId = (id: string): [number, number] => {
	// @ts-ignore
	return id.split(':').map(Number)
}

export function useScroll (
	root: Ref<HTMLDivElement | null>,
	selectedDate: Ref<number>
): UseScrollReturn {
	let date = new Date(selectedDate.value)
	let currentMonthId = ref(`${date.getMonth()}:${date.getFullYear()}`)
	let showNextMonth = ref(false)

	let switchMonth = (id: string): void => {
		showNextMonth.value = false
		currentMonthId.value = id
		nextTick(() => { showNextMonth.value = true })
	}

	function onIntersectionObserver (): [
		(cb: IntersectionObserverEntry[]) => void,
		UseIntersectionObserverOptions
	] {
		return [
			([{ isIntersecting, target }]): void => {
				let targetMonthId = (target as HTMLDivElement).dataset.monthId as string
				let [month, year] = parseMonthId(targetMonthId)
				let currentMonth = parseMonthId(currentMonthId.value)[0]
				if (isIntersecting) {
					let nextMonthId = targetMonthId
					if (month < currentMonth) {
						nextMonthId = `${month + 1}:${year}`
					}
					if (month !== currentMonth) {
						switchMonth(nextMonthId)
					}
				} else if (month === currentMonth) {
					switchMonth(`${month - 1}:${year}`)
				}
			},
			{ threshold: 1 }
		]
	}

	function scrollToNextMonth (): void {
		let [m, y] = parseMonthId(currentMonthId.value)
		let nextMonthId = m === 12 ? `1:${y + 1}` : `${m + 1}:${y}`
		let nextMonthEl = root.value?.querySelector(`[data-month-id="${nextMonthId}"]`)
		let coords = nextMonthEl?.getBoundingClientRect()
		if (coords) {
			root.value?.scrollTo({
				left: root.value.scrollLeft + coords.x - 20,
				behavior: 'smooth'
			})
		}
	}

	onMounted(() => {
		scrollTo(root, '.p-linear-calendar-day--today')
	})

	watch(selectedDate, async () => {
		await nextTick()
		scrollTo(root, '.p-linear-calendar-day--selected', true)
	})

	let timeoutId: ReturnType<typeof setTimeout> | undefined
	useEventListener(root, 'scroll', () => {
		timeoutId && clearTimeout(timeoutId)
		showNextMonth.value = false
		timeoutId = setTimeout(() => {
			showNextMonth.value = true
		}, 1000)
	})

	return {
		onIntersectionObserver,
		scrollToNextMonth,
		showNextMonth,
		nextMonthId: currentMonthId
	}
}

function scrollTo (
	root: Ref<HTMLDivElement | null>,
	selector: string,
	smooth?: boolean
): void {
	let el = root.value?.querySelector(selector)
	let left = root.value?.scrollLeft || 0
	let coords = el?.getBoundingClientRect()
	if (coords) {
		root.value?.scrollTo({
			top: 0,
			left: left + coords.x - SHIFT,
			behavior: smooth ? 'smooth' : 'auto'
		})
	}
}
