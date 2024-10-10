import { Layout } from '@/components/custom/layout'
import {
  Card
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'
import KinetisLogo from "/images/logo-color.png";

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
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-5 border-none shadow-none'>
                <img src={KinetisLogo} alt="Kinetis Logo" className="w-full h-full object-contain" />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}