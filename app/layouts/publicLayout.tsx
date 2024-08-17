import React from 'react';
import { ChildrenType } from '@/types/commonTypes';

const PublicLayout: React.FC<ChildrenType> = ({ children }) => {
  return <div>{children}</div>;
};

export default PublicLayout;
