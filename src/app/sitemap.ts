import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = Array.from({ length: 24 }, (_, i) => ({
    url: `https://hack4teens.vercel.app/lesson/${i + 1}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://hack4teens.vercel.app", lastModified: new Date() },
    ...lessons,
  ];
}
