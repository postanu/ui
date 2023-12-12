import type { Attachment } from '@postanu/shared'

import { AttachmentType } from '@postanu/shared'
import { nanoid } from 'nanoid'

import { getRandomImage } from '../random/index.js'

export function generateAttachments (count: number): Attachment[] {
	return Array.from({ length: count }, (_, index) => {
		return {
			id: nanoid(),
			type: AttachmentType.image,
			filename: `${index}.png`,
			src: getRandomImage(),
			thumbnailUrl: getRandomImage()
		}
	})
}
