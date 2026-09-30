"use client";

import { PortfolioSite, InstagramPost, SyncLogEntry, CategoryType } from "./types";
import { INITIAL_SITE, SAMPLE_SYNC_LOGS, SAMPLE_POSTS, PRIMARY_PHOTOGRAPHER } from "./mockData";
import { categorizePost } from "./categorizer";

const STORAGE_KEY_SITE = "postfolio_current_site";
const STORAGE_KEY_SYNC_LOGS = "postfolio_sync_logs";

export function getStoredSite(): PortfolioSite {
  if (typeof window === "undefined") {
    return INITIAL_SITE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SITE);
    if (!raw) {
      saveStoredSite(INITIAL_SITE);
      return INITIAL_SITE;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading stored site:", e);
    return INITIAL_SITE;
  }
}

export function saveStoredSite(site: PortfolioSite): void {
  if (typeof window === "undefined") return;
  try {
    site.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(site));
    window.dispatchEvent(new Event("postfolio_site_updated"));
  } catch (e) {
    console.error("Error saving site:", e);
  }
}

export function getStoredSyncLogs(): SyncLogEntry[] {
  if (typeof window === "undefined") {
    return SAMPLE_SYNC_LOGS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SYNC_LOGS);
    if (!raw) {
      saveStoredSyncLogs(SAMPLE_SYNC_LOGS);
      return SAMPLE_SYNC_LOGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading sync logs:", e);
    return SAMPLE_SYNC_LOGS;
  }
}

export function saveStoredSyncLogs(logs: SyncLogEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_SYNC_LOGS, JSON.stringify(logs));
    window.dispatchEvent(new Event("postfolio_sync_logs_updated"));
  } catch (e) {
    console.error("Error saving sync logs:", e);
  }
}

export function simulateIncomingInstagramPost(postData?: Partial<InstagramPost>): {
  site: PortfolioSite;
  newPost: InstagramPost;
  log: SyncLogEntry;
} {
  const currentSite = getStoredSite();
  const defaultNewPost: InstagramPost = {
    id: "post_simulated_" + Date.now(),
    mediaUrl:
      postData?.mediaUrl ||
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1600&auto=format&fit=crop",
    thumbnailUrl:
      postData?.thumbnailUrl ||
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
    caption:
      postData?.caption ||
      "Sun-drenched celebration at the Tuscan vineyard. Golden hour vows with handwritten notes and ancient stone arches. Shot on 35mm film.",
    timestamp: new Date().toISOString(),
    permalink: "https://instagram.com/p/simulated_" + Date.now(),
    likeCount: Math.floor(Math.random() * 900) + 120,
    commentsCount: Math.floor(Math.random() * 40) + 5,
    mediaType: "IMAGE",
    aspectRatio: "portrait",
    category: "Weddings",
    isFeatured: true,
    isVisible: true,
    exifData: {
      camera: "Leica M11",
      lens: "Summilux 50mm f/1.4",
      focalLength: "50mm",
      aperture: "f/1.4",
      iso: "100",
      year: "2026",
      location: "Tuscany, Italy",
    },
  };

  const newPost = { ...defaultNewPost, ...postData };
  const cat = categorizePost(newPost.caption, newPost.mediaType);
  newPost.category = cat.category;

  // Insert at top of posts
  currentSite.posts = [newPost, ...currentSite.posts];
  currentSite.profile.postsCount += 1;
  currentSite.profile.lastSyncedAt = "Just now";

  // Update category post count
  const catIndex = currentSite.categories.findIndex((c) => c.name === newPost.category);
  if (catIndex >= 0) {
    currentSite.categories[catIndex].postCount += 1;
    currentSite.categories[catIndex].coverImage = newPost.mediaUrl;
  }

  saveStoredSite(currentSite);

  // Add sync log
  const currentLogs = getStoredSyncLogs();
  const newLog: SyncLogEntry = {
    id: "sync_" + Date.now(),
    timestamp: "Just now",
    type: "webhook",
    postsFound: 1,
    newPostsAdded: 1,
    status: "success",
    message: `New Instagram post automatically imported: "${newPost.caption.substring(0, 45)}..." → Organized into "${newPost.category}".`,
  };
  saveStoredSyncLogs([newLog, ...currentLogs]);

  return { site: currentSite, newPost, log: newLog };
}

export function resetToDefaultSite(): PortfolioSite {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_SITE);
    localStorage.removeItem(STORAGE_KEY_SYNC_LOGS);
  }
  saveStoredSite(INITIAL_SITE);
  saveStoredSyncLogs(SAMPLE_SYNC_LOGS);
  return INITIAL_SITE;
}
