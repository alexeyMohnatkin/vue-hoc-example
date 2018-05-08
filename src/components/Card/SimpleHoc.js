
export default (WrappedComponent) => {
  const props = typeof WrappedComponent === 'function'
    ? WrappedComponent.options.props
    : WrappedComponent.props;

  return {
    name: 'HigherOrder',
    props,
    render(h) {
      const slots = Object.keys(this.$slots)
        .filter(key => key !== 'default')
        .reduce((acc, key) => ({ ...acc, [key]: () => this.$slots[key] }), {});

      return h(WrappedComponent, {
        attrs: this.$attrs,
        props: this.$props,
        on: this.$listeners,
        scopedSlots: slots,
      }, this.$slots.default,
      );
    },
  };
};
