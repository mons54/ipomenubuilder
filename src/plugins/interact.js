import interact from 'interactjs'
import { v4 as uid } from 'uuid'

let dropzone
let draggable

export default {
  install (Vue) {

    let clone
    let position

    function _draggable (el, { value, modifiers }, { data, context }) {

      el.style.touchAction = 'none'

      interact(el).
      draggable({
        listeners: {
          start() {

            context.$store.commit('history/stopHistory')

            if (modifiers.clone) {

              clone = el.cloneNode(true)

              const rect = el.getBoundingClientRect()

              el.parentElement.insertBefore(clone, el)

              document.body.appendChild(el)

              el.style.position = 'absolute'
              el.style.left = 0
              el.style.top = 0

              position = { left: rect.left, top: rect.top }
            } else {
              position = value.rect
            }

            draggable = {
              el,
              value,
              modifiers,
              data,
            }

            if (data.on && data.on.dragstart)
              data.on.dragstart(draggable)
          },
          move (event) {
            position.left += event.dx
            position.top += event.dy
            el.style.transform =`translate(${position.left}px, ${position.top}px)`
          },
          end(event) {

            if (data.on && data.on.dragend)
              data.on.dragend(draggable)

            if (!value.id && dropzone) {

              const rect = {
                ...event.rect,
                ...value.rect,
              }

              rect.top -= dropzone.rect.top
              rect.left -= dropzone.rect.left

              dropzone.value.elements.push({
                id: uid(),
                ...value,
                rect,
              })

              dropzone = null
            }

            context.$store.commit('history/startHistory')
            context.$store.dispatch('history/addHistory')

            if (modifiers.clone) {
              clone.parentElement.insertBefore(el, clone)
              clone.remove()
              el.style.removeProperty('position')
              el.style.removeProperty('left')
              el.style.removeProperty('top')
              el.style.removeProperty('transform')
            }
          }
        }
      })
    }

    Vue.directive('draggable', {
      inserted: _draggable,
      componentUpdated: _draggable,
    })

    function _dropzone (el, { value }) {
      interact(el).
      dropzone({
        ondrop() {
          const rect = el.getBoundingClientRect()
          dropzone = {
            rect,
            value,
          }
        }
      }).
      on('dragenter', () => {
        if (draggable.data.on && draggable.data.on.dragenter)
          draggable.data.on.dragenter(draggable)
      }).
      on('dragleave', () => {
        if (draggable.data.on && draggable.data.on.dragleave)
          draggable.data.on.dragleave(draggable)
      })
    }

    Vue.directive('dropzone', {
      inserted: _dropzone,
      componentUpdated: _dropzone,
    })

    function _resizableText (el, { value }, { context }) {
      interact(el).
      resizable({
        edges: { top: true, right: true, bottom: true, left: true },
        modifiers: [
          interact.modifiers.aspectRatio({
            ratio: 'preserve',
            equalDelta: true,
          })
        ],
        listeners: {
          move(event) {

            const x = (event.deltaRect.left - event.deltaRect.right) / 100
            const y = (event.deltaRect.top - event.deltaRect.bottom) / 100

            if (x && value.x - x > 0.2) {
              value.x -= x
              value.y = value.x
            } else if (y && value.y - y > 0.2) {
              value.y -= y
              value.x = value.y
            }
          }
        },
      }).
      on('resizestart', () => {
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
      })
    }

    Vue.directive('resizableText', {
      inserted: _resizableText,
      componentUpdated: _resizableText,
    })

    function _resizableDish (el, { value }, { context }) {
      interact(el).
      resizable({
        edges: { right: true, left: true },
        listeners: {
          move(event) {
            if (value.width + event.deltaRect.width < 80)
              return
            value.left += event.deltaRect.left
            value.width += event.deltaRect.width
          }
        },
      }).
      on('resizestart', () => {
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
      })
    }

    Vue.directive('resizableDish', {
      inserted: _resizableDish,
      componentUpdated: _resizableDish,
    })

    function _resizableImage (el, { value }, { context }) {

      interact(el).
      resizable({
        edges: { top: true, right: true, bottom: true, left: true },
        listeners: {
          move(event) {
            if (value.width + event.deltaRect.width > 80) {
              value.left += event.deltaRect.left
              value.width += event.deltaRect.width
            }
            if (value.height + event.deltaRect.height > 80) {
              value.top += event.deltaRect.top
              value.height += event.deltaRect.height
            }
          }
        },
      }).
      on('resizestart', () => {
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
      })
    }

    Vue.directive('resizableImage', {
      inserted: _resizableImage,
      componentUpdated: _resizableImage,
    })
  }
}
