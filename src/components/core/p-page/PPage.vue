<template lang="pug">
.p-page
	component.p-page__icon(
		:is="icon"
		v-if="icon"
	)
	p-avatar(
		:image="avatar"
		:letter="fullname"
	)
	.p-page__fn {{ fullname }}
	.p-page__un.p-caption {{ username }}
</template>

<script lang="ts" setup>
import type { NETWORKS_ORDER } from '@postanu/core'

import { computed } from 'vue'

import PAvatar from '../p-avatar/PAvatar.vue'

interface Props {
	icon?: typeof NETWORKS_ORDER[number]
	avatar: null | string
	fullname: string
	username: null | string
}

const props = withDefaults(
	defineProps<Props>(),
	{
		icon: undefined,
		avatar: null,
		username: null
	}
)

const icon = computed(() => {
	return props.icon === undefined ? undefined : `p-icon-${props.icon}`
})
</script>

<style lang="sass">
.p-page
	--p-page-show-icon: 1

	display: flex
	gap: 10px
	cursor: default

.p-page__icon
	opacity: var(--p-page-show-icon)
	transition: opacity 0.05s ease-in

.p-page__un
	padding-top: 0.07em
	color: var(--p-color-white-05)
</style>
