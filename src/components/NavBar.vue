<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand
      id="logo">
      <img src="@/assets/logo.png">
      <span>mizogoo</span>
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item
        href="#">
        <b-icon-arrow-left-short/>
        Retour
      </b-nav-item>
      <b-nav-item>Télécharger</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item  v-if="onSave" :disabled="true">
        Enregistrement...
      </b-nav-item>
      <b-nav-item  v-else-if="saved" :disabled="true">
        Enregistré
      </b-nav-item>
      <b-nav-item v-else @click="saveMenuData">
        Enregistrer
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      onSave: state => state.menu.onSave,
      saved: state => state.menu.saved,
    }),
  },
  methods: {
    ...mapActions('menu', [
      'saveMenuData',
    ]),
  },
}
</script>

<style scoped lang="scss">
#logo {
  > img {
    height: 2.4rem;
  }
  > span {
    font-size: 1.8rem;
  }
}
</style>
