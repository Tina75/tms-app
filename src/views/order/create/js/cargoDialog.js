import { UNIT_TYPE } from '../../js/constant'
import precesion from '@/components/Form/js/precision'

export default {
  // 填写尺寸对话框
  showSizeDialog (index) {
    const temp = this.formList[index]
    this.$createDialog({
      title: '包装尺寸(毫米)',
      type: 'confirm',
      onConfirm: () => {
        // let extra = { volume: temp.volume, size: '' }
        // if (!temp.volume) {
        //   extra.volume = NP.round(
        //     NP.divide(
        //       NP.times(this.size.length || 0, this.size.width || 0, this.size.height || 0),
        //       1000 * 1000 * 1000
        //     ),
        //     6
        //   )
        // }
        const { length, width, height } = temp.dimension
        const size = !length && !width && !height ? '' : [ length || '-', width || '-', height || '-' ].join('x')
        this.formList.splice(this.dialogIndex, 1, Object.assign(temp, { size }))
      }
    }, createElement => {
      function formatVal (val) {
        if (val === '') return ''
        const number = precesion(val, 1)
        if (number !== val) return Number(number)
        else return Number(val)
      }

      return createElement('div', {
        slot: 'content',
        class: 'cargo-info-size-dialog'
      }, [
        createElement('cube-input', {
          class: 'cargo-info-size-dialog-item',
          props: { placeholder: '长', type: 'number', value: temp.dimension.length, autofocus: true },
          on: {
            blur: ({ target }) => { temp.dimension.length = target.value = formatVal(target.value) }
          }
        }),
        createElement('cube-input', {
          class: 'cargo-info-size-dialog-item',
          props: { placeholder: '宽', type: 'number', value: temp.dimension.width },
          on: {
            blur: ({ target }) => { temp.dimension.width = target.value = formatVal(target.value) }
          }
        }),
        createElement('cube-input', {
          class: 'cargo-info-size-dialog-item',
          props: { placeholder: '高', type: 'number', value: temp.dimension.height },
          on: {
            blur: ({ target }) => { temp.dimension.height = target.value = formatVal(target.value) }
          }
        })
      ])
    }).show()
  },
  // 填写包装对话框
  showUnitDialog (index) {
    const temp = this.formList[index]
    this.unit = temp.unit
    this.$createDialog({
      title: '包装方式',
      type: 'confirm',
      onConfirm: () => {
        temp.unit = this.unit
        this.unit = ''
      }
    }, createElement => {
      const buttons = UNIT_TYPE.map(item => createElement(
        'cube-button',
        {
          props: { light: true, inline: true },
          style: { margin: '5px' },
          on: { click: () => { this.unit = item.text } }
        },
        item.text)
      )
      return createElement('div', {
        slot: 'content',
        style: {
          margin: '0 10px'
        }
      }, [
        createElement('cube-input', {
          props: { value: this.unit, placeholder: '请输入', maxlength: 10 },
          on: {
            blur: ({ target }) => {
              this.unit = target.value
            }
          },
          ref: '$unitInput'
        }),
        ...buttons
      ])
    }).show()
  }
}
