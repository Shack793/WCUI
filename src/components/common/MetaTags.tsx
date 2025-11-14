import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'MyEasyDonate - Make a Difference',
  description = 'Support causes that matter. Create and donate to fundraising campaigns with ease.',
  image = 'https://myeasydonate.com/og-image.jpg',
  url,
  type = 'website',
  siteName = 'MyEasyDonate',
  twitterCard = 'summary_large_image',
}) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default MetaTags;
