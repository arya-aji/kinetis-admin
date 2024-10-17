import { useState, useEffect } from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { Layout } from '@/components/custom/layout'
import { Tabs, TabsContent } from '@/components/ui/tabs'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Pegawai {
  nama: string;
  nip_bps: string;
}

const SELECTED_NIP_BPS = [
  '340013354', '340013544', '340014777',
  '340015084', '340015397', '340016199'
];

export default function VotingPage() {
  const [pegawai, setPegawai] = useState<Pegawai[]>([]);
  const [selectedPegawai, setSelectedPegawai] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    async function fetchPegawai() {
      const { data, error } = await supabase
        .from('pegawai')
        .select('nama, nip_bps')
        .in('nip_bps', SELECTED_NIP_BPS);

      if (error) {
        console.error('Error fetching pegawai:', error);
      } else {
        setPegawai(data || []);
      }
      setIsLoading(false);
    }

    fetchPegawai();
  }, []);

  useEffect(() => {
    if (user) {
      const voted = localStorage.getItem(`hasVoted_${user.id}`);
      if (voted) {
        setHasVoted(true);
      }
    }
  }, [user]);

  const handleVote = () => {
    if (selectedPegawai !== null && user) {
      console.log(`Voted for pegawai with NIP_BPS: ${selectedPegawai}`);
      setHasVoted(true);
      localStorage.setItem(`hasVoted_${user.id}`, 'true');
    }
  };

  if (!isSignedIn) {
    return <SignIn />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {/* ===== Main ===== */}
      <Layout.Body >
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-0'
        >
          <TabsContent value='overview' className='space-y-4 m-0 p-0'>
            <div className="container mx-auto px-4 pb-8 pt-0 mt-0">
              <h1 className="text-3xl font-bold mb-6 text-center">Employee of the Month</h1>
              {hasVoted ? (
                <p className="text-xl text-center">Terima kasih telah memilih! Anda telah memberikan suara Anda.</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {pegawai.map((p) => (
                      <button
                        key={p.nip_bps}
                        className={`p-4 border rounded-lg flex flex-col items-center 
                          ${selectedPegawai === p.nip_bps
                            ? 'bg-blue-500 text-white'
                            : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
                          }
                          transition-colors duration-200`}
                        onClick={() => setSelectedPegawai(p.nip_bps)}
                      >
                        <img
                          src={`/images/foto/${p.nip_bps}.png`}
                          alt={p.nama}
                          className="w-32 h-32 object-cover rounded-full mb-2"
                        />
                        <span>{p.nama}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors duration-200"
                      onClick={handleVote}
                      disabled={selectedPegawai === null}
                    >
                      Pilihanku
                    </button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}
