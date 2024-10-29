import { useState } from "react";
import "./App.css";
import NoiseDisplayer from "./components/NoiseDisplayer";

import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

export function App() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <h1>Noise Monitor</h1>
      <span>{user.signInDetails?.loginId}</span>
      <div className="card">
        <button onClick={() => setIsMonitoring((prev) => !prev)}>
          {isMonitoring ? "End monitoring" : "Start monitoring"}
        </button>
        <NoiseDisplayer isMonitoring={isMonitoring} />
      </div>
    </>
  );
}

export default withAuthenticator(App);
