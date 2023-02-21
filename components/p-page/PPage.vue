<template lang="pug">
.p-page
	component(
		v-if="icon"
		:is="icon"
	)
	p-avatar(
		:image="avatar"
		:letter="fullname"
	)
	.p-page__fn {{ fullname }}
	.p-page__un.p-caption {{ username }}
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { NETWORKS_ORDER } from '@postanu/core'

import PAvatar from '../p-avatar/PAvatar.vue'

interface Props {
	icon?: typeof NETWORKS_ORDER[number]
	avatar?: string
	fullname: string
	username: string
}

const props = withDefaults(
	defineProps<Props>(),
	{
		icon: undefined,
		avatar: undefined
	}
)

const icon = computed(() => {
	return props.icon === undefined ? undefined : `p-icon-${props.icon}`
})
</script>

<style lang="sass">
.p-page
	display: flex
	gap: 10px
	cursor: default

.p-page__un
	padding-top: 0.07em
	color: var(--p-color-white-05)
</style>
