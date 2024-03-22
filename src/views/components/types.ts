import type { Primitive } from "@/types"

// ----- 下拉菜单 -----
export type DropMenuValue = string | number
export type DropMenuText = string
export type DropData = Record<DropMenuText, DropMenuValue>
export interface DropMenuItem {
  title: string
  name: string
  options: Array<{
    value: DropMenuValue
    text: DropMenuText
    extra?: Record<string, Primitive>
  }>
}

//  ----- 选项卡 -----
export type CheckBarName = string
export type CheckBarText = string
export type CheckBarValue = string | number
export type CheckBarOptions = Array<{
  value: CheckBarValue
  text: CheckBarText
  extra?: Record<string, Primitive>
}>
export interface CheckBarInfo {
  checkName: CheckBarName
  checkValue?: CheckBarValue
  checkText?: CheckBarText
  options?: CheckBarOptions
}
export interface CheckBarItem {
  title: string
  name: CheckBarName
  options?: CheckBarOptions
}

//  ----- 多选框 -----
export type CheckBoxText = string
export type CheckBoxValue = string | number
export interface CheckBoxItem {
  value: CheckBoxValue
  text: CheckBoxText
  disabled?: boolean
}

// ----- tab标签 -----
export type TabValue = string | number
export type TabText = string
export type TabData = Record<TabText, TabValue>
export interface TabItem {
  title: string
  name: string
  options: Array<{
    value: TabValue
    text: TabText
    extra?: Record<string, Primitive>
  }>
}
