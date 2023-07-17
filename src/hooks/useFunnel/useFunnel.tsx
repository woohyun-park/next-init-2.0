import { Children, ReactNode, isValidElement, useState } from 'react';

interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: ReactNode;
}

interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find(
    (child) => (child.props as StepProps<T>)?.name === step,
  );

  if (!targetElement) {
    return null;
  }

  return <>{targetElement}</>;
};

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

const useFunnel = <T extends readonly string[]>(initialStep: T[number]) => {
  const [step, setStep] = useState(initialStep);

  const FunnelElement = Object.assign(
    (props: Omit<FunnelProps<T>, 'step'>) => {
      return <Funnel step={step} {...props} />;
    },
    { Step: (props: StepProps<T>) => <Step<T> {...props} /> },
  );

  return [FunnelElement, setStep] as const;
};

export default useFunnel;
