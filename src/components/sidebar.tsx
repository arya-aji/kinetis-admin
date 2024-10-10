import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1362 1922"
              version="1.1"
              className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}
            >
              <path d="M 794.748 325.668 L 666 497.336 666 793.668 C 666 956.651, 666.337 1089.982, 666.750 1089.959 C 667.163 1089.937, 823.650 881.299, 1014.500 626.321 C 1339.727 191.813, 1361.519 162.450, 1361.805 158.362 L 1362.110 154 1142.803 154 L 923.496 154 794.748 325.668 M 908.287 1075.250 C 906.764 1077.237, 573.180 1658.307, 572.447 1660.250 C 571.818 1661.914, 587.052 1662, 883.643 1662.002 C 1055.164 1662.003, 1208.035 1662.301, 1223.355 1662.665 C 1248.304 1663.258, 1251.173 1663.164, 1250.855 1661.765 C 1250.366 1659.615, 910.654 1074.070, 909.872 1074.031 C 909.527 1074.014, 908.814 1074.563, 908.287 1075.250" stroke="none" fill="#e48c3c" fillRule="evenodd" />
              <path d="M 2.918 370.250 C 2.874 573.888, 2.362 793.375, 1.782 858 C 0.533 997.113, 0.529 1016.257, 1.693 1341.500 L 2.591 1592.500 6.231 1606.500 C 18.122 1652.236, 33.776 1691.047, 50.902 1717.251 C 89.557 1776.398, 140.919 1822.307, 199.487 1850.061 C 239.012 1868.790, 291.599 1884.087, 334.890 1889.446 C 349.718 1891.282, 375.356 1892.531, 380.068 1891.647 L 383.500 1891.003 383.231 1087.344 L 382.962 283.685 380.921 275.592 C 369.846 231.684, 348.948 187.478, 323.303 153.714 C 313.222 140.442, 285.743 112.929, 270.500 100.847 C 238.514 75.493, 205.894 55.706, 175.630 43.301 C 138.167 27.944, 94.227 14.763, 55 7.116 C 39.431 4.081, 11.265 -0, 5.884 -0 L 3 0 2.918 370.250" stroke="none" fill="#1174ac" fillRule="evenodd" />
            </svg>


            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium'>KINETIS</span>
              <span className='text-xs'>Aplikasi kita semua</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
