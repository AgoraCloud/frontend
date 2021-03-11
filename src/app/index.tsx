import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Switch } from "react-router";
import { Home } from "app/containers/Home";
import { AuthedRoute, UnauthedRoute } from "app/components/RouteGuards/Auth";
import { Login, Signup, ForgotPassword, VerifyAccount, ChangePassword } from "app/containers/Auth";
import { FirstWorkspaceRedirect } from "app/components/Redirects";
import { FirstWorkspace } from "app/containers/Home/FirstWorkspace";
import { CreateDeployment, EditDeployment } from "app/containers/Home/Deployments/CreateDeployment";
import { WorkspacesLoaded, DeploymentLoaded } from "app/components/RouteGuards/Workspaces";
import { WikiRoutes } from "app/containers/Home/Wiki";
import { DeploymentProxy } from "app/containers/Home/Deployments/Proxy";
import { DeploymentMetricsPage } from "app/containers/Home/Deployments/Metrics";
import { DeploymentLogsPage } from "app/containers/Home/Deployments/Logs";
import { UpdateWorkspace } from "./containers/Home/UpdateWorkspace";
import { UserProfile } from "./containers/Home/UserProfile";
import { UserLoaded } from "app/components/RouteGuards/User";

// http://localhost:3000/verify-account?token=60142f350efcef0018872610

export const App = hot(({ history }: any) => (
  <Router history={history}>
    <Switch>
      {/* Signup / Login Paths */}
      <UnauthedRoute path="/login" component={Login} />
      <UnauthedRoute path="/signup" component={Signup} />
      <UnauthedRoute path="/forgotPassword" component={ForgotPassword} />
      <UnauthedRoute path="/verify-account" component={VerifyAccount} />
      <UnauthedRoute path="/change-password" component={ChangePassword} />
      <WorkspacesLoaded path="/w/new" component={FirstWorkspace} />
      <WorkspacesLoaded path="/w/:wid/new" component={CreateDeployment} />
      <WorkspacesLoaded path="/w/:wid/wiki" component={WikiRoutes} />
      <WorkspacesLoaded path="/w/:wid/tasks" component={WikiRoutes} />
      <DeploymentLoaded path="/w/:wid/d/:did/edit" component={EditDeployment} />
      <DeploymentLoaded path="/w/:wid/d/:did/metrics" component={DeploymentMetricsPage} />
      <DeploymentLoaded path="/w/:wid/d/:did/logs" component={DeploymentLogsPage} />
      <DeploymentLoaded path="/w/:wid/d/:did/" component={DeploymentProxy} />
      <WorkspacesLoaded path="/w/:wid/edit-workspace" component={UpdateWorkspace} />
      <WorkspacesLoaded path="/w/:wid" component={Home} />
      <UserLoaded path="/edit-profile" component={UserProfile} />
      <AuthedRoute path="" component={FirstWorkspaceRedirect} />
    </Switch>
  </Router>
));
