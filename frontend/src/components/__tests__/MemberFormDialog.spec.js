import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MemberFormDialog from '../MemberFormDialog.vue'

describe('MemberFormDialog.vue Test', () => {
  it('renders header with no inputs', () => {
    // render the component
    const wrapper = shallowMount(MemberFormDialog, {
      propsData: {
        header: 'Astro',
        submitText: 'Gör det',
        errorText: null,
        member: {
          personNum: null,
          firstName: null,
          lastName: null,
          endDate: null
        }
      }
    })

    expect(wrapper.find('h2').text()).toMatch('Astro')
    expect(wrapper.find('input[type=submit]').element.value).toMatch('Gör det')
    expect(wrapper.find('.error-text').text()).toMatch('')
  })

  it('renders with inputs and no error', () => {
    // render the component
    const wrapper = shallowMount(MemberFormDialog, {
      propsData: {
        idStart: 'test',
        errorText: null,
        member: {
          personNum: '20062484753',
          firstName: "John",
          lastName: "Doe",
          endDate: "2023-12-11"
        },
        sending: false
      }
    })

    expect(wrapper.find('#test-personnummer-input').element.value).toBe('20062484753')
    expect(wrapper.find('#test-first-name-input').element.value).toBe('John')
    expect(wrapper.find('#test-last-name-input').element.value).toBe('Doe')
    expect(wrapper.find('#test-date-input').element.value).toBe('2023-12-11')
    expect(wrapper.find('.error-text').text()).toMatch('')
  })

  it('renders sending animation div', () => {
    // render the component
    const wrapper = shallowMount(MemberFormDialog, {
      propsData: {
        sending: true
      }
    })

    expect(wrapper.find('.sending')).toBeDefined()
  })
})
