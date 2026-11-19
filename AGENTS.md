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
- List/status and record tabs use a white background with primary gold text and border (outline treatment), rather than a filled gold background.
- Exception: shared Details / Activity Log navigation retains the original gold underline style at compact height; outline styling applies to list/status and record tabs.

## Shared detail component baseline

Reuse `RecordDetailHeader`, `RecordInformationCard`, and `ActivityLog` for new record details. Details / Activity Log tabs use gold text and a gold underline, no outlined box, at 40px height with 13px text. Keep list/status and record tabs outlined. Information card headings use 12px vertical / 18px horizontal padding, Descriptions use 14px top / 18px horizontal padding, and cards have 16px spacing. Keep the title at 22px. Preserve these styles when adding fields or modules.

## Card consistency

Keep card design consistent across modules: white background, subtle border, shared corner radius, and balanced top/bottom spacing. Reuse shared card components and styles rather than introducing per-screen variations. Activity cards use equal 24px padding on desktop and 20px vertical / 16px horizontal on mobile; remove trailing timeline space instead of compensating with uneven padding. Keep information-card header/body spacing aligned with the shared detail baseline above.

- Use Inter as the shared UI font, with Arial and sans-serif fallbacks. Preserve the established compact font sizes.

- Status/filter tabs such as All / Not printed / Printed use a filled gold selected state with white text and a white count badge. Record tabs remain outlined; Details / Activity Log remain underlined.
