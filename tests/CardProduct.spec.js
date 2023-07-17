import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import component from "src/components/CardProduct.vue";
describe('CardProduct component', () => {
  const item = {
    product: {
      "id": 4,
      "title": "",
      "price": 15.99,
      "description": "",
      "category": "",
      "image": "",
      "count": 2
    }
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(component, { props: item });
  })
  it('mount without errors', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  })
  it('render price to list', () => {
    const price = wrapper.find('.price');
    expect(price.element.innerHTML).toEqual('31.98$')
  })
})