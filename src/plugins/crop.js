import Rect from '@/helpers/rect'

export default {

  install(Vue) {

    Vue.directive('cropResizable', {

      bind (el, binding, { context }) {

        function getValue (name) {
          return parseFloat(inner.style.getPropertyValue(name))
        }

        function mousemove (e) {

          const rect = new Rect(
            rotate,
            cloneRect.x,
            cloneRect.y,
            cloneRect.width,
            cloneRect.height
          )

          let scale = context.$store.state.scale.value

          if (isItem)
            scale = 1

          const value = rect.getTopLeft()
          const position = rect.getReverseValue(
            (e.x - value.x) / scale,
            (e.y - value.y) / scale
          )

          let opposite
          if (arg === 'top-left') {
            opposite = {
              x: getValue('left') + getValue('width'),
              y: getValue('top') + getValue('height')
            }
          } else if (arg === 'top-right') {
            opposite = {
              x: getValue('left'),
              y: getValue('top') + getValue('height')
            }
          } else if (arg === 'bottom-right') {
            opposite = {
              x: getValue('left'),
              y: getValue('top')
            }
          } else if (arg === 'bottom-left') {
            opposite = {
              x: getValue('left') + getValue('width'),
              y: getValue('top')
            }
          }

          let left = Math.min(position.x, opposite.x)
          let top = Math.min(position.y, opposite.y)

          let width, height

          if (arg === 'top-left' || arg === 'bottom-left')
            width = opposite.x - position.x
          else
            width = position.x - opposite.x

          if (arg === 'top-left' || arg === 'top-right')
            height = opposite.y - position.y
          else
            height = position.y - opposite.y

          if (left < 0) {
            width += left - 0
            left = 0
          }

          if (top < 0) {
            height += top - 0
            top = 0
          }

          const rectWidth = cloneRect.width / scale
          const rectHeight = cloneRect.height / scale

          if (left + width > rectWidth)
            width = rectWidth - left

          if (top + height > rectHeight)
            height = rectHeight - top

          if (width < min) {
            if (arg === 'top-right' || arg === 'bottom-right' || getValue('width') === min)
              left = getValue('left')
            else
              left = getValue('left') + (getValue('width') - min)
            width = min
          }

          if (height < min) {
            if (arg === 'bottom-left' || arg === 'bottom-right' || getValue('height') === min)
              top = getValue('top')
            else
              top = getValue('top') + (getValue('height') - min)
            height = min
          }

          if (keepRatio) {
            if (rectWidth > rectHeight) {
              if (arg === 'top-left' || arg === 'bottom-left')
                left += width - height
              width = height
            } else {
              if (arg === 'top-left' || arg === 'top-right')
                top += height - width
              height = width
            }
          }

          inner.style.setProperty('width', width + 'px')
          inner.style.setProperty('height', height + 'px')
          inner.style.setProperty('left', left + 'px')
          inner.style.setProperty('top', top + 'px')
          image.style.setProperty('left', left * -1 + 'px')
          image.style.setProperty('top', top * -1 + 'px')
        }

        function mouseup () {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
        }

        function click () {
          delete document.cropUnactive
          document.body.removeEventListener('click', click)
        }

        const arg = binding.arg
        const min = 24

        let crop, inner, image, rotate, cloneRect, isItem, keepRatio

        el.addEventListener('mousedown', e => {
          if (e.button !== 0) return
          document.cropUnactive = true
          e.stopPropagation()
          e.preventDefault()
          crop = document.querySelector('.crop')
          inner = crop.querySelector('[crop-inner]')
          image = crop.querySelector('[crop-image]')
          rotate = crop.getAttribute('rotate')
          isItem = crop.getAttribute('image-item')
          keepRatio = crop.getAttribute('keep-ratio')
          if (isItem) {
            cloneRect = crop.getBoundingClientRect()
          } else {
            const clone = crop.cloneNode(true)
            clone.style.removeProperty('transform')
            document.body.appendChild(clone)
            cloneRect = clone.getBoundingClientRect()
            clone.remove()
          }
          document.addEventListener('mousemove', mousemove)
          document.addEventListener('mouseup', mouseup)
          document.body.addEventListener('click', click)
        })
      }
    })

    Vue.directive('cropDraggable', {

      bind (el, binding, { context }) {

        function mousemove (e) {

          let scale = context.$store.state.scale.value

          if (isItem)
            scale = 1

          const position = rect.getReverseValue(
            (e.x - value.x) / scale,
            (e.y - value.y) / scale
          )

          position.x -= x
          position.y -= y

          const opposite = {
            x: getValue('left') + width,
            y: getValue('top') + height
          }

          let left = Math.min(position.x, opposite.x)
          let top = Math.min(position.y, opposite.y)

          if (left < 0)
            left = 0

          if (top < 0)
            top = 0

          if (left + width > rectWidth)
            left = rectWidth - width

          if (top + height > rectheight)
            top = rectheight - height

          inner.style.setProperty('left', left + 'px')
          inner.style.setProperty('top', top + 'px')
          image.style.setProperty('left', left * -1 + 'px')
          image.style.setProperty('top', top * -1 + 'px')
        }

        function mouseup () {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
        }

        function click () {
          delete document.cropUnactive
          document.body.removeEventListener('click', click)
        }

        function getValue (name) {
          return parseFloat(inner.style.getPropertyValue(name))
        }

        let crop, inner, image, rotate, rect, cloneRect, value, width, height, rectWidth, rectheight, isItem, x, y

        el.addEventListener('mousedown', e => {

          if (e.button !== 0) return

          document.cropUnactive = true

          crop = document.querySelector('.crop')
          rotate = crop.getAttribute('rotate')
          isItem = crop.getAttribute('image-item')

          if (isItem) {
            cloneRect = crop.getBoundingClientRect()
          } else {
            const clone = crop.cloneNode(true)
            clone.style.removeProperty('transform')
            document.body.appendChild(clone)
            cloneRect = clone.getBoundingClientRect()
            clone.remove()
          }

          inner = crop.querySelector('[crop-inner]')
          image = crop.querySelector('[crop-image]')

          let scale = context.$store.state.scale.value

          if (isItem)
            scale = 1

          rect = new Rect(
            rotate,
            cloneRect.x,
            cloneRect.y,
            cloneRect.width,
            cloneRect.height
          )

          value = rect.getTopLeft()

          const position = rect.getReverseValue(
            (e.x - value.x) / scale,
            (e.y - value.y) / scale
          )

          const topLeft = {
            x: getValue('left'),
            y: getValue('top')
          }

          x = position.x - topLeft.x
          y = position.y - topLeft.y

          width = getValue('width')
          height = getValue('height')
          rectWidth = cloneRect.width / scale
          rectheight = cloneRect.height / scale

          document.addEventListener('mousemove', mousemove)
          document.addEventListener('mouseup', mouseup)
          document.body.addEventListener('click', click)
        })
      }
    })
  }
}
