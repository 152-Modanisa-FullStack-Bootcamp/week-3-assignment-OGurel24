import {createLocalVue, mount} from '@vue/test-utils'
import App from "../../src/App";
import store from "../../src/store";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

function beforeEach() {
    const wrapper = mount(App, {localVue, store})
    const Counter = wrapper.findComponent({name: 'Counter'})
    const counter = Counter.find('.counter')
    const decreaseButton = Counter.findAll('.decrease')
    const increaseButton = Counter.findAll('.increase')
    store.replaceState({count: 0})

    return {wrapper, Counter, counter, decreaseButton, increaseButton};
}

const {wrapper, Counter, counter, decreaseButton, increaseButton} = beforeEach()

describe('1- Counter component exist', function () {
    it('Existency check for counter component', function () {
        expect(Counter.exists()).toBe(true)
    })
})

describe('2- Counter component decrease button existency', function () {
    it('Existency check for counter component decrease button', function () {
        expect(decreaseButton.exists()).toBe(true)
    })
})

describe('3- Counter component increase button existency', function () {
    it('Existency check for counter component increase button', function () {
        expect(decreaseButton.exists()).toBe(true)
    })
})

describe('4- Counter component decrease button functionality', function () {
    it('Decrease button functionality check for counter component', async function () {
        expect(counter.text()).toBe('0k')
        await decreaseButton.trigger('click')
        expect(counter.text()).toBe('-1k')
    })
})

describe('5- Counter component increase button functionality', function () {
    it('Decrease button functionality check for counter component', async function () {
        store.replaceState({count: 0})
        await increaseButton.trigger('click')
        expect(counter.text()).toBe('1k')
    })
})

describe('6- 2 Increase 1 decrease sequentially', function () {
    it('Use increase and decrease sequentially', async function () {
        store.replaceState({count: 0})
        await increaseButton.trigger('click')
        await increaseButton.trigger('click')
        await decreaseButton.trigger('click')
        expect(counter.text()).toBe('1k')
    })
})

describe('7- Count text visual test', function () {
    it('Check classes according to counts', async function () {
        store.replaceState({count: 0})

        const notificationArea = wrapper.find('.notificationArea')
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