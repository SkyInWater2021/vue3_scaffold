export const checkBarClassify = [
  {
    title: "降水",
    name: "降水",
    options: [
      { text: "过去1小时降水", value: "过去1小时降水" },
      { text: "过去3小时降水", value: "过去3小时降水" },
      { text: "过去6小时降水", value: "过去6小时降水" },
      { text: "过去12小时降水", value: "过去12小时降水" },
      { text: "过去24小时降水", value: "过去24小时降水" },
    ],
  },
  {
    title: "气温",
    name: "气温",
    options: [
      { text: "当前气温", value: "当前气温" },
      { text: "最高气温", value: "最高气温" },
      { text: "最低气温", value: "最低气温" },
      { text: "24小时变温", value: "24小时变温" },
      { text: "过去24小时最高气温", value: "过去24小时最高气温" },
      { text: "过去24小时最低气温", value: "过去24小时最低气温" },
    ],
  },
  {
    title: "气压",
    name: "气压",
    options: [
      { text: "本站气压", value: "本站气压" },
      { text: "海平面气压", value: "海平面气压" },
      { text: "最高气压", value: "最高气压" },
      { text: "最低气压", value: "最低气压" },
      { text: "3小时变压", value: "3小时变压" },
      { text: "24小时变压", value: "24小时变压" },
    ],
  },
  {
    title: "湿度",
    name: "湿度",
    options: [
      { text: "相对湿度", value: "相对湿度" },
      { text: "最小相对湿度", value: "最小相对湿度" },
      { text: "露点温度", value: "露点温度" },
    ],
  },
  {
    title: "能见度",
    name: "能见度",
    options: [
      { text: "10分钟平均水平能见度", value: "10分钟平均水平能见度" },
      { text: "1分钟平均水平能见度", value: "1分钟平均水平能见度" },
      { text: "最小水平能见度", value: "最小水平能见度" },
    ],
  },
  {
    title: "风",
    name: "风",
    options: [
      { text: "2分钟平均风向风速", value: "2分钟平均风向风速" },
      { text: "10分钟平均风向风速", value: "10分钟平均风向风速" },
      { text: "最大风向风速", value: "最大风向风速" },
      { text: "瞬时风向风速", value: "瞬时风向风速" },
      { text: "极大风向风速", value: "极大风向风速" },
    ],
  },
  {
    title: "综合判识",
    name: "综合判识",
    options: [
      { text: "总云量", value: "总云量" },
      { text: "云底高度", value: "云底高度" },
      { text: "雨凇", value: "雨凇" },
      { text: "雾凇", value: "雾凇" },
      { text: "电线积冰-现象", value: "电线积冰-现象" },
      { text: "露", value: "露" },
      { text: "霜", value: "霜" },
      { text: "积雪", value: "积雪" },
      { text: "积雪深度", value: "积雪深度" },
      { text: "雪压", value: "雪压" },
    ],
  },
  {
    title: "其他",
    name: "其他",
    options: [
      { text: "积雪深度", value: "积雪深度" },
      { text: "现在天气", value: "现在天气" },
      { text: "蒸发", value: "蒸发" },
    ],
  },
]

export const dropMenus = [
  {
    title: "区域",
    name: "area",
    options: [{ text: "四川省", value: "四川省" }],
  },
  {
    title: "站点类型",
    name: "stationType",
    options: [
      { text: "考核站", value: "考核站" },
      { text: "国家站", value: "国家站" },
      { text: "区域站", value: "区域站" },
    ],
  },
  {
    title: "时次",
    name: "timeOrder",
    options: [
      { text: "单时次", value: "单时次" },
      { text: "任意时次", value: "任意时次" },
    ],
  },
  {
    title: "时间尺度",
    name: "scale",
    options: [
      { text: "小时", value: "小时" },
      { text: "5分钟", value: "5分钟" },
    ],
  },
]

export const checkLayerTypes = [
  { title: "站点数据", name: "站点数据" },
  { title: "色斑图", name: "色斑图" },
]

export const checkBoxItems = [
  { value: "stationName", text: "站名" },
  { value: "stationNumber", text: "站号" },
  { value: "normal", text: "正确" },
  { value: "error", text: "错误" },
  { value: "dubious", text: "可疑" },
]
