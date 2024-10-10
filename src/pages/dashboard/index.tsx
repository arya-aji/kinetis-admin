import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import KinetisLogo from "/images/logo-color.png";
import eotm from "/images/eotm-iii-2024.png";

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-0'
        >
          <div className='w-full overflow-x-auto pb-2'>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-5 border-none shadow-none'>
                <img src={KinetisLogo} alt="Kinetis Logo" className="w-full h-full object-contain" />
              </Card>

              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle className='text-center'>Employee of the 3rd</CardTitle>
                  <CardDescription className='text-center'>
                    <b>Monik Ajeng PDW</b>
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-8'>
                  <img src={eotm} alt="Kinetis Logo" className="w-full h-full object-contain" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}