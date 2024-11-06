import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MonitorTabProps {
  isMonitoring: boolean;
  setIsMonitoring: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
export default function MonitorTab({
  isMonitoring,
  setIsMonitoring,
  children,
}: MonitorTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitor</CardTitle>
        <CardDescription>Use monitor to collect noise data. Automatically upload to AWS in real-time.</CardDescription>
      </CardHeader>
      <CardContent className={`w-full mt-8 flex justify-center`}>
        {children}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setIsMonitoring((prev) => !prev)}
          className={`w-full ${
            isMonitoring && "bg-neutral-300 hover:bg-slate-400"
          }`}
        >
          {isMonitoring ? "End monitoring" : "Start monitoring"}
        </Button>
      </CardFooter>
    </Card>
  );
}
