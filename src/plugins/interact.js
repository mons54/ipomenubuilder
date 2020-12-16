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
          start(event) {

            if (
              ['dish', 'text'].includes(value.type) &&
              context.$store.state.element.actived === value
            )
              return event.interaction.stop()

            context.$store.dispatch('element/clickElement', null)
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

              value = JSON.parse(JSON.stringify(value))

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
        context.$store.dispatch('element/clickElement', null)
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
        context.$store.dispatch('element/clickElement', null)
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
        modifiers: [
          interact.modifiers.aspectRatio({
            ratio: 'preserve',
            equalDelta: true,
          })
        ],
        listeners: {
          move(event) {

            const rect = value.rect
            const delta = event.deltaRect

            if (rect.width + delta.width <= 80 || rect.height + delta.height <= 80)
              return

            const size = value.size

            const { left, right, top, bottom } = event.edges

            if (left && !top && !bottom) {
              rect.left += delta.left
              rect.width += delta.width
              size.left += delta.left
            } else if (right && !top && !bottom) {
              rect.left += delta.left
              rect.width += delta.width
            } else if (top && !left && !right) {
              rect.top += delta.top
              rect.height += delta.height
              size.top += delta.top
            } else if (bottom && !left && !right) {
              rect.top += delta.top
              rect.height += delta.height
            } else {
              rect.top += delta.top
              rect.left += delta.left
              rect.width += delta.width
              rect.height += delta.height
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
