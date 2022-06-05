<template lang="pug">
.p-page
	p-icon(
		v-if="icon"
		:icon="icon"
	)
	p-avatar(
		:image="avatar"
		:letter="fullname"
	)
	.p-page__fn {{ fullname }}
	.p-page__un.p-caption {{ username }}
</template>

<script lang="ts" setup>
import PAvatar from '../p-avatar/PAvatar.vue'
import PIcon from '../p-icon/PIcon.vue'
import type { icons } from '../../icons/index.js'

interface Props {
	icon?: keyof typeof icons
	avatar?: string
	fullname: string
	username: string
}

withDefaults(
	defineProps<Props>(),
	{
		icon: undefined,
		avatar: undefined
	}
)
</script>

<style lang="stylus">
.p-page
	display: flex
	gap: 10px
	cursor: default

.p-page__un
	padding-top: 0.07em
	color: var(--p-color-white-05)
</style>
