import { nanoid } from 'nanoid'
import type { PagesList, Page } from '@postanu/types'

import { getRandomInRange, usernameFromName } from '../../utils'
import { networks, members } from '../data'

export function generatePages (
	count: number,
	networkTypes = 1,
	updatables = 0
): PagesList {
	// generate a limited number of network types
	let types = [...networks]
	let removeCount = types.length - networkTypes
	for (let index = 0; index < removeCount; index++) {
		types.splice(getRandomInRange(0, types.length - 1), 1)
	}

	let updatableCount = 0

	function getStatus (): 100 | 200 {
		if (updatableCount < updatables) {
			updatableCount++
			return 200
		}
		return 100
	}

	return Array.from({ length: count }, (): Page => {
		let member = members[getRandomInRange(0, members.length - 1)]
		return {
			id: nanoid(),
			projectId: 'project-666',
			name: member.name,
			network: types[getRandomInRange(0, types.length - 1)],
			username: usernameFromName(member.name),
			avatarUrl: member.avatarUrl,
			status: getStatus()
		}
	})
}
