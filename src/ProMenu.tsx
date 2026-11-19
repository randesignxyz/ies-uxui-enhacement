import { AuditOutlined, FileTextOutlined, ShoppingOutlined, SolutionOutlined, ReconciliationOutlined, SettingOutlined, DatabaseOutlined, DownOutlined } from '@ant-design/icons';

export const procurementTools = [
  {name:'Purchase Requisition',description:'Purchase Requisition List',icon:FileTextOutlined,expandable:true},
  {name:'Quotation',description:'Quotation List',icon:SolutionOutlined,expandable:true},
  {name:'Purchase Approval',description:'Purchase Approval (PA)',icon:AuditOutlined},
  {name:'Purchase Order',description:'Purchase Requisition Process',icon:ShoppingOutlined,expandable:true},
  {name:'SAP Integration Log',description:'SAP Posting Log',icon:ReconciliationOutlined},
  {name:'Settings',description:'PA limit, SAP vendor defaults and PO posting, per company',icon:SettingOutlined},
  {name:'Master Data',description:'Manage procurement master data',icon:DatabaseOutlined},
];

export default function ProMenu({onOpen}:{onOpen:(name:string)=>void}) {
  return <main className="legacy-main pro-main" aria-label="Procurement modules">
    <div className="legacy-grid pro-grid">
      {procurementTools.map(tool=><button className="legacy-card" key={tool.name} onClick={()=>onOpen(tool.name)}>
        <span className="legacy-icon"><tool.icon/></span>
        <span className="legacy-card-copy"><span className="legacy-title">{tool.name}{tool.expandable&&<DownOutlined/>}</span><span className="legacy-description">{tool.description}</span></span>
      </button>)}
    </div>
  </main>;
}
