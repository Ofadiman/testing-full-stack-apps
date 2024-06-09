import { it, expect } from 'vitest'
import { subtract } from './subtract'

it('should subtract 2 numbers', () => {
  expect(subtract(3, 1)).toEqual(2)
})
