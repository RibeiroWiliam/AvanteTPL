import { PDFDownloadLink } from "@react-pdf/renderer";

export default function PrintButton({document}) {
  return (
    <PDFDownloadLink className="text-blue-600 text-2xl lg:text-3xl" fileName="Programacao.pdf" document={document}>
      <i className="bi bi-printer"></i>
    </PDFDownloadLink>
  )
}
