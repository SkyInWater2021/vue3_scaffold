export function getMenuIcon(name: string, suffix = "svg") {
  const path = `/src/assets/menu-icons/${name}.${suffix}`
  const modules: any = import.meta.glob("@/assets/menu-icons/*", { eager: true })
  return modules?.[path]?.default
}

export function getWeatherIcon(name: string, suffix = "png") {
  const path = `/src/assets/weather-icons/${name}.${suffix}`
  const modules: any = import.meta.glob("@/assets/weather-icons/*", { eager: true })
  return modules?.[path]?.default
}
