<template>
  <div>
    <div
      v-show="showContextMenu"
      @contextmenu="e => e.preventDefault()"
      @mousedown="e => e.stopPropagation()"
      @click="setShowContextMenu(false)"
      id="contextmenu"
      :style="`top: ${y}px; left: ${x}px`">
      <b-list-group>
        <b-list-group-item @click="duplicateElement">
          {{ $t('duplicate') }}
        </b-list-group-item>
        <b-list-group-item
          v-if="actived && actived.type === 'dish'"
          v-b-modal.modal-dishes>
          {{ $t('edit') }}
        </b-list-group-item>
        <b-list-group-item
          v-if="actived && actived.type === 'image'"
          v-b-modal.modal-contextmenu-crop>
          {{ $t('crop') }}
        </b-list-group-item>
        <b-list-group-item @click="deleteElement">Supprimer</b-list-group-item>
      </b-list-group>
    </div>
    <Crop
      v-if="actived && actived.type === 'image'"
      :element="actived"
      modalId="modal-contextmenu-crop"/>
    <b-modal
      id="modal-dishes"
      :title="$t('editDishes')"
      hide-footer
      @close="closeDishModal">
      <div
        v-if="actived"
        v-droppable-dishes>
        <div v-if="editDish">
          <Editable
            v-model="editDish.name"
            class="edit-dish"
          />
          <Editable
            v-model="editDish.description"
            class="edit-dish"
          />
          <div class="dish-price">
            <Editable
              v-model="editDish.prices[0]"
              :price="true"
              :inline="true"
              class="edit-dish"
            />
            <Editable
              v-model="editDish.prices[1]"
              :price="true"
              :inline="true"
              class="edit-dish"
            />
            <Editable
              v-model="editDish.prices[2]"
              :price="true"
              :inline="true"
              class="edit-dish"
            />
          </div>
          <div class="dish-allergen">
            <b-form-checkbox-group
              id="checkbox-allergens"
              v-model="allergensModel"
              name="allergens">
              <b-form-checkbox
                v-for="(allergen, key) of allergens"
                :key="key"
                :value="allergen.name"
                class="checkbox-allergen">
                <img :src="allergen.image"/>
                {{ $t(`allergens.${allergen.name}`) }}
              </b-form-checkbox>
            </b-form-checkbox-group>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(item, key) in actived.items"
            :key="key"
            class="dish"
            draggable="true"
            v-draggable-dish="key">
            <div class="dish-name">{{ item.name }}</div>
            <b-button
              @click="editDish = item"
              variant="light"
              size="sm">
              <b-icon-pencil/>
            </b-button>
            <b-button
              @click="deleteDish(key)"
              variant="light"
              size="sm"
              :disabled="actived.items.length < 2">
              <b-icon-trash/>
            </b-button>
          </div>
        </div>
        <div class="d-flex">
          <b-button
            v-if="editDish"
            class="mt-3 ml-auto"
            variant="success"
            @click="editDish = null">
            {{ $t('validate') }}
          </b-button>
          <b-button
            v-else
            class="mt-3 ml-auto"
            variant="success"
            @click="addDish">
            {{ $t('addDish') }}
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import Crop from '@/components/Crop'
import Editable from '@/components/Editable'
import { itemType } from '@/helpers/dish'

let dragDish

export default {
  components: {
    Crop,
    Editable,
  },
  data() {
    return {
      x: 0,
      y: 0,
      mouseX: 0,
      mouseY: 0,
      editDish: null,
    }
  },
  computed: {
    ...mapState({
      allergens: state => state.allergen.data,
      showContextMenu: state => state.contextmenu.show,
    }),
    ...mapGetters('element', [
      'actived',
    ]),
    allergensModel: {
      get() {
        return this.editDish.allergens.map(value => value.name)
      },
      set(value) {
        this.editDish.allergens = []
        value.forEach(item => {
          this.editDish.allergens.push(this.allergens.find(value => value.name === item))
        })
      },
    },
  },
  methods: {
    ...mapMutations('contextmenu', [
      'setShowContextMenu',
    ]),
    ...mapActions('allergen', [
      'getAllergenData',
    ]),
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ]),
    addDish() {
      this.actived.items.push(itemType)
    },
    deleteDish(key) {
      this.actived.items.splice(key, 1)
    },
    closeDishModal() {
      this.editDish = null
      this.$bvModal.hide('modal-dishes')
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

          const dish = context.actived.items[index]
          Vue.set(context.actived.items, index, context.actived.items[dragDish])
          Vue.set(context.actived.items, dragDish, dish)

          dragDish = index
        })
      },
    }
  },
  watch: {
    showContextMenu(value) {
      if (value) {
        this.x = this.mouseX
        this.y = this.mouseY
      }
    },
  },
  created() {

    this.getAllergenData()

    document.addEventListener('mousedown', () => {
      this.setShowContextMenu(false)
    })

    document.addEventListener('mousemove', (e) => {
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

.edit-dish {
  border-radius: 4px;
  padding: 4px 12px;
  border: 1px solid #dee2e6;
  padding: 4px 12px;
  margin-bottom: 8px;
}

.dish-price {
  display: flex;
  .edit-dish {
    flex: 1;
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
}

.dish-allergen {
  #checkbox-allergens {
    display: flex;
    flex-wrap: wrap;
    .checkbox-allergen {
      flex: 0 0 33%;
      margin: 0 !important;
      img {
        margin-right: 2px;
        width: 20px;
      }
    }
  }
}
</style>
