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
    <PDFDownloadLink className="text-gray-500 hover:text-primary transition duration-300 text-2xl lg:text-3xl" fileName="Programacao.pdf" document={document}>
      <i className="bi bi-printer-fill"></i>
    </PDFDownloadLink>
  )
}
