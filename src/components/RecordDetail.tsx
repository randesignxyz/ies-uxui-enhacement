import type { ReactNode } from 'react';
import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import './record-detail.css';

type DetailTab = { key: string; label: ReactNode; icon?: ReactNode };
type RecordDetailHeaderProps = {
  title: ReactNode;
  reference: ReactNode;
  icon: ReactNode;
  status: { text: string; tone: BadgeProps['status'] };
  actions?: ReactNode;
  tabs: DetailTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

/** Shared IES read-only record header with status, actions and section tabs. */
export function RecordDetailHeader({ title, reference, icon, status, actions, tabs, activeTab, onTabChange }: RecordDetailHeaderProps) {
  return <section className="picking-detail-header">
    <div className="picking-detail-summary">
      <div className="picking-detail-icon">{icon}</div>
      <div className="picking-detail-identity">
        <h1>{title}</h1>
        <div className="picking-detail-reference"><span>{reference}</span><Badge status={status.tone} text={status.text}/></div>
      </div>
      {actions && <div className="picking-actions no-print">{actions}</div>}
    </div>
    <div className="picking-detail-tabs no-print" role="tablist">
      {tabs.map(tab => <button key={tab.key} role="tab" aria-selected={activeTab === tab.key} className={activeTab === tab.key ? 'active' : ''} onClick={() => onTabChange(tab.key)}>{tab.icon}{tab.label}</button>)}
    </div>
  </section>;
}

/** Titled information card for inline Ant Design Descriptions. */
export function RecordInformationCard({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <section className="picking-panel picking-information-card"><h2>{title}</h2>{children}</section>;
}
