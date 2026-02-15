
import React, { useState, useCallback } from 'react';
import { generateNames } from './services/geminiService';
import { NameResult, ElementType, GivenNameLength, GenderType, NamingStyle } from './types';
import NameCard from './components/NameCard';

const App: React.FC = () => {
  const [surname, setSurname] = useState<string>('');
  const [inputElement, setInputElement] = useState<string>('');
  const [nameLength, setNameLength] = useState<GivenNameLength>(2);
  const [gender, setGender] = useState<GenderType>('中性化');
  const [style, setStyle] = useState<NamingStyle>('文雅典兴');
  const [results, setResults] = useState<NameResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!inputElement.trim()) {
      setError('请输入五行属性');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await generateNames(inputElement, surname, nameLength, gender, style);
      setResults(response.names);
    } catch (err) {
      setError('生成失败，请重试。');
    } finally {
      setLoading(false);
    }
  }, [inputElement, surname, nameLength, gender, style]);

  return (
    <div className="min-h-screen pb-20 relative">
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center text-white font-bold font-serif shadow-lg">
              五
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-amber-900 font-serif">五行起名助手</h1>
              <p className="text-[10px] text-amber-600 font-medium uppercase tracking-[0.2em] -mt-1">Noble Naming Assistant</p>
            </div>
          </div>
          <p className="text-xs text-amber-700/60 hidden sm:block italic font-serif">乾坤之道，名以正体</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-12 relative z-0">
        <section className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-950 mb-4 font-serif leading-tight">
            尊享五行底蕴<br/>
            <span className="text-amber-700">定制锦绣之名</span>
          </h2>
          <p className="text-amber-800/70 max-w-xl mx-auto text-lg font-medium">
            请输入您的姓氏与期望的五行特质，AI 将为您在现实之基上，排演四维合一的传世嘉名。
          </p>
        </section>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-900/10 p-8 mb-12 border border-amber-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-800 uppercase tracking-widest block ml-1">家族姓氏</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="姓氏"
                className="w-full h-[54px] px-5 rounded-2xl border-2 border-amber-100 bg-amber-50/20 focus:border-amber-500 transition-all text-lg font-serif text-amber-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-800 uppercase tracking-widest block ml-1">字数选择</label>
              <div className="flex bg-amber-50/40 p-1 rounded-2xl border-2 border-amber-100 h-[54px]">
                {[1, 2].map((len) => (
                  <button
                    key={len}
                    onClick={() => setNameLength(len as GivenNameLength)}
                    className={`flex-1 rounded-xl text-sm font-bold transition-all ${
                      nameLength === len ? 'bg-amber-700 text-white shadow-lg' : 'text-amber-700 hover:bg-amber-100/50'
                    }`}
                  >{len}字名</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-800 uppercase tracking-widest block ml-1">性别倾向</label>
              <div className="flex bg-amber-50/40 p-1 rounded-2xl border-2 border-amber-100 h-[54px]">
                {(['男', '女', '中性化'] as GenderType[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 rounded-xl text-sm font-bold transition-all ${
                      gender === g ? 'bg-amber-800 text-white shadow-lg' : 'text-amber-800 hover:bg-amber-100/50'
                    }`}
                  >{g}</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-800 uppercase tracking-widest block ml-1">风格取向</label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value as NamingStyle)}
                className="w-full h-[54px] px-4 rounded-2xl border-2 border-amber-100 bg-amber-50/40 text-amber-900 font-bold text-sm focus:border-amber-500 outline-none"
              >
                {['文雅典兴', '现代干练', '平易亲和', '端庄稳重'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-amber-800 uppercase tracking-widest block ml-1">五行补益</label>
              <div className="flex flex-wrap gap-2.5">
                {[ElementType.METAL, ElementType.WOOD, ElementType.WATER, ElementType.FIRE, ElementType.EARTH].map((el) => (
                  <button
                    key={el}
                    onClick={() => setInputElement(el)}
                    className={`px-6 py-2 rounded-full border-2 transition-all text-sm font-bold shadow-sm ${
                      inputElement === el ? 'bg-amber-600 border-amber-600 text-white transform scale-105' : 'bg-white border-amber-100 text-amber-700 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >{el}</button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={inputElement}
                onChange={(e) => setInputElement(e.target.value)}
                placeholder="手动输入属性，或：金木相生"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-amber-100 bg-amber-50/30 focus:border-amber-500 transition-all text-xl font-serif text-amber-900 placeholder-amber-200"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-amber-800 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-amber-900 shadow-xl shadow-amber-900/20 disabled:opacity-50 transition-all active:scale-95"
              >
                {loading ? '乾坤推演中...' : '立即起名'}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-3 font-serif">
                <span className="w-2 h-8 bg-amber-700 rounded-full"></span>
                “{inputElement}”·{style}系尊名推荐
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((item, idx) => (
                <NameCard key={idx} data={item} index={idx} />
              ))}
            </div>
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-amber-200/60">
             <div className="relative inline-block mb-4">
               <svg className="w-16 h-16 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-amber-800/60 font-serif text-xl italic">待君录入详情，起卦寻名</p>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-amber-200/50 py-12 bg-white/30 text-center">
        <p className="text-amber-800/40 text-sm font-medium tracking-widest uppercase">
          © 2024 五行起名助手 · 典雅传世 · 智慧尊享
        </p>
      </footer>
    </div>
  );
};

export default App;
