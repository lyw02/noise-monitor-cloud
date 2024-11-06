import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { getData } from "@/api/dataApi";
import { DataRecord } from "@/types";

interface YourDataTabProps {
  userId: string;
}

export const columns: ColumnDef<DataRecord>[] = [
  {
    accessorKey: "userId",
    header: "User",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "decibels",
    header: "Decibels",
  },
];

export default function YourDataTab({ userId }: YourDataTabProps) {
  const [dataRecords, setDataRecords] = useState<DataRecord[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(userId);
      const json = await res?.body.json();
      json && setDataRecords(json.valueOf() as DataRecord[]);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Data</CardTitle>
        <CardDescription>Noise data collected by your phone.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {dataRecords ? (
          <DataTable columns={columns} data={dataRecords} />
        ) : (
          "Loading..."
        )}
      </CardContent>
    </Card>
  );
}
