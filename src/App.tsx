import { useState } from "react";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MonitorTab from "@/components/MonitorTab";
import YourDataTab from "@/components/YourDataTab";
import OpenDataTab from "@/components/OpenDataTab";
import NoiseDisplayer from "@/components/NoiseDisplayer";

export function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const userId = user.signInDetails?.loginId;

  if (!userId) return "Unauthorized user";

  const handleClick = async () => {
    signOut();
  };

  return (
    <>
      <span className="flex justify-between items-center my-4 mx-8">
        <span className="">
          Current user: <b>{userId}</b>
        </span>
        <Button variant="outline" onClick={handleClick}>
          Sign out
        </Button>
      </span>
      <Tabs defaultValue="monitor" className="w-auto ml-8 mr-8">
        <TabsList className="grid w-full grid-cols-3 space-x-2">
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
          <TabsTrigger value="your-data">Your Data</TabsTrigger>
          <TabsTrigger value="open-data">Open Data</TabsTrigger>
        </TabsList>
        <TabsContent value="monitor">
          <MonitorTab
            isMonitoring={isMonitoring}
            setIsMonitoring={setIsMonitoring}
          >
            <NoiseDisplayer isMonitoring={isMonitoring} userId={userId} />
          </MonitorTab>
        </TabsContent>
        <TabsContent value="your-data">
          <YourDataTab userId={userId} />
        </TabsContent>
        <TabsContent value="open-data">
          <OpenDataTab />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default withAuthenticator(App);
