import { describe, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import component from "src/views/Basket.vue";
import store from "src/store/index.js";
describe('Basket view', () => {
  const product1 = {
    "id": 1,
    "title": "",
    "price": 2,
    "description": "",
    "category": "",
    "image": "",
    "count": 0
  };
  const product2 = {
    "id": 2,
    "title": "",
    "price": 4,
    "description": "",
    "category": "",
    "image": "",
    "count": 0
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(component, {
      global: {
        provide: {
          store: store
        }
      }
    });
    store.commit('ADD_CART', product1);
    store.commit('ADD_CART', product2);
  })

  it('mount without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  })
  it('render cardProduct', () => {
    const cardProduct = wrapper.find('[data-testid="product-1"]')
    expect(wrapper.exists()).toBeTruthy();
    const counter = cardProduct.find('.label-counter');
    expect(counter.element.innerHTML).toEqual('1');
  })
  it('render buttons on cardProduct', () => {
    const buttons = wrapper.find('[data-testid="product-1"]').findAll('.button-counter');
    expect(buttons).toHaveLength(2);
  })
  it('click on add and delete button on cardProduct', async () => {
    const counter = wrapper.find('[data-testid="product-1"]').find('.label-counter');
    const buttons = wrapper.find('[data-testid="product-1"]').findAll('.button-counter');
    const c0 = Number(counter.element.innerHTML);
    await buttons[1].trigger('click');
    expect(c0 + 1).toBe(Number(counter.element.innerHTML));
    await buttons[0].trigger('click');
    expect(c0).toBe(Number(counter.element.innerHTML));
  })

  it('number of productCards', () => {
    const productCards = wrapper.findAll('.item');
    expect(productCards).toHaveLength(2);
  })

  it('click on clear basket button', async () => {
    const buttonClear = wrapper.find('.button-clear');
    await buttonClear.trigger('click');
    const productCards = wrapper.findAll('.item');
    expect(productCards).toHaveLength(0);
  })

  it('total amount in basket', async () => {
    expect(wrapper.find('.label-total').element.innerHTML).toBe("0.00")
    const buttons1 = wrapper.find('[data-testid="product-1"]').findAll('.button-counter');
    const buttons2 = wrapper.find('[data-testid="product-2"]').findAll('.button-counter');
    await buttons1[1].trigger('click');
    await buttons1[1].trigger('click');
    await buttons2[1].trigger('click');
    expect(wrapper.find('.label-total').element.innerHTML).toBe("8.00")
  })
})