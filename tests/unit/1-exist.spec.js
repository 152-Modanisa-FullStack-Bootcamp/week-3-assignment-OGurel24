import {createLocalVue, mount} from '@vue/test-utils'
import App from "../../src/App";
import store from "../../src/store";
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(Vuex)

describe('1- Counter component exist', function () {
    it('Existency check for counter component', function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'}) // => finds Bar by `name`
        expect(Counter.exists()).toBe(true)
    })
})

describe('2- Counter component exist', function () {
    it('Existency check for counter component', function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'}) // => finds Bar by `name`
        const decreaseButton = Counter.findAll('.decrease')
        expect(decreaseButton.exists()).toBe(true)
    })
})

describe('2- Counter component exist', function () {
    it('Existency check for counter component', function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'}) // => finds Bar by `name`
        const decreaseButton = Counter.findAll('.increase')
        expect(decreaseButton.exists()).toBe(true)
    })
})