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

interface OpenDataTabProps {}
export default function OpenDataTab({}: OpenDataTabProps) {
  const handleClick = async () => {
    let monitor = "10.1.1.1";
    let start = 1640995200;
    let end = 1641081600;
    const res = await fetch(
      `https://data.smartdublin.ie/sonitus-api/api/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${start}&end=${end}`,
      // "https://data.smartdublin.ie/sonitus-api/api/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=10.1.1.1&start=1640995200&end=1641081600"
      {
        method: "POST",
      }
    );
  };
  return (
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
        {/* <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div> */}
        <Button onClick={handleClick}>Test call</Button>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}
