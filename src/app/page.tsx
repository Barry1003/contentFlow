import React from 'react';
import App from '../App';
import { getPosts, getIdeas, getSettings } from './actions';
import { DEFAULT_SETTINGS } from '../constants';

export default async function Page() {
  let posts = [];
  let ideas = [];
  let dbSettings = null;

  try {
    posts = await getPosts();
    ideas = await getIdeas();
    dbSettings = await getSettings();
  } catch (error) {
    console.log("Not authenticated, loading default sample data...");
  }

  const initialPosts = posts || [];
  const initialIdeas = ideas || [];
  const initialSettings = dbSettings || DEFAULT_SETTINGS;

  return (
    <App 
      initialPosts={initialPosts} 
      initialIdeas={initialIdeas} 
      initialSettings={initialSettings} 
    />
  );
}
