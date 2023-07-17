import { NextSeo } from 'next-seo';

import HomeLayout from '@/components/@Layout/HomeLayout';
import Funnel from '@/containers/Funnel';
import withUnAuthGuard from '@/hocs/withUnAuthGuard';

function FunnelPage() {
  return (
    <>
      {/* output: 똑똑한 개발자 | login */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="funnel" />
      <HomeLayout content={<Funnel />} />
    </>
  );
}

export default withUnAuthGuard(FunnelPage);
