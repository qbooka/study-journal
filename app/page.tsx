// app/page.tsx (or app/page.js)
'use client';

import ClientSideCustomEditor from '@/components/client-side-custom-editor';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      {/* Load MathType viewer script */}
      <Script
        src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=tex"
        strategy="beforeInteractive"
      />
      <script
        type="text/javascript"
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      ></script>

      <ClientSideCustomEditor />
    </>
  );
}
