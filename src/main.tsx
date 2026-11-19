import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Button, Input, Avatar, Badge, Breadcrumb, Tag, Segmented, Modal, Table, Empty, Tooltip, Dropdown, Form, Select, message } from 'antd';
import { AppstoreOutlined, TruckOutlined, FileTextOutlined, TeamOutlined, DollarOutlined, BankOutlined, SettingOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined, DownOutlined, ExportOutlined, StarOutlined, StarFilled, QrcodeOutlined, InboxOutlined, ContainerOutlined, UserOutlined, MenuOutlined, PlusOutlined, ArrowRightOutlined, CheckCircleOutlined, ApartmentOutlined, UnorderedListOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './styles.css';
import MasterData from './MasterData';
import ProMenu, { procurementTools } from './ProMenu';
import PickingSlip from './PickingSlip';
import DopOutstanding, { DopOrderDetail } from './DopOutstanding';
const groups = ['All tools', 'Operations', 'People & transport', 'Configuration'] as const;
const tools = [
 {name:'Ticket Board',description:'Create, organize, and track delivery tickets.',group:'Operations',icon:FileTextOutlined,label:'Start here',color:'green'},
 {name:'Loading Board',description:'Coordinate loading activities and dispatch.',group:'Operations',icon:ContainerOutlined},
 {name:'Queue Board',description:'Keep your live delivery queue moving.',group:'Operations',icon:TeamOutlined,label:'Live board',color:'blue'},
 {name:'Picking Slip',description:'View and manage picking slips for delivery orders.',group:'Operations',icon:FileTextOutlined},
 {name:'Delivery Board',description:'Manage every delivery from start to finish.',group:'Operations',icon:TruckOutlined},
 {name:'Cash Collection',description:'Track payments and reconcile collections.',group:'Operations',icon:DollarOutlined},
 {name:'DOP Outstanding',description:'Review outstanding delivery order payments.',group:'Operations',icon:FileTextOutlined},
 {name:'Company',description:'Manage companies and delivery partners.',group:'People & transport',icon:BankOutlined},
 {name:'Transport Source',description:'Organize your transport service providers.',group:'People & transport',icon:ApartmentOutlined},
 {name:'Truck',description:'Maintain your fleet and vehicle information.',group:'People & transport',icon:TruckOutlined},
 {name:'Driver',description:'Manage drivers and their contact details.',group:'People & transport',icon:UserOutlined},
 {name:'Loading Officer',description:'Manage your loading team and assignments.',group:'People & transport',icon:TeamOutlined},
 {name:'Queue',description:'Configure queues for your delivery flow.',group:'Configuration',icon:UnorderedListOutlined},
 {name:'QR Code',description:'Create and manage scannable delivery codes.',group:'Configuration',icon:QrcodeOutlined},
 {name:'Loading Bay',description:'Set up and organize your loading areas.',group:'Configuration',icon:InboxOutlined},
 {name:'Loading Dock',description:'Manage docks and dispatch locations.',group:'Configuration',icon:ContainerOutlined},
];
export default function App(){
 const [activeModule,setActiveModule]=useState('Delivery');
 const [query,setQuery]=useState(''); const [group,setGroup]=useState<string>('All tools'); const [favorites,setFavorites]=useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('ies-favorites')||'["Ticket Board","Delivery Board"]')}catch{return []}}); const [onlyFavorites,setOnlyFavorites]=useState(false); const [selected,setSelected]=useState<string|null>(()=>new URLSearchParams(window.location.search).get('view')==='picking-slip'?'Picking Slip':new URLSearchParams(window.location.search).get('view')==='dop'?'DOP Outstanding':null); const [mobile,setMobile]=useState(false); const [creating,setCreating]=useState(false); const [records,setRecords]=useState<Record<string,{key:string,name:string,status:string}[]>>(()=>{try{return JSON.parse(localStorage.getItem('ies-records')||'{}')}catch{return {}}}); const [form]=Form.useForm(); const [api,context]=message.useMessage();
 const toggle=(name:string)=>{const next=favorites.includes(name)?favorites.filter(x=>x!==name):[...favorites,name];setFavorites(next);localStorage.setItem('ies-favorites',JSON.stringify(next));};
 const visible=tools.filter(t=>(group==='All tools'||t.group===group)&&(!onlyFavorites||favorites.includes(t.name))&&(t.name+' '+t.description).toLowerCase().includes(query.toLowerCase()));
 const navigate=(value:string)=>{setGroup(value);setOnlyFavorites(false);setMobile(false)};
 return <ConfigProvider theme={{token:{colorPrimary:'#b39b00',borderRadius:8,controlHeight:38,controlHeightSM:30,controlHeightLG:44,fontSize:13,fontFamily:"Inter, Arial, sans-serif"},components:{Form:{itemMarginBottom:20,verticalLabelPadding:'0 0 8px',labelFontSize:13},Input:{paddingInline:11},Select:{optionFontSize:13},DatePicker:{inputFontSize:13}}}}>{context}<div className="legacy-app">
 <header className="legacy-header"><a href="#" className="legacy-brand" onClick={e=>e.preventDefault()}><span>◉</span> IES</a><nav>{['Task List','E-Forms','PM','FIN','CRM','PRO','HRM','Sales','Retailer','Delivery','ICT','Fleet','DMS','PROD','WHM'].map((name,i)=>{const Icon=[FileTextOutlined,ApartmentOutlined,ContainerOutlined,BankOutlined,TeamOutlined,FileTextOutlined,FileTextOutlined,DollarOutlined,UnorderedListOutlined,TruckOutlined,UserOutlined,TruckOutlined,FileTextOutlined,ContainerOutlined,ContainerOutlined][i];return <button key={name} className={name===activeModule?'selected':''} onClick={()=>{if(name==='Delivery'||name==='PRO'){setActiveModule(name);setSelected(null);setCreating(false)}else{api.info(`${name} is outside this prototype.`)}}}><Icon/>{name}</button>})}<Dropdown menu={{items:[{key:'help',label:'Help',onClick:()=>api.info('Select a module card to open its records.')}]}}><Button type="text">···</Button></Dropdown></nav><button className="legacy-profile" onClick={()=>api.info('Signed in as Admin Admin')}><Avatar size="small" style={{background:'#d9ecff',color:'#6898b8'}}>AA</Avatar>Admin Admin</button></header>
 {activeModule==='PRO'&&selected==='Master Data'?<MasterData onBack={()=>setSelected(null)}/>:activeModule==='PRO'?<ProMenu onOpen={setSelected}/>:new URLSearchParams(window.location.search).get('view')==='dop-order'?<DopOrderDetail/>:selected==='Picking Slip'?<PickingSlip onBack={()=>setSelected(null)}/>:selected==='DOP Outstanding'?<DopOutstanding onBack={()=>setSelected(null)}/>:<main className="legacy-main">{[
 ['Ticket Board','Loading Board','Queue Board','Picking Slip'],
 ['Delivery Board','Cash Collection','DOP Outstanding'],
 ['Company','Transport Source','Truck','Driver','Loading Officer'],
 ['Queue','QR Code','Loading Bay','Loading Dock']
 ].map((names,i)=><section className="legacy-section" key={i}><div className="legacy-grid">{names.map(name=>{const tool=tools.find(t=>t.name===name)!;const descriptions:Record<string,string>={'Ticket Board':'Ticket List','Loading Board':'Manage Loading','Queue Board':'Display Board','Delivery Board':'List of delivery','Cash Collection':'Cash collection list','DOP Outstanding':'DOP Outstanding List'};const expandable=['Ticket Board','Loading Board','Delivery Board','Cash Collection'].includes(name);return <button className="legacy-card" key={name} onClick={()=>setSelected(name)}><span className={'legacy-icon '+(name==='Queue Board'?'queue-icon':'')}><tool.icon/></span><span className="legacy-card-copy"><span className="legacy-title">{name}{expandable&&<DownOutlined/>}</span><span className="legacy-description">{descriptions[name]||name+' List'}</span></span></button>})}</div></section>)}</main>}</div>
 <Modal title={selected} open={!!selected&&selected!=='DOP Outstanding'&&selected!=='Picking Slip'&&selected!=='Master Data'} onCancel={()=>{setSelected(null);setCreating(false)}} width={800} footer={<Button onClick={()=>setSelected(null)}>Close</Button>}><p className="modal-description">{(activeModule==='PRO'?procurementTools:tools).find(t=>t.name===selected)?.description}</p><div className="records-toolbar"><Tag color="green">Local workspace</Tag><Button type="primary" icon={<PlusOutlined/>} onClick={()=>setCreating(true)}>Add record</Button></div><Table dataSource={records[selected||'']||[]} columns={[{title:'Reference',dataIndex:'key'},{title:'Name',dataIndex:'name'},{title:'Status',dataIndex:'status',render:v=><Tag color={v==='Completed'?'green':'blue'}>{v}</Tag>}]} locale={{emptyText:<Empty description="No records yet. Add a record to get started."/>}}/><p className="local-note">Prototype data is saved in this browser. Connect your IES API for live operations.</p></Modal>
 <Modal title={'Add to '+selected} open={creating} onCancel={()=>setCreating(false)} onOk={()=>form.submit()} okText="Create record"><Form form={form} layout="vertical" onFinish={values=>{if(!selected)return;const next={...records,[selected]:[...(records[selected]||[]),{key:'IES-'+Date.now().toString().slice(-6),...values}]};setRecords(next);localStorage.setItem('ies-records',JSON.stringify(next));setCreating(false);form.resetFields();api.success('Record created');}}><Form.Item name="name" label="Name / description" rules={[{required:true,message:'Enter a name'}]}><Input/></Form.Item><Form.Item name="status" label="Status" initialValue="Pending"><Select options={['Pending','In progress','Completed'].map(x=>({value:x,label:x}))}/></Form.Item></Form></Modal>
 </ConfigProvider>
}
createRoot(document.getElementById('root')!).render(<App/>);
