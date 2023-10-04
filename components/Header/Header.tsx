import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import logo from "../../public/logo.webp";
import Logo from "../../public/Logo.png";
import Link from "next/link";
import Image from "next/image";
import { ConnectButtonwagmi } from "./connect";
//redux
import { useAppdispatch, useAppSelector } from "../../hooks/redux";
import { HeaderList } from "../../config/Headerlist";
export function Header() {

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 z-10" >
      {HeaderList.map((e, index) => {
        return (
          <li key={index}>
            {!e.islink ? (
              <Link href={e.link}>
                <p className="relative flex font-bold items-center gap-2 text-white text-xl cursor-pointer rounded dark:hover:bg-secondary-dark  dark:hover:bg-slate-800 p-4 transition-all">
                  {e.name}
                </p>
              </Link>
            ) : (
              <a
                href={e.link}
                target="_blank"
                rel="noreferrer"
                className="relative flex font-bold items-center gap-2 text-xl text-white  cursor-pointer rounded dark:hover:bg-secondary-dark  dark:hover:bg-slate-800 p-4 transition-all"
              >
                {e.name}
              </a>
            )}
          </li>
        );
      })}

    
    </ul>
  );

  return (
    <header
    className={`mx-auto ${
      openNav ? "pb-5" : ""
    } border-b items-center border-blue-500 max-w-screen-xl z-50  md:py-2 px-4 lg:px-8 lg:py-4 bg-transparent sticky top-[0px] backdrop-blur-md  `}
  >
      <div className="container mx-auto flex items-center  justify-between text-blue-gray-900">
      <a
          href="https://neofilms.movie/"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer flex justify-center items-center gap-5"
        >
          <Image
            src={Logo.src}
            width={100}
            alt="logo"
            className=" cursor-pointer"
            height={50}
          />
        </a>
        <div className="hidden lg:block">
          <div className="flex flex-row items-center gap-x-5">
            {navList}

            <ConnectButtonwagmi />
          </div>
        </div>

        <IconButton
          variant="text"
          className="flex items-center text-white mr-3 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container ">
          {navList}
          <ConnectButtonwagmi />
        </div>
      </MobileNav>
    </header>
  );
}