
import React from 'react';
import { NameResult } from '../types';

interface NameCardProps {
  data: NameResult;
  index: number;
}

const NameCard: React.FC<NameCardProps> = ({ data, index }) => {
  return (
    <div className="bg-white/95 rounded-2xl shadow-lg border border-amber-100 p-8 transition-all hover:shadow-2xl hover:-translate-y-1.5 group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-amber-100/50"></div>
      
      <div className="relative">
        <div className="flex items-baseline gap-4 mb-1">
          <span className="text-4xl font-bold text-amber-950 font-serif tracking-tight">{data.name}</span>
          <span className="text-amber-600/60 font-medium tracking-widest text-sm uppercase">{data.pinyin}</span>
          <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-100">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {data.source && (
          <div className="mb-5 inline-block px-3 py-1 bg-amber-50 rounded-lg border border-amber-100/50">
            <span className="text-[10px] text-amber-700 font-serif font-bold italic">出自：{data.source}</span>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/30 rounded-xl border border-amber-100/20">
            <h4 className="text-xs font-bold text-amber-800 flex items-center gap-2 mb-2 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-amber-400"></span>
              文化寓意 (义/典)
            </h4>
            <p className="text-amber-900/80 text-sm leading-relaxed font-medium">
              {data.meaning}
            </p>
          </div>
          
          <div className="pt-1 px-1">
            <h4 className="text-xs font-bold text-emerald-800/70 flex items-center gap-2 mb-2 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              四维论证 (音/形/五行)
            </h4>
            <p className="text-amber-800/60 text-[13px] leading-relaxed italic font-serif">
              {data.reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
