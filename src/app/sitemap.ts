import { MetadataRoute } from 'next';
import { tools, categories } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://aiotools.arthacodestudio.com';

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category pages
  categories.forEach((category) => {
    routes.push({
      url: `${siteUrl}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Tool pages
  tools.forEach((tool) => {
    routes.push({
      url: `${siteUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}

