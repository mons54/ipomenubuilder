import interact from 'interactjs'
import { v4 as uid } from 'uuid'

let dropzone
let scale

export default {
  install (Vue) {
    Vue.directive('draggable', {
      inserted (el, { value, modifiers }, { data }) {

        let clone
        let position

        el.style.touchAction = 'none'

        interact(el).draggable({
          listeners: {
            start() {

              scale = 0.5

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

              if (data.on && data.on.dragStart)
                data.on.dragStart(el)
            },
            move (event) {
              position.left += event.dx
              position.top += event.dy
              el.style.transform =`translate(${position.left}px, ${position.top}px) scale(${scale})`
            },
            end(event) {

              if (data.on && data.on.dragEnd)
                data.on.dragEnd(el)

              if (!value.id && dropzone) {

                const rect = event.rect

                rect.top -= dropzone.rect.top
                rect.left -= dropzone.rect.left

                dropzone.value.elements.push({
                  id: uid(),
                  rect,
                  ...value,
                })

                dropzone = null
              }

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
    })

    Vue.directive('dropzone', {
      inserted (el, { value }) {
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
          scale = 1
        }).
        on('dragleave', () => {
          scale = 0.5
        })
      }
    })
  }
}
