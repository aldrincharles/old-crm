import "./styles/App.css";
import "./styles/ionicons.css";
import "./styles/printStyle.css";
import React, { lazy, Suspense } from "react";

import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import { PrivateRoute, PersistLogin, PageTitle } from "./components";
import { AuthProvider } from "context/Auth";

import Login from "pages/Login";
import Unauthorized from "pages/Unauthorized";
import Layout from "./Layout";

const DashboardMain = lazy(() => import("pages/DashboardModule/DashboardMain"));
const JobListMain = lazy(() => import("pages/JobsModule/JobListMain"));
const Jobs = lazy(() => import("pages/JobsModule/Jobs"));

const OrganizationListMain = lazy(() =>
  import("pages/OrganizationsModule/OrganizationListMain")
);
const Organizations = lazy(() =>
  import("pages/OrganizationsModule/Organizations")
);

const Contacts = lazy(() => import("pages/ContactsModule/Contacts"));
const ContactDetails = lazy(() =>
  import("pages/ContactsModule/ContactDetails")
);

const MasterListMain = lazy(() =>
  import("pages/MasterlistModule/MasterListMain")
);
const MasterListSourceMain = lazy(() =>
  import("pages/MasterlistModule/MasterListSourceMain")
);

const Users = lazy(() => import("pages/UsersModule/Users"));

function App() {
  return (
    <div className="App">
      <SkeletonTheme
        highlightColor="#0f264a"
        borderRadius="0.5rem"
        duration={4}
      >
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<Layout />}>
              <Route element={<PersistLogin />}>
                <Route index element={<Navigate replace to="dashboard" />} />
                {privateRoutes.map(
                  ({ path, label, allowedRoles, Component }) => (
                    <Route
                      key={path}
                      element={<PrivateRoute allowedRoles={allowedRoles} />}
                    >
                      <Route
                        path={path}
                        element={
                          <>
                            <PageTitle title={label} />
                            <Suspense fallback={<>...</>}>
                              <Component />
                            </Suspense>
                          </>
                        }
                      />
                    </Route>
                  )
                )}
              </Route>
            </Route>
          </Routes>
          <ToastContainer position="bottom-right" theme="dark" />
        </AuthProvider>
      </SkeletonTheme>
    </div>
  );
}

const privateRoutes = [
  {
    path: "dashboard",
    label: "Home",
    allowedRoles: [0, 1, 2, 3, 4, 5],
    Component: DashboardMain,
  },
  {
    path: "jobs",
    label: "Jobs",
    allowedRoles: [0, 1, 2, 3, 4, 5],
    Component: JobListMain,
  },
  {
    path: "jobs/:id/*",
    label: "Jobs",
    Component: Jobs,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "organizations",
    label: "Organizations",
    Component: OrganizationListMain,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "organizations/:id/*",
    label: "Organizations",
    Component: Organizations,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "contacts/*",
    label: "Contacts",
    Component: Contacts,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "contacts/details/:id/*",
    label: "Contacts",
    Component: ContactDetails,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "masterlists",
    label: "Master Lists",
    Component: MasterListMain,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "masterlists/:id",
    label: "Master Lists",
    Component: MasterListSourceMain,
    allowedRoles: [0, 1, 2, 3, 4, 5],
  },
  {
    path: "users/*",
    label: "Users",
    Component: Users,
    allowedRoles: [0],
  },
];

export default App;
