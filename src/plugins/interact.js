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
            ) return event.interaction.stop()

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
            const scale = value.id ? context.$store.state.scale.value : 1
            position.left += event.dx / scale
            position.top += event.dy / scale
            el.style.transform =`translate(${position.left}px, ${position.top}px)`
          },
          end(event) {

            if (data.on && data.on.dragend)
              data.on.dragend(draggable)

            if (!value.id && dropzone) {

              const scale = context.$store.state.scale.value

              for (const [key, value] of Object.entries(event.rect))
                event.rect[key] = value / scale

              const rect = {
                ...event.rect,
                ...value.rect,
              }

              rect.top -= dropzone.rect.top / scale
              rect.left -= dropzone.rect.left / scale

              value = JSON.parse(JSON.stringify({
                id: uid(),
                ...value,
                rect,
              }))

              if (value.elements)
                value.elements.forEach(item => {
                  item.id = uid()
                })

              dropzone.value.elements.push(value)

              dropzone = null

              context.$store.dispatch('element/activeElement', value)
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

    function _resizableScale (el, { value }, { context }) {
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

            const scale = context.$store.state.scale.value
            const x = (event.deltaRect.left - event.deltaRect.right) / 100 / scale
            const y = (event.deltaRect.top - event.deltaRect.bottom) / 100 / scale

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

    Vue.directive('resizableScale', {
      inserted: _resizableScale,
      componentUpdated: _resizableScale,
    })

    function _resizableDish (el, { value }, { context }) {
      interact(el).
      resizable({
        edges: { right: true, left: true },
        listeners: {
          move(event) {
            if (value.width + event.deltaRect.width < 80)
              return
            const scale = context.$store.state.scale.value
            value.left += event.deltaRect.left / scale
            value.width += event.deltaRect.width / scale
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
            const width = value.image.webformatWidth
            const height = value.image.webformatHeight
            const ratio = width / height
            const { left, right, top, bottom } = event.edges

            if (left) {
              rect.left += delta.left
              rect.width += delta.width
              size.left += delta.left
              if (delta.left < 0 && size.width < rect.width) {
                size.width = rect.width
                size.height = rect.width / ratio
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              } else if (delta.left > 0 && size.width > rect.width && rect.width > width) {
                if (ratio > rect.width / rect.height) {
                  size.width = rect.height * ratio
                  size.height = rect.height
                } else {
                  size.width = rect.width
                  size.height = rect.width / ratio
                }
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              }
            }

            if (right) {
              rect.left += delta.left
              rect.width += delta.width
              if (delta.right > 0 && size.width < rect.width) {
                size.width = rect.width
                size.height = rect.width / ratio
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              } else if (delta.right < 0 && size.width > rect.width && rect.width > width) {
                if (ratio > rect.width / rect.height) {
                  size.width = rect.height * ratio
                  size.height = rect.height
                } else {
                  size.width = rect.width
                  size.height = rect.width / ratio
                }
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              }
            }

            if (top) {
              rect.top += delta.top
              rect.height += delta.height
              size.top += delta.top
              if (delta.top < 0 && size.height < rect.height) {
                size.height = rect.height
                size.width = rect.height * ratio
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              } else if (delta.top > 0 && size.height > rect.height && rect.height > height) {
                if (ratio > rect.width / rect.height) {
                  size.height = rect.height
                  size.width = rect.height * ratio
                } else {
                  size.height = rect.width / ratio
                  size.width = rect.width
                }
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              }
            }

            if (bottom) {
              rect.top += delta.top
              rect.height += delta.height
              if (delta.bottom > 0 && size.height < rect.height) {
                size.height = rect.height
                size.width = rect.height * ratio
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              } else if (delta.bottom < 0 && size.height > rect.height && rect.height > height) {
                if (ratio > rect.width / rect.height) {
                  size.height = rect.height
                  size.width = rect.height * ratio
                } else {
                  size.height = rect.width / ratio
                  size.width = rect.width
                }
                size.top = (size.height - rect.height) / 2
                size.left = (size.width - rect.width) / 2
              }
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
