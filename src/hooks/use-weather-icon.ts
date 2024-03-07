export function useWeatherIcon(name: string, suffix = "svg") {
  const path = `/src/assets/weather-icons/${name}.${suffix}`
  const modules: any = import.meta.glob("@/assets/weather-icons/*", { eager: true })
  return modules?.[path]?.default
}
