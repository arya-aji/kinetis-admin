import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@supabase/supabase-js';
import { Combobox } from '@headlessui/react'; // Import Combobox for searchable dropdown

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(supabaseUrl, supabaseKey);

const AddKegiatanModal = ({ open, setOpen, setApps }: { open: boolean, setOpen: (open: boolean) => void, setApps: (apps: any) => void }) => {
  const [name, setName] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [periode, setPeriode] = useState('');
  const [fungsi, setFungsi] = useState('');
  const [pic, setPic] = useState<string | null>(''); // Allow pic to be null
  const [selectedPicNip, setSelectedPicNip] = useState<string | null>(null); // State to hold the selected PIC's nip_bps
  const [link, setLink] = useState('');
  const [pegawaiList, setPegawaiList] = useState<{ nama: string; nip_bps: string }[]>([]); // Define the type for pegawaiList
  const [query, setQuery] = useState(''); // Holds the search query for the PIC input
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for form errors

  // Fetch pegawai list on component mount
  useEffect(() => {
    async function fetchPegawai() {
      try {
        const { data, error } = await supabase.from('pegawai').select('nama, nip_bps'); // Adjust table name if needed
        if (error) {
          console.error('Error fetching pegawai:', error);
        } else {
          setPegawaiList(data ? data.map(pegawai => ({ nama: pegawai.nama, nip_bps: pegawai.nip_bps })) : []);
        }
      } catch (error) {
        console.error('Error fetching pegawai:', error);
      }
    }
    fetchPegawai();
  }, []);

  // Filtered list based on the query
  const filteredPegawai = query === ''
    ? pegawaiList
    : pegawaiList.filter((pegawai) =>
        pegawai.nama.toLowerCase().includes(query.toLowerCase())
      );

  // Handle form submission
  async function handleAddKegiatan() {
    // Reset errors
    setErrors({});

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Nama Kegiatan is required.";
    if (!deskripsi) newErrors.deskripsi = "Deskripsi is required.";
    if (!periode) newErrors.periode = "Periode is required.";
    if (!fungsi) newErrors.fungsi = "Fungsi is required.";
    if (!selectedPicNip) newErrors.pic = "PIC is required."; // Check for nip_bps instead of pic
    if (!link) newErrors.link = "Link Bukti is required.";

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newKegiatan = {
      name,
      completed: false,  // Assuming new activities are incomplete by default
      deskripsi,
      periode,
      fungsi,
      pic: selectedPicNip, // Use nip_bps instead of name
      link,
    };

    try {
      const { error } = await supabase
        .from('rutinan')  // Adjust the table name as necessary
        .insert([newKegiatan]);

      if (error) {
        console.error('Error adding kegiatan:', error);
      } else {
        setApps((prevApps: any) => [...prevApps, newKegiatan]);
        setName('');
        setDeskripsi('');
        setPeriode('');
        setFungsi('');
        setPic('');
        setSelectedPicNip(null); // Reset selected PIC nip_bps
        setLink('');
        setOpen(false);  // Close the modal after submission
      }
    } catch (error) {
      console.error('Error adding kegiatan:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[75%] max-w-[75%]"> {/* Modal takes 75% of the screen */}
        <DialogHeader className="text-center"> {/* Center the title */}
          <DialogTitle>Tambah Kegiatan</DialogTitle>
          <DialogDescription>
            Isi form untuk menambah kegiatan rutinan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nama Kegiatan</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 border rounded-md p-2 bg-white dark:bg-gray-800 dark:border-gray-600" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deskripsi" className="text-right">Deskripsi</Label>
            <Textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="col-span-3 border rounded-md p-2 bg-white dark:bg-gray-800 dark:border-gray-600" rows={3} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="periode" className="text-right">Periode</Label>
            <Select value={periode} onValueChange={setPeriode}>
              <SelectTrigger className="border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"> 
                <SelectValue>{periode ? periode : "Pilih Periode"}</SelectValue> {/* Display selected text */}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tahunan">Tahunan</SelectItem>
                <SelectItem value="semesteran">Semesteran</SelectItem>
                <SelectItem value="triwulanan">Triwulanan</SelectItem>
                <SelectItem value="bulanan">Bulanan</SelectItem>
                <SelectItem value="mingguan">Mingguan</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fungsi" className="text-right">Fungsi</Label>
            <Select value={fungsi} onValueChange={setFungsi}>
              <SelectTrigger className="border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
                <SelectValue>{fungsi ? fungsi : "Pilih Fungsi"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="umum">Umum</SelectItem>
                <SelectItem value="ipds">IPDS</SelectItem>
                <SelectItem value="sosial">Sosial</SelectItem>
                <SelectItem value="distribusi">Distribusi</SelectItem>
                <SelectItem value="produksi">Produksi</SelectItem>
                <SelectItem value="nerwilis">Nerwilis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Searchable PIC Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pic" className="text-right">PIC</Label>
            <div className="col-span-3">
              <Combobox value={pic} onChange={(value) => {
                setPic(value);
                const selectedPegawai = pegawaiList.find(pegawai => pegawai.nama === value);
                setSelectedPicNip(selectedPegawai ? selectedPegawai.nip_bps : null); // Set nip_bps when PIC is selected
              }}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 dark:border-gray-600"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(pegawai: any) => pegawai}
                    placeholder="Search or select PIC"
                  />
                  <Combobox.Options className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg">
                    {filteredPegawai.length === 0 && query !== '' ? (
                      <div className="px-4 py-2 text-gray-900 dark:text-gray-300">No results found</div>
                    ) : (
                      filteredPegawai.map((pegawai) => (
                        <Combobox.Option
                          key={pegawai.nip_bps}
                          value={pegawai.nama}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                              active ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white' : 'text-gray-900 dark:text-gray-300'
                            }`
                          }
                        >
                          {pegawai.nama}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">Link Bukti</Label>
            <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} className="col-span-3 border rounded-md p-2 bg-white dark:bg-gray-800 dark:border-gray-600" />
          </div>

          {/* Display validation errors */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleAddKegiatan}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddKegiatanModal;
