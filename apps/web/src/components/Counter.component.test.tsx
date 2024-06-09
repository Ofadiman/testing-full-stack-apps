import {
  COUNTER_DATA_CY,
  Counter,
  DEFAULT_DECREMENT_BY,
  DEFAULT_INCREMENT_BY,
  DEFAULT_INITIAL_COUNT,
} from './Counter.component'

const dataCy = (key: string) => `[data-cy="${key}"]`

describe('<Counter />', () => {
  it('should initialize counter with default count', () => {
    cy.mount(<Counter></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should('contain.text', DEFAULT_INITIAL_COUNT)
  })

  it('should initialize counter with count from props', () => {
    const initialCount = 10
    cy.mount(<Counter initialCount={initialCount}></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should('contain.text', initialCount)
  })

  it('should increment count by 1 by default', () => {
    cy.mount(<Counter></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.INCREMENT)).click()
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should(
      'contain.text',
      DEFAULT_INITIAL_COUNT + DEFAULT_INCREMENT_BY,
    )
  })

  it('should increment count by number passed in props', () => {
    const incrementBy = 5
    cy.mount(<Counter incrementBy={incrementBy}></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.INCREMENT)).click()
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should(
      'contain.text',
      DEFAULT_INITIAL_COUNT + incrementBy,
    )
  })

  it('should decrement count by 1 by default', () => {
    cy.mount(<Counter></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.DECREMENT)).click()
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should(
      'contain.text',
      DEFAULT_INITIAL_COUNT - DEFAULT_DECREMENT_BY,
    )
  })

  it('should decrement count by number passed in props', () => {
    const decrementBy = 5
    cy.mount(<Counter decrementBy={decrementBy}></Counter>)
    cy.get(dataCy(COUNTER_DATA_CY.DECREMENT)).click()
    cy.get(dataCy(COUNTER_DATA_CY.CURRENT_COUNT)).should(
      'contain.text',
      DEFAULT_INITIAL_COUNT - decrementBy,
    )
  })
})
