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

<script lang="ts">
import { defineComponent } from 'vue'

import PAvatar from '../p-avatar/PAvatar.vue'
import PIcon from '../p-icon/PIcon.vue'

export default defineComponent({
	name: 'PPage',
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
.p-page
	display: flex
	gap: 10px
	cursor: default

.p-page__un
	padding-top: 0.07em
	color: var(--p-color-white-05)
</style>
