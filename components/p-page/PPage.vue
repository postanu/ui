<template lang="pug">
.p-page(
	:class="{ 'p-page--hoverable': hoverable }"
)
	p-icon(
		v-if="icon"
		:icon="icon"
	)
	p-avatar(
		:image="avatar"
		:letter="letter"
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
		},
		hoverable: {
			type: Boolean,
			default: false
		}
	}
})
</script>

<style lang="stylus">
.p-page
	gap: 10px
	display: inline-flex
	cursor: default

.p-page--hoverable
	padding: 10px
	border-radius: 7.5px
	cursor: pointer

	&:hover
		background: var(--p-color-white-01)

.p-page__un
	color: var(--p-color-white-05)
	padding-top: 0.07em
</style>
