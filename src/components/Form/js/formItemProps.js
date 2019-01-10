export default {
  value: [ String, Number, Boolean ],
  label: String,
  // prop: String,
  required: {
    type: Boolean,
    default: false
  },
  requiredMsg: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
    validator: value => itemInArray(value, [ 'text', 'textarea', 'number', 'switch', 'click' ])
  },
  labelImage: String,
  clickIcon: String, // 右侧可点击按钮的图标，没有则不显示
  autofocus: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [ String, Number ],
    default: Infinity
  }, // type = textarea 且值不为 Infinity 时会在输入框下发显示计数器
  rows: {
    type: [ String, Number ],
    default: 2
  },
  clearable: {
    type: Boolean,
    default: false
  },
  ellipsis: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'right',
    validator: value => itemInArray(value, [ 'left', 'center', 'right' ])
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showRequiredToast: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: true
  } // type = click 时默认显示右侧箭头，如不显示则传 false
}

const itemInArray = (item, array) => array.indexOf(item) > -1
