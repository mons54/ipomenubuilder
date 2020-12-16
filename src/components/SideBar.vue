<template>
  <div id="sidebar">
    <div class="sidebar">
      <div
        class="nav"
        @click="desactiveElement">
        <div
          @click="selectSidebar('dish')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-card-checklist/>
          </div>
          Plats
        </div>
        <div
          @click="selectSidebar('text')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-type/>
          </div>
          Textes
        </div>
        <div
          @click="selectSidebar('image')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-image/>
          </div>
          Images
        </div>
        <div
          @click="selectSidebar('icon')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-star/>
          </div>
          Icones
        </div>
        <div
          @click="selectSidebar('template')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-images/>
          </div>
          Modèles
        </div>
        <div
          @click="selectSidebar('color')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-droplet-fill/>
          </div>
          Couleurs
        </div>
        <div
          @click="selectSidebar('grid')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-grid1x2-fill/>
          </div>
          Grille
        </div>
      </div>
      <div class="tab">
        <StyleDish
          v-if="dishActived"
          :element="dishActived"
        />
        <StyleImage
          v-else-if="imageActived"
          :element="imageActived"
        />
        <StyleText
          v-else-if="textActived"
          :element="textActived"
        />
        <GridArea v-else-if="area"/>
        <Colors v-else-if="selected === 'color'"/>
        <Dishes v-else-if="selected === 'dish'"/>
        <Grids v-else-if="selected === 'grid'"/>
        <Images
          v-else-if="selected === 'image'"
          :draggable="true"/>
        <Texts v-else-if="selected === 'text'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import GridArea from '@/components/GridArea'
import Colors from '@/components/Colors'
import Dishes from '@/components/Dishes'
import Grids from '@/components/Grids'
import Images from '@/components/Images'
import Texts from '@/components/Texts'
import StyleDish from '@/components/StyleDish'
import StyleImage from '@/components/StyleImage'
import StyleText from '@/components/StyleText'

export default {
  components: {
    GridArea,
    Colors,
    Dishes,
    Grids,
    Images,
    Texts,
    StyleDish,
    StyleImage,
    StyleText,
  },
  computed: {
    ...mapState({
      area: state => state.menu.gridArea,
      selected: state => state.sidebar.selected,
    }),
    ...mapGetters('element', [
      'dishActived',
      'imageActived',
      'textActived',
    ])
  },
  methods: {
    ...mapActions('sidebar', [
      'selectSidebar',
    ]),
    ...mapMutations('element', [
      'desactiveElement',
    ]),
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
