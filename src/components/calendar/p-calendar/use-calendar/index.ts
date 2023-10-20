import type { ComputedRef, Ref } from 'vue'

import { computed, onMounted, ref } from 'vue'

import type {
	DatesListItem,
	MonthsList,
	YearsList
} from '../create-lists/index.js'
import type { UseVirtualListItem } from '../vs/index.js'

import { ITEM_WIDTH, SCROLL_OFFSET } from '../constants/index.js'
import { createLists } from '../create-lists/index.js'
import { fromISODate } from '../utils/index.js'
import { useVirtualList } from '../vs/index.js'

export interface UseCalendarReturn {
	containerProps: {
		ref: Ref<HTMLElement | null>
		onScroll: () => void
	}
	wrapperProps: ComputedRef<{
		style: {
			width: string
			marginLeft: string
		}
	}>
	datesList: Ref<Array<UseVirtualListItem<DatesListItem>>>
	monthsList: Ref<MonthsList>
	yearsList: Ref<YearsList>
	nextMonth: ComputedRef<{ month: number; year: number } | false>
	scrollToMonth: (month: number, year: number) => void
}

export function useCalendar (
	initialDate: Ref<string>
): UseCalendarReturn {
	let { dates, months, years } = createLists(fromISODate(initialDate.value))
	let datesList = ref(dates)
	let monthsList = ref<MonthsList>(months)
	let yearsList = ref<YearsList>(years)

	let vl = useVirtualList(
		datesList,
		{
			itemWidth: ITEM_WIDTH,
			overscan: 10
		}
	)

	let nextMonth = computed(() => {
		if (vl.list.value.length === 0) {
			return false
		} else if (
			vl.list.value.some(({ data }) => {
				return data.month === datesList.value.at(-1)!.month &&
					data.year === datesList.value.at(-1)!.year
			})
		) {
			return false
		} else {
			let index = Math.floor((vl.list.value.length / 2))
			return vl.list.value[index].data.month === 12
				? {
					month: 1,
					year: vl.list.value[index].data.year + 1
				}
				: {
					month: vl.list.value[index].data.month + 1,
					year: vl.list.value[index].data.year
				}
		}
	})

	function initialScroll (): void {
		vl.scrollTo(
			datesList.value.findIndex(({ key }) => key === initialDate.value),
			{
				behavior: 'instant',
				offset: SCROLL_OFFSET
			}
		)
	}

	onMounted(() => {
		initialScroll()
		setTimeout(initialScroll, 10) // thank you, Safari
	})

	function scrollToMonth (month: number, year: number): void {
		vl.scrollTo(
			datesList.value.findIndex(day => {
				return day.day === 1 && day.month === month && day.year === year
			}),
			{
				behavior: 'smooth',
				offset: SCROLL_OFFSET
			}
		)
	}

	return {
		containerProps: vl.containerProps,
		wrapperProps: vl.wrapperProps,
		datesList: vl.list,
		monthsList,
		yearsList,
		nextMonth,
		scrollToMonth
	}
}
