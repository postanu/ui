import type { ComputedRef, MaybeRef, Ref, ShallowRef } from 'vue'

import { useElementSize } from '@vueuse/core'
import { computed, ref, shallowRef, watch } from 'vue'

type UseVirtualListItemSize = ((index: number) => number) | number

export interface UseHorizontalVirtualListOptions extends UseVirtualListOptionsBase {

	/**
   * item width, accept a pixel value or a function that returns the width
   *
   * @default 0
   */
	itemWidth: UseVirtualListItemSize

}

export interface UseVirtualListOptionsBase {
	/**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
	overscan?: number
}

export type UseVirtualListOptions = UseHorizontalVirtualListOptions

export interface UseVirtualListItem<T> {
	data: T
	index: number
}

export interface UseVirtualListScrollToOptions {
	behavior?: ScrollBehavior
	offset?: number
}

export interface UseVirtualListReturn<T> {
	list: Ref<Array<UseVirtualListItem<T>>>
	scrollTo: (index: number, options?: UseVirtualListScrollToOptions) => void

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
}

export function useVirtualList<T> (list: MaybeRef<T[]>, options: UseVirtualListOptions): UseVirtualListReturn<T> {
	let {
		wrapperProps,
		scrollTo,
		calculateRange,
		currentList,
		containerRef
	} = useHorizontalVirtualList(options, list)

	return {
		list: currentList,
		scrollTo,
		containerProps: {
			ref: containerRef,
			onScroll: (): void => {
				calculateRange()
			}
		},
		wrapperProps
	}
}

type UseVirtualListContainerRef = Ref<HTMLElement | null>

interface UseVirtualElementSizes {
	width: Ref<number>
	height: Ref<number>
}

type UseVirtualListArray<T> = Array<UseVirtualListItem<T>>
type UseVirtualListRefArray<T> = Ref<UseVirtualListArray<T>>

type UseVirtualListSource<T> = Ref<T[]> | ShallowRef<T[]>

interface UseVirtualListState { start: number; end: number }

type RefState = Ref<UseVirtualListState>

interface UseVirtualListResources<T> {
	state: RefState
	source: UseVirtualListSource<T>
	currentList: UseVirtualListRefArray<T>
	size: UseVirtualElementSizes
	containerRef: UseVirtualListContainerRef
}

function useVirtualListResources<T> (list: MaybeRef<T[]>): UseVirtualListResources<T> {
	let containerRef = ref<HTMLElement | null>(null)
	let size = useElementSize(containerRef)

	let currentList: Ref<Array<UseVirtualListItem<T>>> = ref([])
	let source = shallowRef(list)

	let state: Ref<{ start: number; end: number }> = ref({ start: 0, end: 10 })

	return { state, source, currentList, size, containerRef }
}

function createGetViewCapacity<T> (state: UseVirtualListResources<T>['state'], source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
	return (containerSize: number): number => {
		if (typeof itemSize === 'number') {
			return Math.ceil(containerSize / itemSize)
		}

		let { start = 0 } = state.value
		let sum = 0
		let capacity = 0
		for (let i = start; i < source.value.length; i++) {
			let size = itemSize(i)
			sum += size
			capacity = i
			if (sum > containerSize) {
				break
			}
		}
		return capacity - start
	}
}

function createGetOffset<T> (source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
	return (scrollDirection: number): number => {
		if (typeof itemSize === 'number') {
			return Math.floor(scrollDirection / itemSize) + 1
		}

		let sum = 0
		let offset = 0

		for (let i = 0; i < source.value.length; i++) {
			let size = itemSize(i)
			sum += size
			if (sum >= scrollDirection) {
				offset = i
				break
			}
		}
		return offset + 1
	}
}

function createCalculateRange<T> (overscan: number, getOffset: ReturnType<typeof createGetOffset>, getViewCapacity: ReturnType<typeof createGetViewCapacity>, { containerRef, state, currentList, source }: UseVirtualListResources<T>) {
	return (): void => {
		let element = containerRef.value
		if (element) {
			let offset = getOffset(element.scrollLeft)
			let viewCapacity = getViewCapacity(element.clientWidth)

			let from = offset - overscan
			let to = offset + viewCapacity + overscan
			state.value = {
				start: from < 0 ? 0 : from,
				end: to > source.value.length
					? source.value.length
					: to
			}
			currentList.value = source.value
				.slice(state.value.start, state.value.end)
				.map((ele, index) => ({
					data: ele,
					index: index + state.value.start
				}))
		}
	}
}

function createGetDistance<T> (itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
	return (index: number): number => {
		if (typeof itemSize === 'number') {
			let size = index * itemSize
			return size
		}

		let size = source.value
			.slice(0, index)
			.reduce((sum, _, i) => sum + itemSize(i), 0)

		return size
	}
}

function useWatchForSizes<T> (size: UseVirtualElementSizes, list: MaybeRef<T[]>, calculateRange: () => void): void {
	watch([size.width, size.height, list], () => {
		calculateRange()
	})
}

function createComputedTotalSize<T> (itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']): ComputedRef<number> {
	return computed(() => {
		if (typeof itemSize === 'number') {
			return source.value.length * itemSize
		}

		return source.value.reduce((sum, _, index) => sum + itemSize(index), 0)
	})
}

function createScrollTo<T> (calculateRange: () => void, getDistance: ReturnType<typeof createGetDistance>, containerRef: UseVirtualListResources<T>['containerRef']) {
	return (index: number, options?: UseVirtualListScrollToOptions): void => {
		if (containerRef.value) {
			// containerRef.value.scrollLeft = getDistance(index) + options.offset
			containerRef.value.scrollTo({
				left: getDistance(index) + (options?.offset || 0),
				behavior: options?.behavior || 'smooth'
			})
			calculateRange()
		}
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useHorizontalVirtualList<T> (options: UseHorizontalVirtualListOptions, list: MaybeRef<T[]>) {
	let { itemWidth, overscan = 5 } = options

	let resources = useVirtualListResources(list)
	let { state, source, currentList, size, containerRef } = resources

	let getViewCapacity = createGetViewCapacity(state, source, itemWidth)

	let getOffset = createGetOffset(source, itemWidth)

	let calculateRange = createCalculateRange(overscan, getOffset, getViewCapacity, resources)

	let getDistanceLeft = createGetDistance(itemWidth, source)

	let offsetLeft = computed(() => getDistanceLeft(state.value.start))

	let totalWidth = createComputedTotalSize(itemWidth, source)

	useWatchForSizes(size, list, calculateRange)

	let scrollTo = createScrollTo(calculateRange, getDistanceLeft, containerRef)

	let wrapperProps = computed(() => {
		return {
			style: {
				width: `${totalWidth.value - offsetLeft.value}px`,
				marginLeft: `${offsetLeft.value}px`
			}
		}
	})

	return {
		scrollTo,
		calculateRange,
		wrapperProps,
		currentList,
		containerRef
	}
}
