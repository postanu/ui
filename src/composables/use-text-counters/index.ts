import type { Ref } from 'vue'

import { parseTweet } from '@postanu/twitter-text'
import createHashtagRegex from 'hashtag-regex'
import { computed } from 'vue'

type UseTextCountersReturn = Ref<{
	text: number
	tags: number
}>

export const hashtagRegex: RegExp = createHashtagRegex()

export function useTextCounters (
	text: Ref<string>
): UseTextCountersReturn {
	return computed(() => {
		return {
			text: parseTweet(text.value).weightedLength,
			tags: text.value.match(hashtagRegex)?.length || 0
		}
	})
}
