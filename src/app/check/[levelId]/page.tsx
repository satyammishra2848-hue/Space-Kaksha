import React from 'react';
import { LevelCheckClient } from './LevelCheckClient';

export function generateStaticParams() {
  return [
    { levelId: 'level-1' },
    { levelId: 'level-2' },
  ];
}

export default async function LevelCheckPage() {
  return <LevelCheckClient />;
}
