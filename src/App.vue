<template>
  <div id="app"
    v-if="menu">
    <NavBar/>
    <div id="container">
      <div id="content">
        <div id="toolbar">
          <Toolbar/>
        </div>
        <div id="menuContainer">
          <Menu/>
          <ActionBar/>
        </div>
      </div>
      <SideBar/>
    </div>
    <ContextMenu/>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import ActionBar from '@/components/ActionBar'
import ContextMenu from '@/components/ContextMenu'
import Menu from '@/components/Menu'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    ActionBar,
    ContextMenu,
    Menu,
    NavBar,
    SideBar,
    Toolbar,
  },
  computed: {
    ...mapState({
      id: state => state.menu.id,
      menu: state => state.menu.data,
      historyIndex: state => state.history.index,
    }),
    json () {
      return JSON.stringify(this.menu)
    },
  },
  methods: {
    ...mapActions('format', [
      'getFormatData',
    ]),
    ...mapActions('history', [
      'addHistory',
    ]),
    ...mapActions('menu', [
      'getMenuData',
      'saveMenuData',
    ]),
    ...mapActions('text', [
      'getTextData',
    ]),
    ...mapMutations('menu', [
      'setMenuId',
      'setMenuSaved',
    ]),
  },
  watch: {
    json () {
      this.addHistory()
      this.setMenuSaved(false)
    },
    historyIndex() {
      this.saveMenuData()
    },
  },
  created() {
    const id = 1
    this.setMenuId(id)
    this.getFormatData()
    this.getMenuData(id)
    this.getTextData()
  },
}
</script>

<style lang="scss">
body {
  font-family: "Cera Pro" !important;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

:focus {
  outline: none;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 8px;
	background-color: #dadada;
}

::-webkit-scrollbar {
	width: 10px;
	background-color: #dadada;
}

::-webkit-scrollbar-thumb {
	border-radius: 8px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #9E9E9E;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

#loading {
  background-color: #151f29;
  height: 100vh;
}

#logo {
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    position: relative;
    height: 8rem;
    margin-right: 0.4rem;
  }
  > span {
    color: #fff;
    font-weight: bold;
    font-size: 4rem;
    font-family: "SF New Republic";
    &:first-letter {
      color: #ff395e;
    }
  }
}

#container {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  #content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    #toolbar {
      position: relative;
      height: 48px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      box-shadow: 0 1px 0 rgba(57,76,96,.15);
    }
    #menuContainer {
      position: relative;
      width: 100%;
      height: calc(100% - 48px);
      touch-action: manipulation;
      user-select: none;
      overflow: auto;
    }
  }
}
</style>
