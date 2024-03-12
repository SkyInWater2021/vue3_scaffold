export function useMenuIcon(name: string, suffix = "svg") {
  const path = `/src/assets/menu-icons/${name}.${suffix}`
  const modules: any = import.meta.glob("@/assets/menu-icons/*", { eager: true })
  return modules?.[path]?.default
}
