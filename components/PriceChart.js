"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function PriceChart({ productId, initialPrice, initialDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      if (history.length === 0 && initialPrice) {
        setData([{
          date: new Date(initialDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          fullDate: new Date(initialDate).toLocaleString(),
          price: parseFloat(initialPrice),
        }]);
      } else {
        const chartData = history.map((item) => ({
          date: new Date(item.created_at || item.checked_at).toLocaleDateString(undefined, {
             month: 'short',
             day: 'numeric'
          }),
          fullDate: new Date(item.created_at || item.checked_at).toLocaleString(),
          price: parseFloat(item.price),
        }));
        setData(chartData);
      }
      setLoading(false);
    }

    loadData();
  }, [productId, initialPrice, initialDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 w-full animate-pulse">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading price insights...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 px-4 text-gray-500 w-full bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <p className="font-medium text-slate-600 mb-1">Starting price tracking</p>
        <p className="text-xs">We'll plot the trends as soon as we detect a price change.</p>
      </div>
    );
  }

  const latestPrice = data[data.length - 1].price;
  const initialPrice = data[0].price;
  const isPriceDown = latestPrice < initialPrice;

  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-end mb-6">
        <div>
           <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Price Velocity
          </h4>
          <p className="text-[10px] text-slate-400 font-medium">REAL-TIME TRACKING ACTIVE</p>
        </div>
        {data.length > 1 && (
           <div className={`text-xs font-bold px-2 py-1 rounded-full ${isPriceDown ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
              {isPriceDown ? '↓ Good Time to Buy' : '– Price Stable'}
           </div>
        )}
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: '#64748b' }} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              domain={['auto', 'auto']}
              dx={-10}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 shadow-xl rounded-lg border border-slate-100 ring-1 ring-black/5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{payload[0].payload.fullDate}</p>
                      <p className="text-lg font-black text-slate-900 leading-none">
                        ₹{payload[0].value.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Base line for initial price */}
            <ReferenceLine 
              y={initialPrice} 
              stroke="#cbd5e1" 
              label={{ position: 'left', value: 'Start', fill: '#94a3b8', fontSize: 10 }} 
              strokeDasharray="3 3" 
            />

            {/* Current Price indicator */}
            <ReferenceLine 
              y={latestPrice} 
              stroke={isPriceDown ? '#10b981' : '#6366f1'} 
              strokeDasharray="3 3"
              label={{ 
                position: 'right', 
                value: `Now: ₹${latestPrice.toLocaleString()}`, 
                fill: isPriceDown ? '#10b981' : '#6366f1', 
                fontSize: 10,
                fontWeight: 'bold'
              }} 
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={isPriceDown ? '#10b981' : '#6366f1'}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1500}
              dot={{ fill: isPriceDown ? '#10b981' : '#6366f1', r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
