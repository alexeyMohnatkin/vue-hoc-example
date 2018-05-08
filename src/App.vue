<template>
  <div id="app" :class="$style.root">
    <h1 :class="$style.title">Vue.js Higher Order Components</h1>
    <div :class="$style.debug">
      <label>
        <input type="checkbox" v-model="showDebug" /> debug
      </label>
    </div>
    <div :class="$style.cards">
      <Card
        :class="$style.card"
        title="Simple card"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
      />
      <SimpleHocCard
        :class="$style.card"
        title="Simple HOC"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
      />
      <SimpleHocCardJsx
        :class="$style.card"
        title="Simple HOC JSX"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
      />
      <SimpleHocCard
        :class="$style.card"
        title="Hoc with slot"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
      >
        <div>
          Default slot
        </div>
        <div slot="footer">
          Card footer in slot
        </div>
      </SimpleHocCard>
      <SimpleHocCardJsx
        :class="$style.card"
        title="Hoc JSX with slot"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
      >
        <div>
          Default slot
        </div>
        <div slot="footer">
          Card footer in slot
        </div>
      </SimpleHocCardJsx>

      <CardWithButtons
        :class="$style.card"
        title="With buttons"
        :text="cardText"
        :showDebug="showDebug"
        @mount="handleMount"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />

      <EditableCard
        :class="$style.card"
        :cardClass="$style.editableCard"
        :text="cardText"
        :showDebug="showDebug"
        title="Editable card"
        @mount="handleMount"
        @edit="handleEdit"
      />

      <AllTogether
        :class="$style.card"
        :cardClass="$style.editableCard"
        :text="cardText"
        :showDebug="showDebug"
        title="All together"
        @mount="handleMount"
        @edit="handleEdit"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import {
  Card,
  SimpleHocCard,
  SimpleHocCardJsx,
  CardWithButtons,
  EditableCard,
  AllTogether,
} from './components/Card';

export default {
  name: 'App',
  components: {
    Card,
    SimpleHocCard,
    SimpleHocCardJsx,
    CardWithButtons,
    EditableCard,
    AllTogether,
  },

  data() {
    return {
      cardText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        'Non repudiandae laborum minima quidem doloremque' +
        'perferendis amet necessitatibus cupiditate ut incidunt.',
      showDebug: false,
    };
  },

  methods: {
    handleMount(chain) {
      // eslint-disable-next-line no-console
      console.log(`mounted: ${chain}`);
    },

    handleSubmit(data) {
      // eslint-disable-next-line no-console
      console.log(`submit: ${data}`);
    },
    handleCancel() {
      // eslint-disable-next-line no-console
      console.log('cancel');
    },
    handleEdit() {
      // eslint-disable-next-line no-console
      console.log('edit');
    },
  },
};
</script>

<style>

body {
  padding: 0;
  margin: 0;
  background: #999;
}
</style>
<style module>
.root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 60px;
}

.title {
  text-align: center;
}

.debug {
  position: absolute;
  right: 15px;
  top: 15px;
  display: block;
  width: 200px;
  padding: 5px;
  border: 1px solid #008b2e;
  border-radius: 6px;
  background: #ccc;
}

.cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  margin: 20px;
}

/*
  hack to style card inside Editable component
  because we can't define styles for this.$slots.default
  See Editable.vue
 */
.editableCard {
  flex: 1;
}
</style>
