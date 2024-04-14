"use client";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod. PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function PrintButton({document}) {
  return (
    <PDFDownloadLink className="text-blue-600 text-2xl lg:text-3xl" fileName="Programacao.pdf" document={document}>
      <i className="bi bi-printer"></i>
    </PDFDownloadLink>
  )
}
