<template lang="pug">
component.test(:is="icon")
</template>

<script lang="ts" setup>
import type { PageNetwork } from '@postanu/types'

import { computed } from 'vue'

import {
	PIconFacebook,
	PIconInstagram,
	PIconLinkedIn,
	PIconPinterest,
	PIconTelegram,
	PIconThreads,
	PIconTwitter,
	PIconVK,
	PIconYouTube
} from '../index.js'

interface Props {
	network: PageNetwork
}

const props = defineProps<Props>()

const icon = computed(
	() => ({
		facebook: PIconFacebook,
		instagram: PIconInstagram,
		linkedin: PIconLinkedIn,
		pinterest: PIconPinterest,
		telegram: PIconTelegram,
		threads: PIconThreads,
		twitter: PIconTwitter,
		vk: PIconVK,
		youtube: PIconYouTube
	}[props.network])
)
</script>
