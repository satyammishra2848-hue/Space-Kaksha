import React from 'react';
import { LessonDetailClient } from './LessonDetailClient';
import { LEVEL_1_LESSONS, LEVEL_2_LESSONS } from '@/content/levels';

export function generateStaticParams() {
  const all = [...LEVEL_1_LESSONS, ...LEVEL_2_LESSONS];
  return all.map((l) => ({ lessonId: l.id }));
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const resolvedParams = await params;
  return <LessonDetailClient lessonId={resolvedParams.lessonId} />;
}
