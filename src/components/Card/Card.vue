<template>
  <div :class="$style.root">
    <div :class="$style.title">
      {{title}}
    </div>
    <div :class="$style.text">
      <slot></slot>
      {{text}}
    </div>
    <div
      v-if="showDebug"
      :class="$style.debug"
    >
      {{chainStr}}
    </div>
    <div :class="$style.footer" v-if="$scopedSlots.footer || $slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      chain: [],
      chainStr: '',
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    showDebug: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    findParents(component) {
      if (component.$parent && component.$parent.$options.name) {
        this.findParents(component.$parent);
      }
      this.chain.push(component.$options.name);
    },
  },
  mounted() {
    this.findParents(this);
    this.chainStr = this.chain.join(' => ');
    this.$emit('mount', this.chainStr);
  },
};
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #666;
  border-radius: 6px;
  background: #ccc;
}
.title {
  padding: 15px;
  border-bottom: 1px solid #666;
  font-size: 24px;
  font-weight: bold;
}
.text {
  flex: 1;
  padding: 15px;
  font-size: 16px;
}
.debug {
  padding: 15px;
  border-top: 1px solid #666;
  color: #666;
  font-size: 14px;
  font-weight: bold;
}
.footer {
  padding: 15px;
  border-top: 1px solid #666;
}
</style>
