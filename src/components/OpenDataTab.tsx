import { FormEvent, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "./DataTable";

interface OpenDataTabProps {}

interface OpenDataRecord {
  datetime: string;
  laeq: number;
  lafmax: number;
  la10: number;
  la90: number;
  lceq: number;
  lcfmax: number;
  lc10: number;
  lc90: number;
}

const columns: ColumnDef<OpenDataRecord>[] = [
  {
    accessorKey: "datetime",
    header: "Datetime",
  },
  {
    accessorKey: "laeq",
    header: "LAEQ",
  },
  {
    accessorKey: "lafmax",
    header: "LAFMAX",
  },
  {
    accessorKey: "la10",
    header: "LA10",
  },
  {
    accessorKey: "la90",
    header: "LA90",
  },
  {
    accessorKey: "lceq",
    header: "LCEQ",
  },
  {
    accessorKey: "lcfmax",
    header: "LCFMAX",
  },
  {
    accessorKey: "lc10",
    header: "LC10",
  },
  {
    accessorKey: "lc90",
    header: "LC90",
  },
];

export default function OpenDataTab({}: OpenDataTabProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDataRecord, setOpenDataRecord] = useState<OpenDataRecord[]>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const res = await fetch(
        `/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${data.monitor}&start=${data.start}&end=${data.end}`,
        {
          method: "POST",
        }
      );
      const json = await res.json();
      if (json.error) {
        alert(json.error);
      }
      setOpenDataRecord(json as OpenDataRecord[]);
    } catch (err: any) {
      alert(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Open Data</CardTitle>
          <CardDescription>
            Access Sonitus API for open noise minitoring data.
            <br />
            Provided by{" "}
            <a
              href="https://data.smartdublin.ie/sonitus-api"
              className="text-blue-500"
            >
              https://data.smartdublin.ie/sonitus-api
            </a>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <span className="flex justify-between items-center">
            <Label htmlFor="monitor" className="w-1/6">
              Monitor serial number
            </Label>
            <Input id="monitor" name="monitor" defaultValue="10.1.1.1" />
          </span>
          <span className="flex justify-between items-center">
            <Label htmlFor="start" className="w-1/6">
              Start timestamp (s)
            </Label>
            <Input
              id="start"
              name="start"
              defaultValue={Math.floor(Date.now() / 1000) - 86400}
            />
          </span>
          <span className="flex justify-between items-center">
            <Label htmlFor="end" className="w-1/6">
              End timestamp (s)
            </Label>
            <Input
              id="end"
              name="end"
              defaultValue={Math.floor(Date.now() / 1000)}
              // className="flex-grow flex-shrink"
            />
          </span>
          <br />
          <Button type="submit">Search data</Button>
          <br />
          {isLoading && <p>Searching data...</p>}
          {openDataRecord && (
            <DataTable columns={columns} data={openDataRecord} />
          )}
        </CardContent>
        <CardFooter>
          {/* <Button type="submit">Search data</Button> */}
        </CardFooter>
      </Card>
    </form>
  );
}
