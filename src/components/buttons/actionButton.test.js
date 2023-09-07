import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionButton from './ActionButton.vue';

describe('ActionButton', () => {
    const wrapper = mount(ActionButton)

    test('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<button style="" class="bg-blue-600 rounded-md p-2 text-white ml-5"></button>')
    })

})
