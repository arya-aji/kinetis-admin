import React, { useState } from 'react';
import { IconMathSymbols } from '@tabler/icons-react';
import AddKegiatanModal from './tambahKegiatanModal'; // Assuming this is in the same folder

interface TambahKegiatanProps {
  setApps: (apps: any[]) => void;
}

const TambahKegiatan: React.FC<TambahKegiatanProps> = ({ setApps }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <IconMathSymbols size={20} className="mr-2" />
        Tambah Kegiatan
      </button>

      {/* Render Modal if `open` state is true */}
      {open && <AddKegiatanModal open={open} setOpen={setOpen} setApps={setApps} />}
    </>
  );
};

export default TambahKegiatan;
