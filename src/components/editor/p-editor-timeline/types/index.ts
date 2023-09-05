import type { NETWORKS_ORDER } from '@postanu/core'

export type AlertsListItem = {
	id: string
	type: 'error' | 'warning'
}

export type AlertsList = {
	[key in typeof NETWORKS_ORDER[number]]?: AlertsListItem[]
}

export interface ActivitiesAction {
	id: string
	type: string
	time: string
}

export interface ActivitiesMessage {
	id: string
	text: string
	time: string
}

export type ActivitiesStackedAction = {
	id: string
	type: 'action'
	userId: string
	list: ActivitiesAction[]
}

export type ActivitiesStackedMessage = {
	id: string
	type: 'message'
	userId: string
	list: ActivitiesMessage[]
}

export type ActivitiesListItem =
	| ActivitiesStackedAction
	| ActivitiesStackedMessage

export type ActivitiesList = ActivitiesListItem[]
