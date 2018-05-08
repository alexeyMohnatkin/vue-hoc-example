<script>
export default {
  name: 'Editable',

  methods: {
    handleEdit() {
      this.$emit('edit');
    },
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div class={this.$style.root}>
        <span
          class={[this.$style.button, 'aqa-edit-button']}
          onClick={this.handleEdit}
        >
          Edit
        </span>
        {this.$slots.default}
      </div>
    );
  },
};
</script>

<style module>

.root {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 13px;
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}
.button:hover {
  text-decoration: none;
}
</style>
