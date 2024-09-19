import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { LinkPage } from "./pages/LinksPages";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinkPage />} exact></Route>

        <Route path="/create" element={<CreatePage />} exact></Route>

        <Route path="/detail/:id" element={<DetailPage />}></Route>

        <Route path="*" element={<Navigate to="create" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} exact></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
