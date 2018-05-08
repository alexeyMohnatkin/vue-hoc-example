
export default (WrappedComponent) => {
  const props = typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props;

  return {
    name: 'WithButtons',
    props,

    methods: {
      handleSubmit() {
        this.$emit('submit', 'some data');
      },
      handleCancel() {
        this.$emit('cancel');
      },
    },
    // eslint-disable-next-line no-unused-vars
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((acc, key) => ({ ...acc, [key]: () => this.$slots[key] }), {});

      return (
        <WrappedComponent
          {...{
            attrs: { ...this.$attrs },
            props: { ...this.$props },
            on: { ...this.$listeners },
            scopedSlots: slots,
          }}
        >
          <div slot="footer">
            <button
              type="button"
              class="aqa-submit-button"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              class="aqa-cancel-button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </WrappedComponent>
      );
    },
  };
};
