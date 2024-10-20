import { useState, useEffect } from 'react'
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/custom/button'
// import { apps } from './data'
// import * as React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer";
import { Button as ButtonDrawer } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js'
import { Loader2 } from "lucide-react"
import TambahKegiatan from './component/tambahKegiatan'

type surveiData = {
  name: string;
  logo: JSX.Element;
  completed: boolean;
  deskripsi: string;
  periode: string;
  fungsi: 'umum' | 'ipds' | 'sosial' | 'distribusi' | 'produksi' | 'nerwilis';
  kategori: string;
  pic: string;
  link: string;
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)


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
  const [open, setOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<surveiData | null>(null);
  const [apps, setApps] = useState<surveiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  useEffect(() => {
    fetchRutinanData();
  }, []);

  async function fetchRutinanData() {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const { data, error } = await supabase
        .from('rutinan')
        .select('*')

      if (error) {
        console.error('Error fetching rutinan data:', error);
      } else {
        setApps(data as surveiData[]);
      }
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 200 - elapsedTime);

      // Ensure the loading state lasts at least 1 second
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }
  }

  const handleCardClick = (app: surveiData) => {
    setSelectedApp(app);
    setOpen(true);
  };

  const filteredApps = apps
    .filter((app) => (appType === 'all' ? true : app.fungsi === appType))
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFilterChange = (newAppType: string) => {
    setIsFilterLoading(true);
    setAppType(newAppType);

    setTimeout(() => {
      setIsFilterLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <Layout fixed>
        <Layout.Body className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2">Loading data...</p>
          </div>
        </Layout.Body>
      </Layout>
    );
  }

  return (
    <Layout fixed>
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
            <Select value={appType} onValueChange={handleFilterChange}>
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

          <TambahKegiatan setApps={function (): void {
                  throw new Error('Function not implemented.')
                } } />

        </div>
        <div className='mt-4' id="cardData">
          <Input
            placeholder="Filter kegiatan..."
            className="h-9 w-full lg:w-full" // Ensure the input uses full width
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></div>
        <Separator className="shadow mt-4" />

        {isFilterLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredApps.length === 0 ? (
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
                    <p className="line-clamp-2 text-gray-800">{app.deskripsi}</p> {/* Description */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Drawer Component */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <div className="flex p-4 items-start">
              {/* Image on the left taking 1/4 of the screen width and cropped */}
              <img
                src="/images/eg_susenas1.jpg" // Use the placeholder image
                alt={selectedApp ? selectedApp.name : "Placeholder"} // Alt text for accessibility
                className="w-1/4 h-auto rounded mr-4 object-cover" // Set width to 1/4, height auto, and use object-cover to crop
              />
              <div className="flex-1">
                <DrawerHeader className="text-left"> {/* Align text to the left */}
                  <DrawerTitle>{selectedApp ? selectedApp.name : ""}</DrawerTitle>
                  <DrawerDescription className="hidden md:block">
                    {selectedApp ? selectedApp.deskripsi : ""}
                  </DrawerDescription>
                  {/* Additional details below the description */}
                  {selectedApp && (
                    <div className="mt-2">
                      <table className="w-full border-none">
                        <tbody>
                          <tr>
                            <td className="font-bold border-none">Fungsi</td>
                            <td className="text-center border-none">:</td>
                            <td className="border-none">
                              {selectedApp.fungsi.charAt(0).toUpperCase() + selectedApp.fungsi.slice(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-bold border-none">Periode</td>
                            <td className="text-center border-none">:</td>
                            <td className="border-none">{selectedApp.periode}</td>
                          </tr>
                          <tr>
                            <td className="font-bold border-none">PIC</td>
                            <td className="text-center border-none">:</td>
                            <td className="border-none">{selectedApp.pic}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      >
                        Bukti Fisik
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Menuju ke Bukti Fisik?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Ini akan memindahkan anda ke data bukti fisik kegiatan survei, apakah anda yakin?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            window.open(selectedApp ? selectedApp.link : "drive.google.com", '_blank');
                          }}
                        >
                          Lanjut
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
