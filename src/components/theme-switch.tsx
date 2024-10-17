import { useEffect } from 'react'
import { useTheme } from './theme-provider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { IconSun, IconMoon } from '@tabler/icons-react'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    metaThemeColor && metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center space-x-2">
      <IconSun className="h-4 w-4" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
      />
      <IconMoon className="h-4 w-4" />
      <Label htmlFor="theme-mode" className="sr-only">
        Toggle theme
      </Label>
    </div>
  )
}

export { ThemeSwitch }
export default ThemeSwitch
