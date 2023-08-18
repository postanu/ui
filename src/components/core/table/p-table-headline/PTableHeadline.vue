<template lang="pug">
p-headline.p-table-headline(:tag="tag")
	slot
</template>

<script lang="ts" setup>
import type {
	ALLOWED_TAGS
} from '../../typography/p-headline/allowed-tags/index.js'

import PHeadline from '../../typography/p-headline/PHeadline.vue'

defineProps<{
	tag: typeof ALLOWED_TAGS[number]
}>()
</script>

<style lang="sass">
.p-table-headline
	margin-left: 280px
	line-height: 50px
</style>
