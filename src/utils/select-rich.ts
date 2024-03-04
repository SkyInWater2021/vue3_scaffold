import { SelectOption } from "@/types"

export class SelectOptions {
  options: SelectOption[]

  constructor(options: SelectOption[]) {
    this.options = options
  }

  private findItem(predicate: (item: SelectOption) => boolean) {
    const index = this.options.findIndex(predicate)
    const item = index !== -1 ? this.options[index] : undefined
    return { item, index }
  }

  // 自定义创建一个选项组
  static createWithOptions(
    options: SelectOption[],
    fn?: (options: SelectOption[]) => SelectOption[],
  ): SelectOptions {
    const processedOptions = typeof fn === "function" ? fn(options) : options
    return new SelectOptions(processedOptions)
  }

  findItemByLabel(label: SelectOption["label"]) {
    return this.findItem(item => item.label === label)
  }

  findItemByVal(value: SelectOption["value"]) {
    return this.findItem(item => item.value === value)
  }

  getLabel(value: SelectOption["value"], defaultLabel = "-"): string {
    const { item } = this.findItemByVal(value)
    return item ? item.label : defaultLabel
  }

  getValue(label: SelectOption["label"]): SelectOption["value"] | undefined {
    const { item } = this.findItemByLabel(label)
    return item?.value
  }
}
