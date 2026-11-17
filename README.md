# IES Delivery Workspace

A responsive redesign of the supplied IES Delivery screen, built with React, TypeScript, Vite, Ant Design 5, and Ant Design icons.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

All 15 reference modules are organized into Operations, People & transport, and Configuration. Search and category filters work together; favorites and added prototype records persist in browser localStorage. Each tool opens a record view with an add-record form. Other enterprise modules are represented in the workspace selector but are outside this delivery prototype.

This project has no backend connection. Connect the record views to the existing IES API before using them for live operations.
