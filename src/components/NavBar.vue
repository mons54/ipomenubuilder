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
        {{ $t('back') }}
      </b-nav-item>
      <b-nav-item-dropdown
        :text="$t('resize')"
        right>
        <b-dropdown-item
          v-for="(format, key) of formats"
          :key="key"
          @click="resizeMenu(format)">
          {{ format.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <Download/>
      <b-nav-item  v-if="onSave" :disabled="true">
        {{ $t('saving') }}...
      </b-nav-item>
      <b-nav-item  v-else-if="saved" :disabled="true">
        {{ $t('saved') }}
      </b-nav-item>
      <b-nav-item v-else @click="saveMenuData">
        {{ $t('save') }}
      </b-nav-item>
      <b-nav-item
        href="#"
        @click="remove">
        Supprimer
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Download from '@/components/Download'

export default {
  components: {
    Download,
  },
  computed: {
    ...mapState({
      formats: state => state.format.data,
      onSave: state => state.menu.onSave,
      saved: state => state.menu.saved,
    }),
  },
  methods: {
    ...mapActions('menu', [
      'resizeMenu',
      'saveMenuData',
    ]),
    remove() {
      localStorage.removeItem(1)
      document.location.reload()
    }
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
