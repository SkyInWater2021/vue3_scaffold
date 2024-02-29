import type { GlobalSelectOption } from "@/types"

type StrAndNum = string | number

// 封装一个操作下拉框选项数组的类
export class SelectOptions {
  options: GlobalSelectOption[]

  constructor(options: GlobalSelectOption[], fn?: (options: GlobalSelectOption[]) => void) {
    this.options = options
    if (typeof fn === "function") fn(this.options)
  }

  /**
   * 通过label查找
   * @param label 需要查找的label
   * @returns 一个对象,包含查找到的项和该项在数组中的索引
   * @author 何源
   */
  findItemByLabel(label: GlobalSelectOption["label"]) {
    const index = this.options.findIndex(item => item.label === label)
    const res = this.options[index]
    return { res, index }
  }

  /**
   * 通过value查找
   * @param value 需要查找的label
   * @returns 一个对象,包含查找到的项和该项在数组中的索引
   * @author 何源
   */
  findItemByVal(value: StrAndNum) {
    const index = this.options.findIndex(item => {
      return item.value === value
    })
    const res = this.options[index]
    return { res, index }
  }

  /**
   * 通过value值返回label值, 主要用于中文化后端返回的字段
   * @param value value字段值
   * @param customLabel 如果没找到,则返回该值,默认为 '-'
   * @returns 对应的label值
   */
  getLabel(value: StrAndNum, customLabel = "-") {
    return this.findItemByVal(value).res?.label ?? customLabel
  }

  /**
   * 通过label值返回value值
   * @param label label字段的值
   * @returns 对应的value值
   */
  getValue(label: GlobalSelectOption["label"]) {
    return this.findItemByLabel(label).res?.value
  }
}
