import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import CSIGauge from '../components/CSIGauge';
import { TrafficData, ZoneRanking, TimeRange } from '../types';
import { generateDashboardInsights } from '../services/geminiService';

// Mock Data
const MOCK_TRAFFIC: TrafficData[] = [
  { time: '08:00', in: 120, out: 40, occupancy: 80 },
  { time: '10:00', in: 350, out: 120, occupancy: 310 },
  { time: '12:00', in: 600, out: 400, occupancy: 510 },
  { time: '14:00', in: 450, out: 480, occupancy: 480 },
  { time: '16:00', in: 800, out: 550, occupancy: 730 },
  { time: '18:00', in: 950, out: 700, occupancy: 980 },
  { time: '20:00', in: 400, out: 850, occupancy: 530 },
  { time: '22:00', in: 100, out: 500, occupancy: 130 },
];

const MOCK_RANKING: ZoneRanking[] = [
  { name: 'Electronics', value: 4500, trend: 'up' },
  { name: 'Apparel', value: 3800, trend: 'up' },
  { name: 'Home', value: 2900, trend: 'down' },
  { name: 'Beauty', value: 2400, trend: 'flat' },
  { name: 'Grocery', value: 1800, trend: 'down' },
];

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.TODAY);
  const [csiScore, setCsiScore] = useState(86);
  const [insights, setInsights] = useState<string>('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Stats cards data
  const stats = [
    { label: 'Total Visits', value: '24,592', change: '+12%', color: 'text-neon-blue' },
    { label: 'Avg. Dwell Time', value: '18m 30s', change: '+5%', color: 'text-neon-green' },
    { label: 'Conversion Rate', value: '42.8%', change: '-2%', color: 'text-orange-400' },
    { label: 'Return Customers', value: '68%', change: '+8%', color: 'text-neon-purple' },
  ];

  const handleGenerateInsights = async () => {
    setIsLoadingInsights(true);
    const result = await generateDashboardInsights(MOCK_TRAFFIC, MOCK_RANKING, csiScore);
    setInsights(result);
    setIsLoadingInsights(false);
  };

  const handleRefresh = () => {
    // Simulate data refresh
    setCsiScore(Math.floor(Math.random() * (95 - 75) + 75));
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Flow Overview</h1>
          <p className="text-slate-400 text-sm">Real-time analysis & performance metrics</p>
        </div>
        <div className="flex space-x-2 bg-fortu-card p-1 rounded-lg border border-slate-700">
          {Object.values(TimeRange).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                timeRange === range 
                  ? 'bg-fortu-500 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {range}
            </button>
          ))}
          <button 
            onClick={handleRefresh}
            className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md"
            title="Refresh Data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-fortu-card p-5 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h2 className="text-2xl font-bold text-white font-mono">{stat.value}</h2>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-900 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            {/* Tiny trend line simulation */}
            <div className="h-1 w-full bg-slate-700 mt-4 rounded-full overflow-hidden">
               <div className={`h-full ${stat.color.replace('text-', 'bg-')} w-2/3 opacity-70`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CSI Gauge & Traffic Indicators */}
        <div className="lg:col-span-1 bg-fortu-card rounded-2xl p-6 border border-slate-700 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-fortu-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Satisfaction Index
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <CSIGauge value={csiScore} label="Current Satisfaction" />
          </div>
          
          <div className="mt-8 space-y-4">
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-sm text-slate-400">Accurate Traffic</span>
                 <span className="text-neon-green font-bold">98.2%</span>
               </div>
               <div className="w-full bg-slate-700 h-2 rounded-full">
                 <div className="bg-neon-green h-2 rounded-full" style={{ width: '98.2%' }}></div>
               </div>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-sm text-slate-400">Standard Traffic</span>
                 <span className="text-neon-blue font-bold">100%</span>
               </div>
               <div className="w-full bg-slate-700 h-2 rounded-full">
                 <div className="bg-neon-blue h-2 rounded-full" style={{ width: '100%' }}></div>
               </div>
             </div>
          </div>
        </div>

        {/* Time-Based Flow Analysis */}
        <div className="lg:col-span-2 bg-fortu-card rounded-2xl p-6 border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-fortu-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              Time-based Flow Analysis
            </h3>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-fortu-500 mr-1"></span>In</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>Out</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TRAFFIC}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="in" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorIn)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="out" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOut)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Flow Ranking */}
         <div className="bg-fortu-card rounded-2xl p-6 border border-slate-700">
           <h3 className="text-xl font-bold text-white mb-6">Zone Ranking</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MOCK_RANKING} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#94a3b8" 
                    tick={{fill: '#e2e8f0', fontSize: 13, fontWeight: 500}}
                    width={100}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {MOCK_RANKING.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#3b82f6'} />
                    ))}
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>

         {/* AI Data Analysis Tool */}
         <div className="bg-fortu-card rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <svg className="w-32 h-32 text-fortu-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
              <span className="bg-gradient-to-r from-fortu-500 to-neon-purple text-transparent bg-clip-text">AI Data Analysis</span>
            </h3>
            <p className="text-slate-400 text-sm mb-6">Generate instant actionable insights based on current traffic flow and CSI metrics.</p>
            
            <div className="bg-slate-900/50 rounded-xl p-4 min-h-[140px] border border-slate-700 mb-4">
               {isLoadingInsights ? (
                 <div className="flex items-center justify-center h-full text-fortu-500 space-x-2">
                   <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   <span>Analyzing data...</span>
                 </div>
               ) : insights ? (
                 <div className="prose prose-invert prose-sm max-w-none">
                    <p className="whitespace-pre-line">{insights}</p>
                 </div>
               ) : (
                 <div className="flex items-center justify-center h-full text-slate-500 italic">
                   Click generate to view insights
                 </div>
               )}
            </div>
            
            <button 
              onClick={handleGenerateInsights}
              disabled={isLoadingInsights}
              className="w-full py-3 bg-gradient-to-r from-fortu-600 to-fortu-500 hover:from-fortu-500 hover:to-fortu-400 text-white font-bold rounded-xl shadow-lg shadow-fortu-500/20 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Generate AI Insights
            </button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;