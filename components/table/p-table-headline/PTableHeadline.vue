<template lang="pug">
p-heading.p-table-headline(
	:tag="tag"
	:headline="true"
)
	slot
</template>

<script lang="ts" setup>
import PHeading from '../../p-heading/PHeading.vue'
import type { ALLOWED_TAGS } from '../../p-heading/allowed-tags/index.js'

defineProps<{
	tag: typeof ALLOWED_TAGS[number]
}>()
</script>

<style lang="sass">
.p-table-headline
	margin-left: 280px
	line-height: 50px
</style>
