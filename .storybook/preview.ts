import { Parameters } from '@storybook/vue3'

import '../styles/base.styl'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}
