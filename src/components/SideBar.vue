<template>
  <div class="sidebar">
    <div class="nav">
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-card-checklist class="nav-icon"/>
        </div>
        Plats
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-type class="nav-icon"/>
        </div>
        Textes
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-image class="nav-icon"/>
        </div>
        Images
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-star class="nav-icon"/>
        </div>
        Icones
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-images class="nav-icon"/>
        </div>
        Modèles
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-droplet-fill class="nav-icon"/>
        </div>
        Couleurs
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-grid1x2-fill class="nav-icon"/>
        </div>
        Grille
      </div>
      <div
        class="nav-item">
        <div class="icon">
          <b-icon-back class="nav-icon"/>
        </div>
        Format
      </div>
    </div>
    <div class="tab">
      Contenu
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  background-color: #455A64;
  color: #fff;
  .nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #37474F;
    width: 92px;
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
  }
}
</style>
