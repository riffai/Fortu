import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">System Configuration</h1>

      {/* Device Configuration */}
      <div className="bg-fortu-card rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Device Settings</h3>
          <p className="text-sm text-slate-400">Configure Android terminal specific parameters</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
             <div>
               <label className="text-slate-300 font-medium">Kiosk Mode</label>
               <p className="text-xs text-slate-500">Lock application to full screen</p>
             </div>
             <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
               <input type="checkbox" className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" defaultChecked />
               <div className="w-11 h-6 bg-fortu-500 rounded-full"></div>
               <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5 shadow-md transform"></div>
             </div>
          </div>
          <hr className="border-slate-700" />
          <div className="flex items-center justify-between">
             <div>
               <label className="text-slate-300 font-medium">Camera Access</label>
               <p className="text-xs text-slate-500">Allow for traffic counting calibration</p>
             </div>
             <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm">
               Calibrate
             </button>
          </div>
        </div>
      </div>

      {/* Data Analysis Settings */}
      <div className="bg-fortu-card rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Data Analysis Thresholds</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-300 mb-2">CSI Target (%)</label>
            <input type="number" defaultValue={85} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">Max Occupancy Alert</label>
            <input type="number" defaultValue={1000} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800">Cancel</button>
        <button className="px-6 py-3 rounded-xl bg-fortu-500 text-white font-bold hover:bg-fortu-600 shadow-lg shadow-fortu-500/25">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;