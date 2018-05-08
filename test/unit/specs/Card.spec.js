import { mount, createLocalVue } from '@vue/test-utils';
import {
  Card,
  SimpleHocCard,
  SimpleHocCardJsx,
  CardWithButtons,
  EditableCard,
  AllTogether,
} from '@/components/Card';
import idObj from 'identity-obj-proxy';

const localVue = createLocalVue();

const cardTitle = 'Some title';

describe('Card.vue', () => {
  beforeAll(() => {
    localVue.use({
      install(V) {
        V.prototype.$style = idObj;
      },
    });
  });

  const mountedListener = jest.fn();
  const editListener = jest.fn();
  const createWrapper = (component, { ...options }) => {
    const wrapper = mount(component, {
      localVue,
      ...options,
      listeners: {
        mount: mountedListener,
        // somehow wrapper.vm.$on('edit', editListener) doesn't work
        edit: editListener,
      },
    });
    return wrapper;
  };

  beforeEach(() => {
    mountedListener.mockReset();
    editListener.mockReset();
  });

  it('renders base component', () => {
    const wrapper = createWrapper(Card, {
      propsData: {
        title: cardTitle,
      },
    });
    expect(wrapper.find('.title').text()).toEqual(cardTitle);
    expect(wrapper.emitted().mount[0]).toEqual(['Card']);
  });

  it('renders simple HOC', () => {
    const wrapper = createWrapper(SimpleHocCard, {
      propsData: {
        title: cardTitle,
      },
    });

    expect(wrapper.find('.title').text()).toEqual(cardTitle);
    expect(mountedListener).toBeCalledWith('HigherOrder => Card');
  });

  it('renders simple HOC JSX', () => {
    const wrapper = createWrapper(SimpleHocCardJsx, {
      propsData: {
        title: cardTitle,
      },
    });
    expect(wrapper.find('.title').text()).toEqual(cardTitle);
    expect(mountedListener).toBeCalledWith('SimpleHocJsx => Card');
  });

  it('passes slots', async () => {
    const wrapper = createWrapper(SimpleHocCard, {
      propsData: {
        title: cardTitle,
      },
      slots: {
        default: '<div class="default-slot">default slot</div>',
        footer: 'footer slot',
      },
    });

    expect(wrapper.find('.default-slot').text()).toEqual('default slot');
    expect(wrapper.find('.footer').text()).toEqual('footer slot');
  });

  it('passes slots JSX', async () => {
    const wrapper = createWrapper(SimpleHocCardJsx, {
      propsData: {
        title: cardTitle,
      },
      slots: {
        default: '<div class="default-slot">default slot</div>',
        footer: 'footer slot',
      },
    });

    expect(wrapper.find('.default-slot').text()).toEqual('default slot');
    expect(wrapper.find('.footer').text()).toEqual('footer slot');
  });

  it('WithButtons', async () => {
    const wrapper = createWrapper(CardWithButtons, {
      propsData: {
        title: cardTitle,
        text: 'card text',
      },
    });

    expect(wrapper.vm.$el).toMatchSnapshot();

    const submitListener = jest.fn();
    wrapper.vm.$on('submit', submitListener);
    const submitButton = wrapper.find('.aqa-submit-button');
    submitButton.trigger('click');
    expect(submitListener).toBeCalledWith('some data');
  });

  it('Editable', () => {
    const wrapper = createWrapper(EditableCard, {
      propsData: {
        title: cardTitle,
        text: 'card text',
      },
    });

    expect(wrapper.vm.$el).toMatchSnapshot();
    const editButton = wrapper.find('.aqa-edit-button');
    editButton.trigger('click');
    expect(editListener).toBeCalled();
  });

  it('All Together', () => {
    const wrapper = createWrapper(AllTogether, {
      propsData: {
        title: cardTitle,
        text: 'card text',
      },
    });

    expect(wrapper.vm.$el).toMatchSnapshot();
    const editButton = wrapper.find('.aqa-edit-button');
    editButton.trigger('click');
    expect(editListener).toBeCalled();

    const submitListener = jest.fn();
    wrapper.vm.$on('submit', submitListener);
    const submitButton = wrapper.find('.aqa-submit-button');
    submitButton.trigger('click');
    expect(submitListener).toBeCalledWith('some data');
  });
});
