import { PropsWithChildren } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

interface FunnelPage {
  title: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

const FunnelPage = ({
  title,
  onPrevious,
  onNext,
  children,
}: PropsWithChildren<FunnelPage>) => {
  return (
    <>
      <h1>{title}</h1>
      <Flex as="form" flexDir="column">
        {children}
        <Box>
          {onPrevious && <Button onClick={onPrevious}>이전</Button>}
          {onNext && <Button onClick={onNext}>다음</Button>}
        </Box>
      </Flex>
    </>
  );
};

export default FunnelPage;
