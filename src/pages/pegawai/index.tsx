import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'; // Adjust the import path as needed

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Pegawai {
  nama: string;
  nip_bps: string;
  level: number;
  jabatan: string;
}

const getLevelName = (level: number): string => {
  switch (level) {
    case 1: return "Chief";
    case 2: return "Head of General Sub-Section";
    case 3: return "Fungsional Ahli Muda";
    case 4:
    case 5: return "Fungsional Ahli Pertama / Terampil";
    default: return `Level ${level}`;
  }
};

const Pegawai: React.FC = () => {
  const [pegawaiByLevel, setPegawaiByLevel] = useState<Record<number, Pegawai[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPegawai() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('pegawai')
          .select('nama, nip_bps, level, jabatan')
          .order('level', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        const groupedByLevel = data?.reduce((acc, pegawai) => {
          const groupLevel = pegawai.level <= 3 ? pegawai.level : 4;
          if (!acc[groupLevel]) {
            acc[groupLevel] = [];
          }
          acc[groupLevel].push(pegawai);
          return acc;
        }, {} as Record<number, Pegawai[]>);

        setPegawaiByLevel(groupedByLevel || {});
      } catch (err) {
        console.error('Error details:', err);
        setError('Gagal mengambil data pegawai');
      } finally {
        setLoading(false);
      }
    }

    fetchPegawai();
  }, []);

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden">
      {/* <h1 className="text-2xl font-bold mb-4">Daftar Pegawai</h1> */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(pegawaiByLevel).map(([level, pegawaiList]) => (
          <div key={level} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">{getLevelName(Number(level))}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {pegawaiList.map((pegawai) => (
                <div key={pegawai.nip_bps} className="flex flex-col items-center bg-[#257180] rounded-lg shadow-md p-4 w-64">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={`/images/foto/${pegawai.nip_bps}.png`}
                      alt={pegawai.nama}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-base text-white">{pegawai.nama}</h3>
                  <p className="text-gray-200 text-center text-xs">{pegawai.jabatan}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pegawai;
