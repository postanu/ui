import type { DeepReadonly, InjectionKey, Ref } from 'vue'

export const PRadioValueKey: InjectionKey<DeepReadonly<Ref<string>>> =
	process.env.NODE_ENV !== 'production'
		? Symbol('p-radio-value')
		// eslint-disable-next-line symbol-description
		: Symbol()

export const PRadioChangeKey: InjectionKey<(newValue: string) => void> =
	process.env.NODE_ENV !== 'production'
		? Symbol('p-radio-change')
		// eslint-disable-next-line symbol-description
		: Symbol()
