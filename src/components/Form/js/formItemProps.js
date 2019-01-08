export default {
  value: [ String, Number ],
  label: String,
  prop: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
    validator: value => itemInArray(value, [ 'text', 'textarea', 'number', 'money', 'telephone', 'click' ])
  },
  labelIcon: String,
  clickIcon: String,
  maxlength: {
    type: [ String, Number ],
    default: Infinity
  },
  required: {
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
  showArrow: {
    type: Boolean,
    default: true
  }
}

const itemInArray = (item, array) => array.indexOf(item) > -1
