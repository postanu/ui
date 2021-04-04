import { PagesList, PageType } from '@postanu/types'
import { nanoid } from 'nanoid'

import { getRandomInRange, usernameFromName } from '../utils'

export function generatePages (count: number, networkTypes = 1): PagesList {
	// generate a limited number of network types
	let types = [...networks]
	let removeCount = types.length - networkTypes
	for (let index = 0; index < removeCount; index++) {
		types.splice(getRandomInRange(0, types.length - 1), 1)
	}

	// generate pages
	return Array.from({ length: count })
		.map(() => {
			let member = members[getRandomInRange(0, members.length - 1)]
			return {
				id: nanoid(),
				type: types[getRandomInRange(0, types.length - 1)],
				name: member.name,
				username: usernameFromName(member.name),
				avatar_url: member.avatar_url
			}
		})
}

export const networks: PageType[] = [
	'facebook',
	'instagram',
	'twitter',
	'vk'
]

export const discography = [
	'Portrait of an American Family (1994)',
	'Antichrist Superstar (1996)',
	'Mechanical Animals (1998)',
	'Holy Wood (In the Shadow of the Valley of Death) (2000)',
	'The Golden Age of Grotesque (2003)',
	'Eat Me, Drink Me (2007)',
	'The High End of Low (2009)',
	'Born Villain (2012)',
	'The Pale Emperor (2015)',
	'Heaven Upside Down (2017)',
	'We Are Chaos (2020)'
]

export const members = [
	{
		name: 'Marilyn Manson',
		years: '1989–present',
		type: 'Current',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Marilyn_Manson_-_Rock_am_Ring_2015-8713.jpg/700px-Marilyn_Manson_-_Rock_am_Ring_2015-8713.jpg'
	},
	{
		name: 'Paul Wiley',
		years: '2014–present',
		type: 'Current',
		avatar_url: ''
	},
	{
		name: 'Juan Alderete',
		years: '2017–present',
		type: 'Current',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Juan_Alderete.jpg/370px-Juan_Alderete.jpg'
	},
	{
		name: 'Brandon Pertzborn',
		years: '2019–present',
		type: 'Current',
		avatar_url: ''
	},
	{
		name: 'Daniel Fox',
		years: '2015–2017',
		type: 'Touring',
		avatar_url: ''
	},
	{
		name: 'Spencer Rollins',
		years: '2013',
		type: 'Touring',
		avatar_url: ''
	},
	{
		name: 'Jason Sutter',
		years: '2012–2013',
		type: 'Touring',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Jason_Sutter.jpg/600px-Jason_Sutter.jpg'
	},
	{
		name: 'Andy Gerold',
		years: '2009',
		type: 'Touring',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Andy_Gerold_01.jpg/800px-Andy_Gerold_01.jpg'
	},
	{
		name: 'Wes Borland',
		years: '2008–2009',
		type: 'Touring',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/13-06-09_RiP_Limp_Bizkit_Wes_Borland_5.JPG/600px-13-06-09_RiP_Limp_Bizkit_Wes_Borland_5.JPG'
	},
	{
		name: 'Rob Holliday',
		years: '2007–2008',
		type: 'Touring',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Rob_Holliday_with_Marilyn_Manson.jpg/1100px-Rob_Holliday_with_Marilyn_Manson.jpg'
	},
	{
		name: 'Mark Chaussee',
		years: '2004–2005',
		type: 'Touring',
		avatar_url: ''
	},
	{
		name: 'Tyler Bates',
		years: '2014–2018',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tyler_Bates_SDCC_2014.jpg/170px-Tyler_Bates_SDCC_2014.jpg'
	},
	{
		name: 'Gil Sharone',
		years: '2014–2019',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/The_Dillinger_Escape_Plan-35.jpg/1000px-The_Dillinger_Escape_Plan-35.jpg'
	},
	{
		name: 'Fred Sablan',
		years: '2010–2014',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Fred_Sablan_by_Bob_Rea.jpg/1000px-Fred_Sablan_by_Bob_Rea.jpg'
	},
	{
		name: 'Chris Vrenna',
		years: '2007–2011',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Chrisvrennadrums.jpg'
	},
	{
		name: 'Tim Sköld',
		years: '2002–2008',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Marilyn_Manson_Ljubljana_2007_%281%29.JPG/600px-Marilyn_Manson_Ljubljana_2007_%281%29.JPG'
	},
	{
		name: 'John 5',
		years: '1998–2004',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/20140615-133-Nova_Rock_2014-Rob_Zombie-John_5.JPG/1200px-20140615-133-Nova_Rock_2014-Rob_Zombie-John_5.JPG'
	},
	{
		name: 'Zim Zum',
		years: '1996–1998',
		type: 'Former',
		avatar_url: ''
	},
	{
		name: 'Ginger Fish',
		years: '1995–2011',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/20140615-131-Nova_Rock_2014-Rob_Zombie-Ginger_Fish.JPG/1400px-20140615-131-Nova_Rock_2014-Rob_Zombie-Ginger_Fish.JPG'
	},
	{
		name: 'Twiggy Ramirez',
		years: '1993–2002, 2008–2017',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/X_6f60bfc2.jpg'
	},
	{
		name: 'Sara Lee Lucas',
		years: '1991–1995',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Lucas_at_Masterlab_in_2008.jpg'
	},
	{
		name: 'Gidget Gein',
		years: '1990–1993',
		type: 'Former',
		avatar_url: ''
	},
	{
		name: 'Madonna Wayne Gacy',
		years: '1990–2007',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MadonnaWayneGacy-1995.jpg'
	},
	{
		name: 'Zsa Zsa Speck',
		years: '1990',
		type: 'Former',
		avatar_url: ''
	},
	{
		name: 'Olivia Newton Bundy',
		years: '1989–1990',
		type: 'Former',
		avatar_url: ''
	},
	{
		name: 'Daisy Berkowitz',
		years: '1989–1996',
		type: 'Former',
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Daisy_%22SMP%22_Berkowitz_and_THEE_PAUSE_of_The_Daisy_Kids.jpg'
	}
]
