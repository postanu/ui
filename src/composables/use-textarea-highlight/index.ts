import type { Ref } from 'vue'

import { htmlEscape } from '@postanu/twitter-text'
// @ts-expect-error Need to fix types in @postanu/twitter-text
import { extractUrl } from '@postanu/twitter-text/regexp'
import createHashtagRegex from 'hashtag-regex'
import { ref, watch } from 'vue'

const hashtagRegex: RegExp = createHashtagRegex()

function highlight (text: string): string {
	let html = htmlEscape(text)
	return html
		// mark urls
		.replace(extractUrl, '<mark class="p-editor-text__url">$&</mark>')
		// replace unnecessary spaces in urls
		.replaceAll(
			'<mark class="p-editor-text__url"> ',
			' <mark class="p-editor-text__url">'
		)
		// backup apostrophes
		.replaceAll('&#39;', '__apostrophe__')
		// mark hashtags
		.replace(hashtagRegex, '<mark class="p-editor-text__hashtag">$&</mark>')
		// restore apostrophes
		.replaceAll('__apostrophe__', '&#39;')
		// cleanup line breaks
		.replaceAll(/\r\n|\r|\n$/g, '<br> ')
		.replaceAll(/\r\n|\r|\n/g, '<br>')
}

interface UseTextareaHighlightReturn {
	highlighted: Ref<string>
}

export function useTextareaHighlight (
	text: Ref<string>
): UseTextareaHighlightReturn {
	let highlighted = ref('')

	watch(
		text,
		() => {
			highlighted.value = highlight(text.value)
		},
		{ immediate: true, flush: 'sync' }
	)

	return {
		highlighted
	}
}
