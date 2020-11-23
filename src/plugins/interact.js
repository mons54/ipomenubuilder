import interact from 'interactjs'


export default {
  install (Vue) {
    Vue.directive('draggable', {
      inserted (el) {
        let clone
        let position
        interact(el).draggable({
          listeners: {
            start() {
              clone = el.cloneNode(true)
              position = { x: 0, y: 0 }

              const rect = el.getBoundingClientRect()

              el.parentElement.insertBefore(clone, el)

              document.body.appendChild(el)

              el.style.width = `${rect.width}px`
              el.style.position = 'absolute'
              el.style.left = `${rect.left}px`
              el.style.top = `${rect.top}px`
            },
            move (event) {
              position.x += event.dx
              position.y += event.dy
              el.style.transform =`translate(${position.x}px, ${position.y}px)`
            },
            end() {
              clone.parentElement.insertBefore(el, clone)
              clone.remove()
              el.style.removeProperty('width')
              el.style.removeProperty('position')
              el.style.removeProperty('left')
              el.style.removeProperty('top')
              el.style.removeProperty('transform')
            }
          }
        })
      }
    })
  }
}
