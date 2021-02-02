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

          start(event) {

            if (
              ['dish', 'text'].includes(value.type) &&
              context.$store.state.element.actived === value.id
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

      const { active, scale } = value

      if (!active)
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

            const scaleState = context.$store.state.scale.value

            const x = (event.deltaRect.left - event.deltaRect.right) / 200 / scaleState
            const y = (event.deltaRect.top - event.deltaRect.bottom) / 200 / scaleState

            if (x && scale.x - x > 0.2) {
              scale.x -= x
              scale.y = scale.x
            } else if (y && scale.y - y > 0.2) {
              scale.y -= y
              scale.x = scale.y
            }
          }
        },
      }).
      on('resizestart', () => {
        if (document.activeElement)
          document.activeElement.blur()
        context.$store.commit('element/onResize', true)
        context.$store.commit('history/stopHistory')
      }).
      on('resizeend', () => {
        context.$store.commit('history/startHistory')
        context.$store.dispatch('history/addHistory')
        setTimeout(() => context.$store.commit('element/onResize', false))
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
  }
}
