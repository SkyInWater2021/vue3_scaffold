// ? ========== 导入图表 ==============
import { BarChart, LineChart, PictorialBarChart } from "echarts/charts"
// ? ========== 导入必要的组件 ==============
import {
  // 数据集组件
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components"
// * ========== 导入核心代码 ==============
import * as echarts from "echarts/core"
// * ========== 导入新特性插件 ==============
import { LabelLayout, UniversalTransition } from "echarts/features"
// * ========== 导入渲染器 ==============
import { CanvasRenderer } from "echarts/renderers"

//  ========== 导入图表类型 系列类型的定义后缀都为 SeriesOption ==============
import type { BarSeriesOption, LineSeriesOption, PictorialBarSeriesOption } from "echarts/charts"
//  ========== 导入组件类型 组件类型的定义后缀都为 ComponentOption==============
import type {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts/components"
// * ========== 导入组合类型 ==============
import type { ComposeOption } from "echarts/core"

// ? ========== 当前组合类型 ==============
export type ECOption = ComposeOption<
  // 图表
  | BarSeriesOption
  | LineSeriesOption
  | PictorialBarSeriesOption

  // 组件
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

echarts.use([
  // 组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,

  // 图表
  BarChart,
  LineChart,
  PictorialBarChart,

  // 新特性插件
  LabelLayout,
  UniversalTransition,

  // 渲染器
  CanvasRenderer,
])

export { echarts }
