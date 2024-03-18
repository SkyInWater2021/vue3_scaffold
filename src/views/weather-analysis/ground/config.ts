export const plotConfig = {
  // interfaceUrl: "aa.json",
  // icon: "left_wendu",
  // parmas: { bbox: "", ids: [], radius: 0 },
  name: "地图填图",
  title: "地图填图",
  id: "groundStation",
  type: "Site",
  showHide: true,
  Opacity: 1,
  zIndex: 10,
  legend: [
    { label: "风向杆", name: "WIN", value: "WIN_S_Avg_10mi", color: "#ff4949", disabled: false },
    { label: "24h气温", name: "T24", value: "TEM_ChANGE_24h", color: "#ff4949", disabled: false },
    { label: "24h变压", name: "P24", value: "PRS_Change_24h", color: "#005ddb", disabled: false },
    { label: "气温", name: "T", value: "TEM", color: "#ff4949", disabled: false },
    { label: "气压", name: "P", value: "PRS", color: "#005ddb", disabled: false },
    { label: "海平面气压", name: "Sp", value: "PRS_Sea", color: "#00b009", disabled: false },
    { label: "天气现象", name: "ww", value: "WEP_Now", color: "#333333", disabled: false },
    { label: "总云量", name: "N", value: "CLO_Cov", color: "#333333", disabled: false },
    { label: "高云云状", name: "CH", value: "CLO_Fome_High", color: "#333333", disabled: false },
    { label: "中云云状", name: "CM", value: "CLO_FOME_MID", color: "#333333", disabled: false },
    { label: "3h变压", name: "P3", value: "PRS_Change_3h", color: "#005ddb", disabled: false },
    { label: "露点温度", name: "Td", value: "DPT", color: "#00b009", disabled: false },
    { label: "低云云状", name: "CL", value: "CLO_Fome_Low", color: "#333333", disabled: false },
    { label: "过去天气现象1", name: "W1", value: "WEP_Past_1", color: "#333333", disabled: false },
    { label: "过去天气现象2", name: "W2", value: "WEP_Past_2", color: "#333333", disabled: false },
    { label: "能见度", name: "VV", value: "VIS", color: "#ff4949", disabled: false },
    { label: "低云云高", name: "h", value: "CLO_Height_LoM", color: "#333333", disabled: false },
    { label: "低云量", name: "Nh", value: "CLO_Cov_Low", color: "#fe00f5", disabled: false },
    { label: "过去6h降水", name: "R6", value: "PRE_6h", color: "#00b009", disabled: false },
    { label: "站号", name: "Std", value: "Station_Id_C", color: "#00b009", disabled: false },
  ],

  factorClolorOffset: {
    TEM_ChANGE_24h: [-80, -60, "#ff4949"],
    PRS_Change_24h: [30, -60, "#005ddb"],
    TEM: [-80, -30, "#ff4949"],
    PRS: [30, -30, "#005ddb"],
    PRS_Sea: [80, 11, "#00b009"],
    PRS_Change_3h: [30, 11, "#005ddb"],
    DPT: [-80, 30, "#00b009"],
    VIS: [-80, 60, "#ff4949"],
    CLO_Height_LoM: [-15, 60, "#000000"],
    CLO_Cov_Low: [60, 60, "#fe00f5"],
    PRE_6h: [90, 60, "#00b009"],
    Station_Id_C: [90, 90, "#00b009"],
    default: [-80, 100, "#ff4949"],
  },
}

export const hourItems = [
  { text: "02时", value: "02" },
  { text: "05时", value: "05" },
  { text: "07时", value: "07" },
  { text: "08时", value: "08" },
  { text: "11时", value: "11" },
  { text: "14时", value: "14" },
  { text: "17时", value: "17" },
  { text: "20时", value: "20" },
  { text: "23时", value: "23" },
]