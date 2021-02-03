import interact from 'interactjs'
import { v4 as uid } from 'uuid'

let dropzone
let draggable

export default {

  install (Vue) {

    let clone
    let position

    function _draggable (el, { value, modifiers }, { data, context }) {

      if (value.disabled)
        return interact(el).unset()

      el.style.touchAction = 'none'

      interact(el).
      draggable({

        listeners: {

          start() {

            context.$store.dispatch('element/dragElement', value.id)
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

            setTimeout(() => context.$store.dispatch('element/dragElement', null))

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

      const { disabled, element } = value

      if (disabled)
        return interact(el).unset()

      interact(el).
      resizable({
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true
        },
        modifiers: [
          interact.modifiers.aspectRatio({
            ratio: 'preserve',
            equalDelta: true,
          })
        ],
        listeners: {
          move(event) {

            const scale = context.$store.state.scale.value

            const x = (event.deltaRect.left - event.deltaRect.right) / 200 / scale
            const y = (event.deltaRect.top - event.deltaRect.bottom) / 200 / scale

            if (x && element.scale.x - x > 0.2) {
              element.scale.x -= x
              element.scale.y = element.scale.x
            } else if (y && element.scale.y - y > 0.2) {
              element.scale.y -= y
              element.scale.x = element.scale.y
            }
          }
        },
      }).
      on('resizestart', () => {
        context.$store.commit('element/resizeElement', element.id)
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
        setTimeout(() => context.$store.commit('element/resizeElement', null))
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
            if (value.rect.width + event.deltaRect.width < 80)
              return
            const scale = context.$store.state.scale.value
            value.rect.left += event.deltaRect.left / scale
            value.rect.width += event.deltaRect.width / scale
          }
        },
      }).
      on('resizestart', () => {
        context.$store.commit('element/resizeElement', value.id)
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
        setTimeout(() => context.$store.commit('element/resizeElement', null))
      })
    }

    Vue.directive('resizableDish', {
      inserted: _resizableDish,
      componentUpdated: _resizableDish,
    })
  }
}
