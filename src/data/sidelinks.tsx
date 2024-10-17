import {
  IconApps,
  IconGhost2,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconHexagonNumber6,
  IconLayoutDashboard,
  IconUsers,
  IconUserShield,
} from '@tabler/icons-react'
import { ThemeSwitch } from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Kegiatan Rutin',
    label: '',
    href: '/kegiatan',
    icon: <IconApps size={18} />,
  },
  {
    title: 'Proyek Pembangunan',
    label: '',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Sistem Anggaran Kinerja Pemerintahan',
        label: '',
        href: '/sakip',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Zona Integritas',
        label: '',
        href: '/zi',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Manajemen Risiko',
        label: '',
        href: '/risiko',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Monitoring Evaluasi',
        label: '',
        href: '/monev',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Manajemen Kinerja',
        label: '',
        href: '/kinerja',
        icon: <IconHexagonNumber5 size={18} />,
      },
      {
        title: 'Dokumentasi Kegiatan',
        label: '',
        href: '/dokumentasi',
        icon: <IconHexagonNumber6 size={18} />,
      },
    ],
  },
  {
    title: 'Pemilihan Umum',
    label: '',
    href: '/voting',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Daftar Penunggu Kantor',
    label: '',
    href: '/pegawai',
    icon: <IconGhost2 size={18} />,
  },
]

// Add a new export for the bottom content
export const SidebarBottomContent: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
  <div className="mt-auto p-4">
    <div className="flex items-center justify-between">
      {!isCollapsed && <ThemeSwitch />}
      <UserNav />
    </div>
  </div>
)

