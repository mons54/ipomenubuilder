<template>
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
      <b-list-group-item
        v-if="contextMenuType === 'dish'"
        @click="addDish">
        Ajouter un plat
      </b-list-group-item>
      <b-list-group-item
        v-if="contextMenuType === 'dish' && contextMenuDish"
        @click="deleteDish">
        Supprimer le plat
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { itemType } from '@/helpers/dish'

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
</style>
