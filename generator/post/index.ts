import type { Attachment, Page, PostState } from '@postanu/types'

import { nanoid } from 'nanoid'

import type { GeneratedUser } from '../user/index.js'

import {
	generateAttachments,
	generatePages,
	generateUsers,
	getRandomSentence,
	getRandomTime,
	networks,
	randomInRange
} from '..'

interface GeneratedPost {
	id: string
	time: string
	pages: Page[]
	title: string
	attachments: Attachment[]
	state: PostState
	editors: GeneratedUser[]
}

export function generatePosts (count: number): GeneratedPost[] {
	let projectPagesPattern = Array.from<unknown, [number]>(
		{ length: networks.length - 1 },
		(item, index) => [index]
	)
	let projectPages = generatePages(projectPagesPattern)

	return Array.from<unknown, GeneratedPost>({ length: count }, () => {
		let title = getRandomSentence()
		let attachments = generateAttachments(randomInRange(0, 12))
		return {
			id: nanoid(),
			time: getRandomTime(),
			pages: selectPostPages(projectPages),
			title,
			attachments,
			state: 100,
			editors: generateUsers(randomInRange(0, 3))
		}
	})
}

function selectPostPages (projectPages: Page[]): Page[] {
	let pages = [...projectPages]
	let counter = randomInRange(1, pages.length - 1)
	let selected: Page[] = []
	while (counter !== 0) {
		let index = randomInRange(0, pages.length - 1)
		selected.push(pages[index])
		pages.splice(index, 1)
		counter--
	}
	return selected
}
