import type { ClientPage, Page } from '@postanu/types'

import { nanoid } from 'nanoid'

import { members, networks } from '../data/index.js'
import { randomInRange, usernameFromName } from '../utils/index.js'

interface GeneratePagesOptions {
	updatables?: number
}

/**
 * @param pattern Array in which arrays are groups
 *   and an element is a page count. Zero is random.
 */
export function generatePages (
	pattern: Array<[number]>,
	options: GeneratePagesOptions = {}
): ClientPage[] {
	let groupsCount = pattern.length
	let updatables = options.updatables
	let data = {
		members: [...members],
		networks: [...networks]
	}

	let getRandomData = <
		K extends 'members' | 'networks'
	>(key: K): typeof data[K][0] => {
		let index = randomInRange(0, data[key].length - 1)
		let entry = data[key][index]
		data[key].splice(index, 1)
		return entry
	}

	let groups = Array.from<Page[], Page[]>(
		{ length: groupsCount },
		(group, index) => {
			let [pagesCount] = pattern[index]
			let network = getRandomData('networks')
			let isSolo = pagesCount === 1

			if (pagesCount === 0) {
				pagesCount = randomInRange(2, 6) // think about pages max count
			}

			return Array.from<Page, Page>({ length: pagesCount }, () => {
				let { name, avatar } = getRandomData('members')
				return {
					id: nanoid(),
					projectId: `project-${nanoid()}`,
					name,
					network,
					username: usernameFromName(name),
					avatar,
					status: 100,
					isSolo
				}
			})
		}
	)

	let list = groups.flat(2)

	if (updatables) {
		let counter = updatables
		while (counter !== 0) {
			let index = randomInRange(0, list.length - 1)
			if (list[index].status !== 200) {
				list[index].status = 200
				counter--
			}
		}
	}

	// @ts-ignore
	return list
}
