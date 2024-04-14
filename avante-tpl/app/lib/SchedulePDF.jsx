"use client";

import { Page, Text, View, Document } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
  },
});

// Componente PDF
const MyDocument = ({ data }) => (
  <Document>
    {data.map((page, pageIndex) => (
      <Page
        key={pageIndex}
        size="A4"
        style={tw("flex flex-col text-center items-center justify-center p-4 gap-4")}
      >
        <View>
          <Text style={tw(`${page.color.title} text-2xl font-bold`)}>
            {page.title}
          </Text>
        </View>
        {page.days && page.days.map((day, index) => (
          <View key={index} style={tw("w-full border border-gray-200")}>
            <View
              style={tw(
                `${page.color.day} text-white font-bold text-base p-2 pb-0 w-full text-center`
              )}
            >
              <Text>{day.text}</Text>
            </View>
            <View style={tw("flex flex-row w-full")}>
              {day.shifts.map((shift, shiftIndex) => (
                <View key={shiftIndex} style={tw("text-sm w-full")}>
                  <View                    
                    style={tw(`${shift.color} text-white text-center p-2`)}
                  >
                    <Text style={tw("text-center")}>{shift.period}</Text>
                  </View>
                  <View
                    key={shiftIndex}
                    style={tw(
                      "flex flex-col gap-2 text-center justify-center p-2"
                    )}
                  >
                    {shift.publishers.map((publisher, publisherIndex) => (
                      <Text key={publisherIndex} style={tw("text-center text-xs")}>{publisher || ""}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    ))}
  </Document>
);

export default function SchedulePDF({ data }) {
  if(data){
    return <MyDocument data={data} />;
  }
  return null
}
