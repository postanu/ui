<template lang="pug">
.p-page
	p-icon-network.p-page__icon(
		v-if="network"
		:network="network"
	)
	p-avatar(
		:image="avatar"
		:text="fullname"
	)
	.p-page__fullname {{ fullname }}
	p-caption.p-page__username {{ username }}
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/shared'

import PIconNetwork from '../icons/p-icon-network/PIconNetwork.vue'
import PAvatar from '../p-avatar/PAvatar.vue'
import PCaption from '../typography/p-caption/PCaption.vue'

interface Props {
	network?: PageNetwork
	avatar: null | string
	fullname: string
	username: null | string
}

defineProps<Props>()
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

.p-page__username
	padding-top: 0.07em
</style>
