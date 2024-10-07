import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { apps } from './data'

const appText = new Map<string, string>([
  ['all', 'Semua Kegiatan'],
  ['umum', 'Umum'],
  ['sosial', 'Sosial'],
  ['ipds', 'IPDS'],
  ['distribusi', 'Distribusi'],
  ['produksi', 'Produksi'],
  ['nerwilis', 'Nerwilis'],
])

const fungsiColors: Record<string, string> = {
  produksi: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900', // Light Green
  ipds: 'bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900', // Blue Navy
  sosial: 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900', // Terracotta
  distribusi: 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900',
  umum: 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900',
  nerwilis: 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900',
}

export default function Apps() {
  const [sort, setSort] = useState('ascending');
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) => (appType === 'all' ? true : app.fungsi === appType))
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className="flex flex-col">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Routine Activities</h1>
          <p className="text-muted-foreground">
            Daftar Kegiatan Statistik di BPS Kota Jakarta Pusat
          </p>
        </div>
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
            <Input
              placeholder="Filter kegiatan..."
              className="h-9 w-40 lg:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className="w-36">
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Fungsi</SelectItem>
                <SelectItem value="umum">Umum</SelectItem>
                <SelectItem value="ipds">IPDS</SelectItem>
                <SelectItem value="sosial">Sosial</SelectItem>
                <SelectItem value="distribusi">Distribusi</SelectItem>
                <SelectItem value="produksi">Produksi</SelectItem>
                <SelectItem value="nerwilis">Nerwilis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-16">
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="ascending">
                <div className="flex items-center gap-4">
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value="descending">
                <div className="flex items-center gap-4">
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="shadow" />

        {/* Conditional rendering based on filteredApps */}
        {filteredApps.length === 0 ? (
          <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
            <p className="text-gray-500">Tidak ada kegiatan ditemukan</p>
          </div>
        ) : (
          <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <li
                key={app.name}
                className="rounded-lg border p-4 hover:shadow-md"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                  >
                    {app.logo}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border ${fungsiColors[app.fungsi] || 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-900'}`}
                  >
                    {app.fungsi.charAt(0).toUpperCase() + app.fungsi.slice(1)}
                  </Button>
                </div>
                <div>
                  <h2 className="mb-1 font-semibold">{app.name}</h2>
                  <p className="line-clamp-2 text-gray-500">{app.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Layout.Body>
    </Layout>
  );
}

