import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layout } from '@/components/custom/layout'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

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

const getLevelColor = (level: number): string => {
  switch (level) {
    case 1: return "bg-red-500";
    case 2: return "bg-blue-500";
    case 3: return "bg-green-500";
    case 4:
    case 5: return "bg-yellow-500";
    default: return "bg-gray-500";
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
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4 mb-0'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-0'
        >
          <TabsContent
            value='overview'
            className='space-y-4 m-0 p-0 h-full overflow-hidden'
          >
            <div className="h-full flex flex-col p-4 overflow-hidden">
              <div
                className="flex-1 overflow-y-auto pr-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div
                  style={{
                    '&::-webkit-scrollbar': {
                      display: 'none'
                    }
                  } as React.CSSProperties}
                >
                  {Object.entries(pegawaiByLevel).map(([level, pegawaiList]) => (
                    <div key={level} className="mb-8">
                      <div className="flex justify-center mb-4">
                        <h2 className={`text-xl font-semibold px-4 py-2 rounded-full text-white ${getLevelColor(Number(level))}`}>
                          {getLevelName(Number(level))}
                        </h2>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4">
                        {pegawaiList.map((pegawai) => (
                          <div
                            key={pegawai.nip_bps}
                            className="flex flex-col items-center bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md p-4 w-64 transition-colors duration-200"
                          >
                            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                              <img
                                src={`/images/foto/${pegawai.nip_bps}.png`}
                                alt={pegawai.nama}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-center">{pegawai.nama}</h3>
                            <p className="text-muted-foreground text-center text-xs">{pegawai.jabatan}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
};

export default Pegawai;
