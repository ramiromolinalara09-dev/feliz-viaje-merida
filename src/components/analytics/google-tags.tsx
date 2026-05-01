import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;

export function GoogleTags() {
  const tagId = GA_ID || GADS_ID;
  if (!tagId) return null;

  const configCommands = [
    GA_ID ? `gtag('config', '${GA_ID}');` : "",
    GADS_ID ? `gtag('config', '${GADS_ID}');` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configCommands}
        `}
      </Script>
    </>
  );
}
