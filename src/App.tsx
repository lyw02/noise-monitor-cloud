import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonitorTab from "@/components/MonitorTab";
import YourDataTab from "@/components/YourDataTab";
import OpenDataTab from "@/components/OpenDataTab";
import SettingsTab from "@/components/SettingsTab";

import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

export function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <h1 className="ml-8">Noise Monitor</h1>
      <span className="ml-8">Current user: {user.signInDetails?.loginId}</span>
      <Tabs defaultValue="monitor" className="w-auto ml-8 mr-8">
        <TabsList className="grid w-full grid-cols-4 space-x-2">
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
          <TabsTrigger value="your-data">Your Data</TabsTrigger>
          <TabsTrigger value="open-data">Open Data</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="monitor">
          <MonitorTab
            isMonitoring={isMonitoring}
            setIsMonitoring={setIsMonitoring}
          />
        </TabsContent>
        <TabsContent value="your-data">
          <YourDataTab />
        </TabsContent>
        <TabsContent value="open-data">
          <OpenDataTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default withAuthenticator(App);
