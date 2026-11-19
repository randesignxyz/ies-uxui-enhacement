import type { ReactNode } from 'react';
import { Empty, Timeline } from 'antd';
import { CalendarOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import './activity-log.css';

export type ActivityEntry = { action: string; at: string; by: string; description?: string };

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const day = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Phnom_Penh', day: '2-digit', month: 'short', year: 'numeric' }).format(date).replace(/ /g, '-');
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Phnom_Penh', hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  return `${day} ${time}`;
}

/** Shared IES activity timeline; callers supply entries in chronological order. */
export function ActivityLog({ entries, note, renderAction }: { entries: ActivityEntry[]; note?: string; renderAction?: (entry: ActivityEntry) => ReactNode }) {
  return <section className="record-activity-card no-print">
    {entries.length ? <Timeline items={[...entries].reverse().map(entry => ({
      color: '#b39b00',
      children: <div className="record-activity-row">
        <strong className="record-activity-action">{entry.action}</strong>
        <span className="record-activity-meta"><CalendarOutlined/><time dateTime={entry.at}>{formatDate(entry.at)}</time></span>
        <span className="record-activity-meta"><UserOutlined/><span>By: <strong>{entry.by}</strong></span></span>
        <span className="record-activity-meta"><FileTextOutlined/><span>{entry.description?.startsWith('Remark: ')?<><span className="activity-remark-label">Remark: </span><span className="activity-remark-value">{entry.description.slice(8)}</span></>:entry.description || '—'}{renderAction?.(entry)}</span></span>
      </div>
    }))}/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No activity recorded yet"/>}
    {note && <p className="record-activity-note">{note}</p>}
  </section>;
}
