import React from 'react';
import { cn } from '../../lib/utils';

type PageContainerProps = {
  children?: React.ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
  className?: string;
};

export const PageContainer = ({ children, className }: PageContainerProps) => (
  <section className={cn('flex flex-col px-3 sm:px-12', className)}>
    {children}
  </section>
);
