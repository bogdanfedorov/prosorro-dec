import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

describe('MessageComponent', () => {
    // Now mount the component and you have the wrapper
    const wrapper = mount(MessageComponent)

    test('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<p></p>')
    })
})
