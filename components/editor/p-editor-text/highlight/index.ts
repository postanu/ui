// @ts-ignore
import { extractUrl } from '@postanu/twitter-text/regexp'
// @ts-ignore
import createHashtagRegex from 'hashtag-regex'

import { escapeHtml } from '../escape-html/index.js'

export const hashtagRegex: RegExp = createHashtagRegex()

export function highlight (text: string): string {
	let html = escapeHtml(text)
	return html
		// mark urls
		.replace(extractUrl, '<mark class="p-editor-text__link">$&</mark>')
		// mark hashtags
		.replace(hashtagRegex, '<mark class="p-editor-text__tag">$&</mark>')
		// cleanup line breaks
		.replaceAll(/\r\n|\r|\n$/g, '<br> ')
		.replaceAll(/\r\n|\r|\n/g, '<br>')
}
