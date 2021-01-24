<template>
  <div>
    <div
      v-show="showContextMenu"
      @contextmenu="e => e.preventDefault()"
      @mousedown="e => e.stopPropagation()"
      @click="setShowContextMenu(false)"
      id="contextmenu"
      :style="`top: ${mouseY}px; left: ${mouseX}px`">
      <b-list-group>
        <b-list-group-item @click="duplicateElement">Dupliquer</b-list-group-item>
        <b-list-group-item @click="deleteElement">Supprimer</b-list-group-item>
        <b-list-group-item v-b-modal.modal-dishes>Modifier</b-list-group-item>
      </b-list-group>
    </div>
    <b-modal id="modal-dishes" title="Modifier les plats">
      <div
        v-if="activedElement"
        v-droppable-dishes>
        <div
          v-for="(item, key) in activedElement.items"
          :key="key"
          class="dish"
          draggable="true"
          v-draggable-dish="key">
          <div class="dish-name">{{ item.name }}</div>
          <b-button
            variant="light"
            class="dish-delete"
            size="sm">
            <b-icon-pencil/>
          </b-button>
          <b-button
            variant="light"
            class="dish-delete"
            size="sm">
            <b-icon-trash/>
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { itemType } from '@/helpers/dish'

let dragDish

export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
    }
  },
  computed: {
    ...mapState({
      contextMenuType: state => state.contextmenu.type,
      contextMenuDish: state => state.contextmenu.dish,
      showContextMenu: state => state.contextmenu.show,
      activedElement: state => state.element.actived,
    }),
  },
  methods: {
    ...mapMutations('contextmenu', [
      'setShowContextMenu',
    ]),
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ]),
    addDish() {
      this.activedElement.items.push(itemType)
    },
    deleteDish() {
      const index = this.activedElement.items.findIndex(value => value === this.contextMenuDish)
      if (index !== -1)
        this.activedElement.items.splice(index, 1)
    },
  },
  directives: {
    draggableDish: {
      inserted (el, { value }) {
        el.addEventListener('dragstart', () => {
          dragDish = value
        })

        el.addEventListener('dragend', () => {
          dragDish = null
        })
      },
    },
    droppableDishes: {
      inserted (el, bindings, { context }) {

        el.addEventListener('dragenter', e => {

          const { y } = e

          let diff
          let index

          el.childNodes.forEach((item, i) => {

            const rect = item.getBoundingClientRect()
            const newDiff = Math.abs(y - rect.y)
            if (!diff || diff > newDiff) {
              index = i
              diff = newDiff
            }
          })

          if (dragDish === index)
            return

          const dish = context.activedElement.items[index]
          Vue.set(context.activedElement.items, index, context.activedElement.items[dragDish])
          Vue.set(context.activedElement.items, dragDish, dish)

          dragDish = index
        })
      },
    }
  },
  created() {

    document.addEventListener('mousedown', () => {
      this.setShowContextMenu(false)
    })

    document.addEventListener('mousemove', (e) => {
      if (this.showContextMenu)
        return
      this.mouseX = e.pageX
      this.mouseY = e.pageY
    })
  },
}
</script>

<style lang="scss" scoped>
#contextmenu {
  position: absolute;
  z-index: 10;
  .list-group-item {
    cursor: pointer;
  }
}

.dish {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 4px 12px;
  margin-bottom: 8px;
  .dish-name {
    flex: 1;
  }
}
</style>
