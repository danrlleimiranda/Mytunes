import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { UserType } from '../types';

type LayoutProps = {
  profile: UserType
};

function Layout({ profile }: LayoutProps) {
  return (
    <>
      <Header profile={ profile } />
      <Outlet />
    </>
  );
}

export default Layout;
