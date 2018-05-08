
export default (WrappedComponent) => {
  const props = typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props;

  return {
    name: 'SimpleHocJsx',
    props,
    // eslint-disable-next-line no-unused-vars
    render(h) {
      const slots = Object.keys(this.$slots)
        // .filter(key => key !== 'default')
        .reduce((acc, key) => ({ ...acc, [key]: () => this.$slots[key] }), {});

      return (
        <WrappedComponent
          {...{
            attrs: { ...this.$attrs },
            props: { ...this.$props },
            on: { ...this.$listeners },
            scopedSlots: slots,
          }}
        />
      );
    },
  };
};
