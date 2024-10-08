import { useState } from 'react'
import {
  IconMathSymbols
} from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
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
import * as React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer";
import { Button as ButtonDrawer } from "@/components/ui/button";

type surveiData = {
  name: string;
  logo: JSX.Element;
  completed: boolean;
  desc: string;
  periode: string;
  fungsi: 'umum' | 'ipds' | 'sosial' | 'distribusi' | 'produksi' | 'nerwilis';
  kategori: string;
  tim: string;
  link: string;
};


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
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = useState<surveiData | null>(null);

  const handleCardClick = (app: surveiData) => {
    setSelectedApp(app);
    setOpen(true);
  };
  const filteredApps = apps
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
      <Layout.Body className="flex flex-col ">
        <div className='mb-4 '>
          <h1 className="text-2xl font-bold tracking-tight">Kegiatan Rutin</h1>
          <p className="text-muted-foreground">
            Daftar Kegiatan Statistik di BPS Kota Jakarta Pusat
          </p>
        </div>
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-grow">
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent className='w-1/4'>
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

          <div className="w-1/4" />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center ml-4">
                <IconMathSymbols size={20} className="mr-2" />
                Tambah Kegiatan
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Kegiatan</DialogTitle>
                <DialogDescription>
                  Mau tambah kegiatan? Cuss coy
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nama Kegiatan
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className='mt-4'>
          <Input
            placeholder="Filter kegiatan..."
            className="h-9 w-full lg:w-full" // Ensure the input uses full width
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></div>
        <Separator className="shadow mt-4" />

        {filteredApps.length === 0 ? (
          <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
            <p className="text-gray-500">Tidak ada kegiatan ditemukan</p>
          </div>
        ) : (
          <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <li
                key={app.name}
                className="relative rounded-lg border p-4 hover:shadow-md group cursor-pointer overflow-clip"
                onClick={() => handleCardClick(app as surveiData)}
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 bg-[url('/images/eg_susenas1.jpg')] bg-cover bg-center rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-slate-700/80"></div>
                </div>

                {/* Solid Overlay for Better Contrast */}
                <div className="absolute inset-0 bg-slate-50 opacity-50 transition-opacity duration-300 rounded-lg"></div>

                {/* Button Positioned in Top Right */}
                <div className="absolute top-2 right-2 z-20">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border ${fungsiColors[app.fungsi] || 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-slate-100 dark:bg-slate-400 dark:hover:bg-slate-700'}`}
                  >
                    {app.fungsi.charAt(0).toUpperCase() + app.fungsi.slice(1)}
                  </Button>
                </div>

                {/* Adjusted Content Padding */}
                <div className="flex flex-col justify-start h-full relative z-10 text-center pt-8 px-2"> {/* Added top padding */}
                  <div className="flex flex-col items-center">
                    <h2 className="mb-2 font-semibold text-gray-900">{app.name}</h2> {/* Title */}
                    <p className="line-clamp-2 text-gray-800">{app.desc}</p> {/* Description */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Drawer Component */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <div className="flex p-4">
              {/* Image on the left taking 1/4 of the screen width */}
              <img
                src="/images/eg_susenas1.jpg" // Use the placeholder image
                alt={selectedApp ? selectedApp.name : "Placeholder"} // Alt text for accessibility
                className="w-1/4 h-auto rounded mr-4" // Set width to 1/4 and height to auto for aspect ratio
              />
              <div className="flex-1">
                <DrawerHeader className="text-left"> {/* Align text to the left */}
                  <DrawerTitle>{selectedApp ? selectedApp.name : ""}</DrawerTitle>
                  <DrawerDescription>{selectedApp ? selectedApp.desc : ""}</DrawerDescription>
                </DrawerHeader>
              </div>
            </div>
            <DrawerFooter>
              <ButtonDrawer onClick={() => setOpen(false)}>Close</ButtonDrawer>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


      </Layout.Body>
    </Layout >
  );
}

