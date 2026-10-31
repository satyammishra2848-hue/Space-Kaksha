import React from 'react';
import { LessonDetailClient } from './LessonDetailClient';

export function generateStaticParams() {
  return [
    { lessonId: 'earth-and-sky' },
    { lessonId: 'meet-the-moon' },
    { lessonId: 'discover-planets' },
  ];
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const resolvedParams = await params;
  return <LessonDetailClient lessonId={resolvedParams.lessonId} />;
}
