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

describe('2- Counter component decrease button existency', function () {
    it('Existency check for counter component decrease button', function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'}) // => finds Bar by `name`
        const decreaseButton = Counter.findAll('.decrease')
        expect(decreaseButton.exists()).toBe(true)
    })
})

describe('3- Counter component increase button existency', function () {
    it('Existency check for counter component increase button', function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'}) // => finds Bar by `name`
        const decreaseButton = Counter.findAll('.increase')
        expect(decreaseButton.exists()).toBe(true)
    })
})

describe('4- Counter component decrease button functionality', function () {
    it('Decrease button functionality check for counter component', async function () {
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'})
        const counter = Counter.find('.counter')
        expect(counter.text()).toBe('0k')


        const decreaseButton = Counter.findAll('.decrease')
        await decreaseButton.trigger('click')

        expect(counter.text()).toBe('-1k')
    })
})

describe('5- Counter component increase button functionality', function () {
    it('Decrease button functionality check for counter component', async function () {
        store.replaceState({count: 0})
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'})
        const counter = Counter.find('.counter')
        expect(counter.text()).toBe('0k')


        const increaseButton = Counter.findAll('.increase')
        await increaseButton.trigger('click')

        expect(counter.text()).toBe('1k')
    })
})

describe('6- 2 Increase 1 decrease sequentially', function () {
    it('Use increase and decrease sequentially', async function () {
        store.replaceState({count: 0})
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'})
        const counter = Counter.find('.counter')

        const decreaseButton = Counter.findAll('.decrease')
        const increaseButton = Counter.findAll('.increase')

        await increaseButton.trigger('click')
        await increaseButton.trigger('click')
        await decreaseButton.trigger('click')


        expect(counter.text()).toBe('1k')
    })
})

describe('7- Count text visual test', function () {
    it('Check classes according to counts', async function () {
        store.replaceState({count: 0})
        const wrapper = mount(App, {localVue, store})
        const Counter = wrapper.findComponent({name: 'Counter'})
        const decreaseButton = Counter.findAll('.decrease')
        const increaseButton = Counter.findAll('.increase')


        const notificationArea = wrapper.find('.notificationArea')
        const classes = notificationArea.classes()
        expect(notificationArea.classes()).toContain('safe')

        for (let i = 0; i < 4; i++) {
            await increaseButton.trigger('click')
            expect(notificationArea.classes()).toContain('safe')
        }

        for (let i = 0; i < 5; i++) {
            await increaseButton.trigger('click')
            expect(notificationArea.classes()).toContain('normal')
        }

        for (let i = 0; i < 100; i++) {
            await increaseButton.trigger('click')
            expect(notificationArea.classes()).toContain('danger')
        }

    })
})