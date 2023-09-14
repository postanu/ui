import type { Attachment } from '@postanu/types'

import { nanoid } from 'nanoid'

import { getRandomImage } from '../random/index.js'

export function generateAttachments (count: number): Attachment[] {
	return Array.from({ length: count }, () => {
		return {
			id: nanoid(),
			postId: nanoid(),
			type: 'image',
			url: getRandomImage()
		}
	})
}
