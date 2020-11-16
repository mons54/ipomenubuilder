<template>
  <div id="app">
    <NavBar/>
    <div id="container">
      <div id="containerInner">
        <div id="content">
          <div>
            <div id="contentInner">
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar">
        <SideBar/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar.vue'

export default {
  components: {
    NavBar,
    SideBar,
  },
  computed: {
    ...mapState({
      id: state => state.menu.id,
      data: state => state.menu.data,
      historyIndex: state => state.history.index,
    }),
    json () {
      return JSON.stringify(this.data)
    },
  },
  methods: {
    ...mapActions('history', [
      'addHistory',
    ]),
    ...mapActions('menu', [
      'getMenuData',
    ]),
  },
  watch: {
    json () {
      this.addHistory()
    },
  },
  created() {
    this.getMenuData()
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
}

#containerInner {
  flex: 1;
  position: relative;
  height: 100%;
}

#content {
  overflow: auto;
  height: 100%;
}

#contentInner {
  margin: 20px 20px 80px;
}

#sidebar {
  flex: 0 25%;
  max-width: 480px;
  border-left: 1px solid #dadada;
}
</style>
