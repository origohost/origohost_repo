import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';
import { importMap } from './admin/importMap';
import configPromise from '@/payload.config';
import './custom.scss';

type Args = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Args) {
  const serverFunction = async (args: any) => {
    'use server';
    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    });
  };

  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
