"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { usePathname } from "next/navigation";
import Link from "next/link";
import ImageCarousel from '../imageCarousel/imageCarousel';
import { useEffect, useState } from "react";

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos'},
  { name: 'Obras', href: '/obras'},
  { name: 'Nosotros', href: '/nosotros'},
  { name: 'Contactanos', href: '/contactanos'},
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const images = [
    { src: "/web/img/carousel1.jpeg", alt: "Imagen 1" },
    { src: "/web/img/GDSF5132.jpeg", alt: "Imagen 2" },
    { src: "/web/img/carousel3.jpeg", alt: "Imagen 3" }
  ];

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Al inicio: nav abajo del todo. Al scrollear: nav arriba.
  const navTransform = scrolled
  ? "translateY(0)"
  : "translateY(calc(100vh - 4rem))";


  function isActive(href: string, path: string) {
    return href === path;
  }

  return (
    <div className="relative">
      {/* HERO FULL SCREEN */}
      <div className="relative w-full h-screen bg-cover bg-center overflow-hidden">
        {/* Fondo (carousel) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40">
            <ImageCarousel
              images={images}
              autoPlay={true}
              interval={4000}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* CONTENIDO ENCIMA DEL HERO */}
        <div className={`
            relative z-10 text-white p-4 flex flex-row items-start justify-start h-full
            transition-all duration-500 ease-out
            ${scrolled ? 'mt-40 opacity-0' : 'mt-10 opacity-100'}
          `}>
          <Image
            className="mr-5 hidden sm:block"
            src="/web/img/logopag.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <div className="ml-5 mt-2">
            <h1 className="text-white text-5xl md:text-6xl font-light tracking-tight">
              Aberturas Bodereau
            </h1>
            <p className="text-white text-sm md:text-base font-light opacity-60 mt-1">
              Calidad, tradición y confianza.
            </p>
          </div>
        </div>
      </div>

      {/* NAVBAR FIJO CON ANIMACIÓN SUAVE */}
      <div
        className={`fixed top-0 left-0 right-0 z-20
          bg-red-900/100 ${scrolled ? 'opacity-100' : 'opacity-70'}
          after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10
          transition-transform duration-500 ease-out
        `}
        style={{
          transform: navTransform,
        }}
      >
        <Disclosure as="nav">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="text-white block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="text-white hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex shrink-0 items-center block sm:hidden">
                  <Image
                    src="/web/img/logoAberturasBodereau.png"
                    alt="Logo"
                    className="h-40 w-auto"
                    width={100}
                    height={50}
                  />
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="flex space-x-4 text-2xl font-semibold">
                    {navigation.map((item) => {
                      const active = isActive(item.href, pathname);
                      return (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={classNames(
                              active
                                ? 'bg-gray-950/60 text-white'
                                : 'text-gray-100 hover:bg-white/5 hover:text-white',
                              'rounded-md px-6 py-2 text-[18px] font-large',
                            )}
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" />
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={classNames(
                      active
                        ? 'bg-gray-950/50 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
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
    </div>
  );
}
