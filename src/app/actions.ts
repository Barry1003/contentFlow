"use server";

import prisma from '@/lib/prisma';
import { PostItem, IdeaItem, UserSettings } from '@/types';
import { headers } from 'next/headers';

async function getUser() {
  const reqHeaders = await headers();
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEON_AUTH_URL}/api/auth/get-session`, {
    headers: {
      cookie: reqHeaders.get('cookie') || '',
    },
  });
  
  if (!res.ok) {
    throw new Error('Not authenticated');
  }
  
  const data = await res.json();
  if (!data || !data.user) {
    throw new Error('Not authenticated');
  }
  
  return { id: data.user.id };
}

export async function getPosts(): Promise<PostItem[]> {
  const user = await getUser();
  const allPosts = await prisma.post.findMany({
    where: { userId: user.id }
  });
  return allPosts as unknown as PostItem[];
}

export async function createPost(post: PostItem) {
  const user = await getUser();
  await prisma.post.create({
    data: {
      ...(post as any),
      userId: user.id,
    }
  });
}

export async function updatePostInDb(id: string, updates: Partial<PostItem>) {
  const user = await getUser();
  await prisma.post.update({
    where: { id, userId: user.id },
    data: {
      ...updates,
      updatedAt: new Date(),
    } as any
  });
}

export async function deletePostInDb(id: string) {
  const user = await getUser();
  await prisma.post.delete({
    where: { id, userId: user.id }
  });
}

export async function getIdeas(): Promise<IdeaItem[]> {
  const user = await getUser();
  const allIdeas = await prisma.idea.findMany({
    where: { userId: user.id }
  });
  return allIdeas as unknown as IdeaItem[];
}

export async function createIdea(idea: IdeaItem) {
  const user = await getUser();
  await prisma.idea.create({
    data: {
      ...(idea as any),
      userId: user.id,
    }
  });
}

export async function updateIdeaInDb(id: string, updates: Partial<IdeaItem>) {
  const user = await getUser();
  await prisma.idea.update({
    where: { id, userId: user.id },
    data: updates as any
  });
}

export async function deleteIdeaInDb(id: string) {
  const user = await getUser();
  await prisma.idea.delete({
    where: { id, userId: user.id }
  });
}

export async function getSettings(): Promise<UserSettings | null> {
  const user = await getUser();
  const userSettings = await prisma.settings.findUnique({
    where: { userId: user.id }
  });
  return userSettings ? (userSettings as unknown as UserSettings) : null;
}

export async function saveSettings(newSettings: UserSettings) {
  const user = await getUser();
  const existing = await prisma.settings.findUnique({
    where: { userId: user.id }
  });
  
  if (existing) {
    await prisma.settings.update({
      where: { userId: user.id },
      data: newSettings as any
    });
  } else {
    // Remove the `id` from newSettings because Prisma has auto-increment ID for Settings
    const { id, ...dataToSave } = newSettings as any;
    await prisma.settings.create({
      data: {
        ...dataToSave,
        userId: user.id
      }
    });
  }
}

