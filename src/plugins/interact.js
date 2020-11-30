import interact from 'interactjs'
import { v4 as uid } from 'uuid'

let dropzone
let draggable

export default {
  install (Vue) {
    Vue.directive('draggable', {
      inserted (el, { value, modifiers }, { data }) {

        let clone
        let position

        el.style.touchAction = 'none'

        interact(el).
        draggable({
          listeners: {
            start() {

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

                const rect = event.rect

                rect.top -= dropzone.rect.top
                rect.left -= dropzone.rect.left

                dropzone.value.elements.push({
                  id: uid(),
                  rect,
                  scale: {
                    x: 1,
                    y: 1,
                  },
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
          if (draggable.data.on && draggable.data.on.dragenter)
            draggable.data.on.dragenter(draggable)
        }).
        on('dragleave', () => {
          if (draggable.data.on && draggable.data.on.dragleave)
            draggable.data.on.dragleave(draggable)
        })
      }
    })

    Vue.directive('resizable', {
      inserted (el, { value, modifiers }) {

        console.log(modifiers)

        let resizableModifiers = []

        if (modifiers.preserve) {
          resizableModifiers.push(interact.modifiers.aspectRatio({
            ratio: 'preserve',
            equalDelta: true,
          }))
        }

        interact(el).
        resizable({
          modifiers: resizableModifiers,
          edges: { top: true, right: true, bottom: true, left: true },
          listeners: {
            move(event) {

              const x = (event.deltaRect.left - event.deltaRect.right) / 100
              const y = (event.deltaRect.top - event.deltaRect.bottom) / 100


              if (value.x - x > 0.2)
                value.x -= x

              if (value.y - y > 0.2)
                value.y -= y

              if (modifiers.preserve) {
                if (x)
                  value.y = value.x
                else
                  value.x = value.y
              }
            }
          },
        })
      }
    })
  }
}
