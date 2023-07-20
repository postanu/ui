// Stolen from
// https://github.com/twitter/twitter-text/blob/30e2430d90cff3b46393ea54caf511441983c260/js/src/htmlEscape.js#L1

const HTML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'>': '&gt;',
	'<': '&lt;',
	'"': '&quot;',
	'\'': '&#39;'
}

export function escapeHtml (text: string): string {
	return text.replaceAll(/["&'<>]/g, character => {
		return HTML_ENTITIES[character]
	})
}
