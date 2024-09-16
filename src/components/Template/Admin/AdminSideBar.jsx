import React, { useState } from 'react'
import ChevLeftIcon from '../../icons/ChevLeftIcon';
import ChevRightIcon from '../../icons/ChevRightIcon';
import AsideBarItem from './AsideBarItem';
import HomeIcon from '../../icons/HomeIcon';
import ProductsIcon from '../../icons/ProductsIcon';
import ServiceIcon from '../../icons/ServiceIcon';
import AboutUsIcon from '../../icons/AboutUsIcon';
import ContactUsIcon from '../../icons/ContactUsIcon';
import UsersIcon from '../../icons/UsersIcon';
import DashboardIcon from '../../icons/DashboardIcon';
import ExitIcon from '../../icons/ExitIcon';

function AdminSideBar() {
 
   const asideItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
      {
        title: "Home",
        icon: <HomeIcon />,
        sections: [
          { title: "OverView",path:'admin-overview' },
          { title: "Home Categories",path:'admin/our-products' },
          { title: "Services",path:'admin/Home/services' },
          { title: "Why Us",path:'/admin/why-Us' },
        ],
      },
      {
        title: "Products",
        icon: <ProductsIcon />,
        sections: [{ title: "Products Actions",path:'admin/products' }],
      },
      {
        title: "Services",
        icon: <ServiceIcon />,
        sections: [{ title: "Services Actions",path:'admin/services' }],
      },
      {
        title: "About Us",
        icon: <AboutUsIcon />,
        sections: [{ title: "About Us Header",path:'/admin/Abot-us/Header' }, { title: "Our Company",path:'admin/our-company' }],
      },
      {
        title: "Contact Us",
        icon: <ContactUsIcon />,
        sections: [{ title: "Infos Actions",path:'admin/infos' }, { title: "Massages",path:'admin/messages' }],
      },
      {
        title: "Users",
        icon: <UsersIcon />,
        sections: [{ title: "Users Actions",path:'admin/users' }],
      },
      {
        title: "LogOut",
        icon: <ExitIcon />,
       
      },
    ];
  
    const [isAdminMobileMenuOpen, setIsAdminMobileMenuOpen] = useState(false);
    const [chevPos,setChevPos] = useState(false)
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false)
    const adminMenuLogichandler = () => {
      setIsAdminMobileMenuOpen((prev) => !prev);
      setIsMobileMenuOpen((prev)=>!prev)
    };
  return (
   <>
     <aside className={`${isMobileMenuOpen ? 'w-[200px] bg-[#131313d7] lg:w-[200px]' : 'w-[55px] bg-[#8080804f] lg:w-[200px]'} ps-2  rounded-r-lg z-[50] text-white   pt-10 lg:pt-5 overflow-y-auto h-full fixed left-0 top-0 overflow-x-hidden `}>
            <div className={`fixed rounded-r-full lg:hidden ${isMobileMenuOpen ? 'left-[200px]' : 'left-[55px]'} w-8 h-8 flex justify-start items-center   bg-[#8080804f] top-2 `}>
              {chevPos ? (
                <div
                  onClick={() => {
                    adminMenuLogichandler();
                    setChevPos(prev=>!prev)
                  }}
                  className='cp'
                >
                  <ChevLeftIcon />
                </div>
              ) : (
                <div
                  onClick={() => {
                    adminMenuLogichandler();
                    setChevPos(prev=>!prev)
                  }}
                  className='cp'
                >
                  <ChevRightIcon />
                </div>
              )}
            </div>

            {asideItems.map((items, index) => (
              <AsideBarItem togglerPositionHandler={setChevPos} closeMenu={()=>{setIsMobileMenuOpen(false)}} openMobile={setIsAdminMobileMenuOpen} {...items} key={index} />
            ))}
            {/* <div>LogOut</div> */}
          </aside>
   </>
  )
}

export default AdminSideBar