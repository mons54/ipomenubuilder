<template>
  <div id="sidebar">
    <div class="sidebar">
      <div class="nav">
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
        <div
          @click="selectSidebar('format')"
          class="nav-item">
          <div class="nav-icon">
            <b-icon-back/>
          </div>
          Format
        </div>
      </div>
      <div class="tab">
        <Colors v-if="selected === 'color'"/>
        <Dishes v-if="selected === 'dish'"/>
        <Grids v-if="selected === 'grid'"/>
        <Texts v-if="selected === 'text'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Colors from '@/components/Colors'
import Dishes from '@/components/Dishes'
import Grids from '@/components/Grids'
import Texts from '@/components/Texts'

export default {
  components: {
    Colors,
    Dishes,
    Grids,
    Texts,
  },
  computed: {
    ...mapState({
      selected: state => state.sidebar.selected,
    }),
  },
  methods: {
    ...mapMutations('sidebar', [
      'selectSidebar',
    ]),
  },
}
</script>

<style lang="scss" scoped>
#sidebar {
  flex: 0 25%;
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
