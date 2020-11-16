<template>
  <div class="sidebar">
    <div class="nav">
      <div
        @click="selectSidebar('dish')"
        class="nav-item">
        <div class="icon">
          <b-icon-card-checklist class="nav-icon"/>
        </div>
        Plats
      </div>
      <div
        @click="selectSidebar('text')"
        class="nav-item">
        <div class="icon">
          <b-icon-type class="nav-icon"/>
        </div>
        Textes
      </div>
      <div
        @click="selectSidebar('image')"
        class="nav-item">
        <div class="icon">
          <b-icon-image class="nav-icon"/>
        </div>
        Images
      </div>
      <div
        @click="selectSidebar('icon')"
        class="nav-item">
        <div class="icon">
          <b-icon-star class="nav-icon"/>
        </div>
        Icones
      </div>
      <div
        @click="selectSidebar('template')"
        class="nav-item">
        <div class="icon">
          <b-icon-images class="nav-icon"/>
        </div>
        Modèles
      </div>
      <div
        @click="selectSidebar('color')"
        class="nav-item">
        <div class="icon">
          <b-icon-droplet-fill class="nav-icon"/>
        </div>
        Couleurs
      </div>
      <div
        @click="selectSidebar('icon')"
        class="nav-item">
        <div class="icon">
          <b-icon-grid1x2-fill class="nav-icon"/>
        </div>
        Grille
      </div>
      <div
        @click="selectSidebar('format')"
        class="nav-item">
        <div class="icon">
          <b-icon-back class="nav-icon"/>
        </div>
        Format
      </div>
    </div>
    <div class="tab">
      <Texts v-if="selected === 'text'"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Texts from '@/components/Text'

export default {
  components: {
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
      .icon {
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
</style>
