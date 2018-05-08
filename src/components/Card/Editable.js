import Editable from '../Editable';

export default (WrappedComponent) => {
  const props = typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props;

  return {
    name: 'Editable',
    components: {
      Editable,
    },
    props: {
      ...props,
      cardClass: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleEdit() {
        this.$emit('edit');
      },
    },
    // eslint-disable-next-line no-unused-vars
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((acc, key) => ({ ...acc, [key]: () => this.$slots[key] }), {});

      const { edit, ...listeners } = this.$listeners;
      return (
        <Editable onEdit={edit}>
          <WrappedComponent
            class={this.cardClass}
            {...{
              attrs: { ...this.$attrs },
              props: { ...this.$props },
              on: { ...listeners },
              scopedSlots: slots,
            }}
          >
          </WrappedComponent>
        </Editable>
      );
    },
  };
};
