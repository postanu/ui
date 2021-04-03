<template lang="pug">
.p-page-list-item-view
	p-icon(
		v-if="icon"
		:icon="icon"
	)
	p-avatar(
		:image="avatar"
		:letter="letter"
	)
	.p-page-list-item-view__fn {{ fullname }}
	.p-page-list-item-view__un.p-caption {{ username }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PAvatar from '../p-avatar/PAvatar.vue'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PPageListItem',
	components: {
		PAvatar,
		PIcon
	},
	props: {
		icon: {
			type: String,
			default: ''
		},
		avatar: {
			type: String,
			default: ''
		},
		letter: {
			type: String,
			required: true
		},
		fullname: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="stylus">
.p-page-list-item-view
	gap: 10px
	display: flex

.p-page-list-item-view__un
	color: var(--p-color-white-05)
	line-height: 1
	padding-top: 0.29rem
</style>
