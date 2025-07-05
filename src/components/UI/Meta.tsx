import Head from 'next/head';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function Meta({ 
  title = 'StellarVerse - Explore the Cosmos',
  description = 'StellarVerse is a space-themed web application for exploring astronomy events, taking space quizzes, and learning about the cosmos.',
  keywords = 'space, astronomy, cosmos, quiz, celestial events, stars, planets',
  ogImage = '/galaxy-logo.png'
}: MetaProps) {
  const fullTitle = title.includes('StellarVerse') ? title : `${title} | StellarVerse`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#030203" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
} 