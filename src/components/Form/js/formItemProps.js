// form item type, contact同时支持手机和座机, phone 仅验证手机号
const FORM_ITEM_TYPE = [ 'text', 'textarea', 'number', 'switch', 'select', 'click', 'loading', 'phone' ]
const FORM_ITEM_ALIGN = [ 'left', 'center', 'right' ]
const itemInArray = (item, array) => array.indexOf(item) > -1

export default {
  value: {
    type: [ String, Number, Boolean ],
    required: true
  },
  // 输入框类型
  // text-文字输入框 number-数字输入框 textarea-文本框 switch-开关按钮
  // select-下拉框，该类型需要提供 options [{ text, value}] 属性, 提供的事件与cubeui select相同
  // click-点击按钮，该类型不会触发校验，提供on-click作为事件处理回调，并且无法自动校验，只能通过表单的validate进行校验
  type: {
    type: String,
    default: 'text',
    validator: value => itemInArray(value, FORM_ITEM_TYPE)
  },
  // select类型的选择数据
  options: {
    type: [Array, Promise],
    default: () => [] // { text, value }
  },
  // 输入框提示文字
  label: {
    type: String,
    default: ''
  },
  // 开启校验时，对应的 model 字段名
  prop: {
    type: String,
    default: ''
  },
  // 输入框是否必填
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  // 数值精度
  precision: {
    type: [ Number, String ],
    default: 0
  },
  // 当form item右侧存在一个单独的点击图标时传入该值，同时提供on-icon-click作为事件处理回调
  clickIcon: {
    type: String,
    default: ''
  },
  // 自动聚焦
  autofocus: {
    type: Boolean,
    default: false
  },
  // 焦点在末尾，type=text number 时有效
  focusOnEnd: {
    type: Boolean,
    default: true
  },
  // 当 type = textarea 且 maxlength != Infinity 或 0 时，会在文本框下方显示计数器
  maxlength: {
    type: [ String, Number ],
    default: Infinity
  },
  // type=textarea 时有效，文本框行数
  // rows: {
  //   type: [ String, Number ],
  //   default: 2
  // },
  // type = text || number 时有效，显示清空按钮
  clearable: {
    type: Boolean,
    default: false
  },
  // 必填项未输入时blur触发的msg，没有则默认提示label文字
  requiredMsg: {
    type: String,
    default: ''
  },
  // 关闭必填toast提示
  showRequiredToast: {
    type: Boolean,
    default: true
  },
  // 标签文字前面显示的image路径
  labelImage: {
    type: String,
    default: ''
  },
  // 是否显示form item下方的分割线
  bottomLine: {
    type: Boolean,
    default: true
  },
  // 当 type = click 时，回显的文本默认换行显示全部内容，如果需要省略显示则设置该值
  ellipsis: {
    type: Boolean,
    default: false
  },
  // 文本对其方式
  align: {
    type: String,
    default: 'right',
    validator: value => itemInArray(value, FORM_ITEM_ALIGN)
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // type = click 时默认显示右侧箭头，如不显示则传 false
  showArrow: {
    type: Boolean,
    default: true
  }
}
