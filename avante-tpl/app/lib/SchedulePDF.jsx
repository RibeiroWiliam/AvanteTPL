"use client"

import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Definindo estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCell: {
    margin: 'auto',
    marginVertical: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

// Componente PDF
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Programação TPL - Aruana</Text>
        {data.map((day, index) => (
          <View key={index}>
            <Text style={styles.header}>{day.label}</Text>
            <View style={styles.table}>
              {day.shifts.map((shift, shiftIndex) => (
                <View key={shiftIndex} style={styles.tableRow}>
                  {shift.map((person, personIndex) => (
                    <View key={personIndex} style={styles.tableCell}>
                      <Text>{person}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function SchedulePDF() {
  const data = [
    { label: 'Monday', shifts: [['Person A', 'Person B'], ['Person C', 'Person D']] },
    { label: 'Tuesday', shifts: [['Person E', 'Person F'], ['Person G', 'Person H']] },
    // Adicione mais dias conforme necessário
  ];
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument data={data} />
    </PDFViewer>
  )
}