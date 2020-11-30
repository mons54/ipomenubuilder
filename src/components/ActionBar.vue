<template>
  <div class="actionbar">
    <ul class="blue-grey lighten-1">
      <li>
        <b-button
          v-on:click="undoHistory"
          :disabled="!hasUndoHistory">
          <b-icon-arrow-return-left/>
        </b-button>
      </li>
      <li>
        <b-button
          v-on:click="redoHistory"
          :disabled="!hasRedoHistory">
          <b-icon-arrow-return-right/>
        </b-button>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      id: state => state.menu.id,
      menu: state => state.menu.data,
      historyIndex: state => state.history.index,
    }),
    ...mapGetters('history', [
      'hasUndoHistory',
      'hasRedoHistory',
    ]),
  },
  methods: {
    ...mapActions('history', [
      'undoHistory',
      'redoHistory',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.actionbar {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 0;
  text-align: center;
  bottom: 60px;
  left: 0;
  color: #fff;

  > ul {
    display: flex;
    align-items: center;
    border-radius: 24px;
    height: 40px;
    padding: 0 8px;

    > li {
      display: flex;
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }

      > button {
        display: flex;
        padding: 8px 12px;
        align-items: center;
      }
    }
  }
}
</style>
