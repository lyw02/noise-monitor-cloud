import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoiseDisplayer from "./NoiseDisplayer";

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
      <CardContent className={`w-full mt-8 flex justify-center`}>
        {/* <NoiseDisplayer isMonitoring={isMonitoring} /> */}
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
