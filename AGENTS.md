# IES UI standards

Use the Picking Slip list and detail layouts as the shared design standard for new and updated module screens. Preserve existing screens outside the requested scope.

- Use Ant Design components with the existing compact typography and responsive sizing. Do not enlarge cards, text, or icons just because the viewport is wide.
- Lists follow `src/PickingSlip.tsx`: title and actions, module tab, white table panel, search and relevant filters, status tabs with counts, and pagination. Use the established gold accent for list navigation and primary actions.
- Details open in closable Ant Design card tabs on the same page beside the persistent list tab, following the Picking Slip implementation. Reuse an open record tab rather than opening duplicates.
- Reuse `RecordDetailHeader` and `RecordInformationCard` from `src/components/RecordDetail.tsx`. Extend these shared components when a common layout change is needed rather than copying their markup.
- Detail header: record name, icon tile, reference, status, and right-aligned actions. Keep supporting counts inline with their action buttons.
- Detail navigation: Details and Activity Log with its count. Add other tabs only when required by the module.
- Display read-only information with horizontal Ant Design Descriptions (inline label and value), never disabled inputs or selects. Show missing values as an em dash.
- Group information in white cards with subtle borders, rounded corners, and section headings where useful. Keep item tables compact.
- Retain responsive layouts, accessible labels, and print styling. Printing should exclude navigation, actions, and activity logs.
- Picking Slip tracks print requests rather than confirmed physical prints; keep print status, count, and activity history consistent.

- Reuse `ActivityLog` from `src/components/ActivityLog.tsx` for activity tabs: white card, gold timeline markers, and responsive columns for action, date/time, user, and description. Show newest events first and format dates in Asia/Phnom_Penh.

- App-wide Ant Design primary color is gold `#b39b00`, matching Reload. Use the ConfigProvider token for primary buttons, links, focus states, and selections.
