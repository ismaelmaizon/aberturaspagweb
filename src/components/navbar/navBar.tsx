"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { usePathname } from "next/navigation";
import Link from "next/link";
import ImageCarousel from '../imageCarousel/imageCarousel';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos'},
  { name: 'Obras', href: '/obras'},
  { name: 'Nosotros', href: '/nosotros'},
  { name: 'Contactanos', href: '/contactanos'},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const images = [
    { src: "/web/img/carousel1.jpeg", alt: "Imagen 1" },
    { src: "/web/img/GDSF5132.jpeg", alt: "Imagen 2" },
    { src: "/web/img/carousel3.jpeg", alt: "Imagen 3" }
  ]

  const pathname = usePathname();

  function isActive(href:string, path: string) {
    console.log("Comparando href:", href, "con path:", path);
    return href === path;
  }

  return (
    <div>
      <div className="relative w-full h-50 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 ">
          <ImageCarousel images={images} autoPlay={true} interval={4000} className={'w-full h-50'}  />
          {
          // <Image src="/web/img/GDSF5132.jpeg" alt="Fondo" fill style={{ objectFit: "cover", opacity: 0.7 }} />
          }
        </div> {/* oscurece la imagen opcional 
        <div className="relative z-10 text-white p-4 flex flex-row items-center justify-between h-full">
          <div className="ml-5">
            <h1 className="text-white text-4xl font-bold">Aberturas Bodereau</h1>
            <h3 className="text-white text-sm font-large">Calidad, tradición y confianza: abrimos tus ideas, creamos tus espacios.</h3>
          </div>
          <Image className="mr-5 hidden sm:block" src="/web/img/logopag.png" alt="Logo" width={50} height={50} />
        </div> */}
      </div>
      <Disclosure
        as="nav"
        className="relative bg-red-950/100 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="text-black block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="text-black hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className="flex shrink-0 items-center block sm:hidden">
                <Image
                  src="/web/img/logoAB.png" // ruta de la imagen de tu logo
                  alt="Logo"
                  className="h-30 w-auto"
                  width={100}
                  height={50}
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="flex space-x-4 text-2xl font-semibold">
                  {navigation.map((item) => {
                    const active = isActive(item.href, pathname);
                    return(  
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={classNames(
                              active ? 'bg-gray-950/60 text-white' : 'text-gray-100 hover:bg-white/5 hover:text-white',
                              'rounded-md px-6 py-2 text-[18px] font-large',
                            )}
                          >
                            {item.name}
                          </Link>
                        </div>    
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const active = isActive(item.href, pathname);
              return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={classNames(
                  active ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
