import type { DeepReadonly, InjectionKey, Ref } from 'vue'

export const PRadioValueKey: InjectionKey<DeepReadonly<Ref<string>>> =
	Symbol('p-radio-value')

export const PRadioChangeKey: InjectionKey<(newValue: string) => void> =
	Symbol('p-radio-change')
