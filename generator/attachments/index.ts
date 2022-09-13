import { nanoid } from 'nanoid'
import type { Attachment } from '@postanu/types'

import { getRandomImage } from '../random/index.js'

export function generateAttachments (count: number): Attachment[] {
	return Array.from({ length: count }, (): Attachment => {
		return {
			id: nanoid(),
			type: 'image',
			url: getRandomImage()
		}
	})
}
