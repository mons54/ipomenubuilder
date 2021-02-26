<template>
  <div id="sidebar">
    <div class="sidebar">
      <div
        class="nav"
        @click="desactiveElement">
        <div
          @click="selectSidebar('dish')"
          class="nav-item"
          :class="{'selected': itemSelected('dish')}">
          <div class="nav-icon">
            <b-icon-card-checklist/>
          </div>
          {{ $t('dishes') }}
        </div>
        <div
          @click="selectSidebar('text')"
          class="nav-item"
          :class="{'selected': itemSelected('text')}">
          <div class="nav-icon">
            <b-icon-type/>
          </div>
          {{ $t('texts') }}
        </div>
        <div
          @click="selectSidebar('image')"
          class="nav-item"
          :class="{'selected': itemSelected('image')}">
          <div class="nav-icon">
            <b-icon-image/>
          </div>
          {{ $t('images') }}
        </div>
        <div
          @click="selectSidebar('icon')"
          class="nav-item"
          :class="{'selected': itemSelected('icon')}">
          <div class="nav-icon">
            <b-icon-star/>
          </div>
          {{ $t('icons') }}
        </div>
        <div
          @click="selectSidebar('shape')"
          class="nav-item"
          :class="{'selected': itemSelected('shape')}">
          <div class="nav-icon">
            <b-icon-circle-square/>
          </div>
          Formes
        </div>
        <div
          @click="selectSidebar('template')"
          class="nav-item"
          :class="{'selected': itemSelected('template')}">
          <div class="nav-icon">
            <b-icon-images/>
          </div>
          {{ $t('templates') }}
        </div>
        <div
          @click="selectSidebar('color')"
          class="nav-item"
          :class="{'selected': itemSelected('color')}">
          <div class="nav-icon">
            <b-icon-droplet-fill/>
          </div>
          {{ $t('colors') }}
        </div>
        <div
          @click="selectSidebar('grid')"
          class="nav-item"
          :class="{'selected': itemSelected('grid')}">
          <div class="nav-icon">
            <b-icon-grid1x2-fill/>
          </div>
          {{ $t('grids') }}
        </div>
        <div
          @click="selectSidebar('background')"
          class="nav-item"
          :class="{'selected': itemSelected('background')}">
          <div class="nav-icon">
            <b-icon-file-image/>
          </div>
          Fonds
        </div>
        <div
          @click="selectSidebar('translate')"
          class="nav-item"
          :class="{'selected': itemSelected('translate')}">
          <div class="nav-icon">
            <b-icon-globe/>
          </div>
          {{ $t('translate') }}
        </div>
        <div
          @click="selectSidebar('parameters')"
          class="nav-item"
          :class="{'selected': itemSelected('parameters')}">
          <div class="nav-icon">
            <b-icon-gear/>
          </div>
          Paramètres
        </div>
      </div>
      <div class="tab">
        <StyleDish
          v-if="activedDish"
          :element="activedDish"
        />
        <StyleImage
          v-else-if="activedImage"
          :element="activedImage"
        />
        <StyleShape
          v-else-if="activedShape"
          :element="activedShape"
        />
        <StyleText
          v-else-if="activedText"
          :element="activedText"
        />
        <GridArea
          v-else-if="areaActived"
        />
        <Background
          v-else-if="selected === 'background'"
        />
        <Colors
          v-else-if="selected === 'color'"
        />
        <Dishes
          v-else-if="selected === 'dish'"
        />
        <Grids
          v-else-if="selected === 'grid'"
        />
        <Icons
          v-else-if="selected === 'icon'"
        />
        <Images
          v-else-if="selected === 'image'"
          :draggable="true"
        />
        <Shape
          v-else-if="selected === 'shape'"
        />
        <Texts
          v-else-if="selected === 'text'"
        />
        <Translate
          v-else-if="selected === 'translate'"
        />
        <Parameters
          v-else-if="selected === 'parameters'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import GridArea from '@/components/GridArea'
import Background from '@/components/Background'
import Colors from '@/components/Colors'
import Dishes from '@/components/Dishes'
import Grids from '@/components/Grids'
import Icons from '@/components/Icons'
import Images from '@/components/Images'
import Parameters from '@/components/Parameters'
import Texts from '@/components/Texts'
import Translate from '@/components/Translate'
import Shape from '@/components/Shape'
import StyleDish from '@/components/StyleDish'
import StyleImage from '@/components/StyleImage'
import StyleShape from '@/components/StyleShape'
import StyleText from '@/components/StyleText'

export default {
  components: {
    GridArea,
    Background,
    Colors,
    Dishes,
    Grids,
    Icons,
    Images,
    Parameters,
    Texts,
    Translate,
    Shape,
    StyleDish,
    StyleImage,
    StyleShape,
    StyleText,
  },
  computed: {
    ...mapState({
      areaActived: state => state.menu.gridArea,
      selected: state => state.sidebar.selected,
    }),
    ...mapGetters('element', [
      'activedDish',
      'activedImage',
      'activedShape',
      'activedText',
    ])
  },
  methods: {
    ...mapActions('sidebar', [
      'selectSidebar',
    ]),
    ...mapActions('element', [
      'desactiveElement',
    ]),
    itemSelected(name) {
      return !!(this.selected === name && !this.activedDish && !this.activedImage && !this.activedText && !this.areaActived)
    },
  },
}
</script>

<style lang="scss" scoped>
#sidebar {
  flex: 0 0 25%;
  max-width: 480px;
  border-left: 1px solid #dadada;
  .sidebar {
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    background-color: #455A64;
    color: #fff;
    overflow: hidden;
    .nav {
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: #37474F;
      width: 92px;
      flex: 0 0 92px;
      .nav-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
        font-size: 13px;
        cursor: pointer;
        width: 100%;
        &.selected {
          background-color: #455A64;
        }
        .nav-icon {
          font-size: 20px;
          margin-bottom: 4px;
        }
      }
    }
    .tab {
      flex: 1;
      padding: 24px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
