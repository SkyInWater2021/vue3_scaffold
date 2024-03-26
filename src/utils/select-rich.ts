import { SelectItem } from "@/types"

export class SelectOptions {
  options: SelectItem[]

  constructor(options: SelectItem[]) {
    this.options = options
  }

  private findItem(predicate: (item: SelectItem) => boolean) {
    const index = this.options.findIndex(predicate)
    const item = index !== -1 ? this.options[index] : undefined
    return { item, index }
  }

  // 自定义创建一个选项组
  static createWithOptions(
    options: SelectItem[],
    fn?: (options: SelectItem[]) => SelectItem[],
  ): SelectOptions {
    const processedOptions = typeof fn === "function" ? fn(options) : options
    return new SelectOptions(processedOptions)
  }

  findItemByLabel(label: SelectItem["label"]) {
    return this.findItem(item => item.label === label)
  }

  findItemByVal(value: SelectItem["value"]) {
    return this.findItem(item => item.value === value)
  }

  getLabel(value: SelectItem["value"], defaultLabel = "-"): string {
    const { item } = this.findItemByVal(value)
    return item ? item.label : defaultLabel
  }

  getValue(label: SelectItem["label"]): SelectItem["value"] | undefined {
    const { item } = this.findItemByLabel(label)
    return item?.value
  }
}
