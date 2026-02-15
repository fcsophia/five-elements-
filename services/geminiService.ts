
import { GoogleGenAI, Type } from "@google/genai";
import { NamingResponse, GivenNameLength, GenderType, NamingStyle } from "../types";

export const generateNames = async (
  element: string, 
  surname: string = '', 
  nameLength: GivenNameLength = 2,
  gender: GenderType = '中性化',
  style: NamingStyle = '文雅典兴'
): Promise<NamingResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `你是一位精通中国现代姓名学与传统文化的研究员。
  请根据以下要求提供5个真实、得体且富有文化内涵的名字。

  【核心参考：拒绝虚浮】
  参考《中国普通人名大全》的取名逻辑：名字要像“真实生活中存在的人”，而不是玄幻小说或网文主角。
  ❌ 避开：墨、染、浅、离、邪、魅、影、琉、璃等虚浮词。
  ✅ 倾向：参考“国瑞、雅南、奕云、柏宏、子帆、志豪、文隆、彦文”等真实感强的遣词。

  【核心配置】
  1. 姓氏：${surname || '（请自行搭配意境相符的常用姓氏）'}
  2. 名字字数（不含姓）：${nameLength}个字
  3. 五行能量：${element}（需在字形或意蕴上体现）
  4. 性别：${gender}
  5. 风格：${style}

  【起名多维逻辑】
  1. 现实感：名字要易于称呼，在社交、职场、户籍管理中显得得体、大方。
  2. 音律：平仄错落，不拗口。
  3. 结构：汉字笔画疏密适中，避开生僻字，确保电脑系统能正常输入。
  4. 风格匹配：
     - 文雅典兴：书卷气，如“雅、奕、谦、修”。
     - 现代干练：利落，如“宇、杰、帆、宏”。
     - 平易亲和：亲切，如“彦、文、雯、佳”。
     - 端庄稳重：厚重，如“国、德、隆、安”。

  【输出要求】
  返回JSON格式，包含name (含姓氏), pinyin, meaning (名字寓意), reasoning (为何符合五行和${style}风格), source (文学或文化出处)。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  pinyin: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  source: { type: Type.STRING }
                },
                required: ["name", "pinyin", "meaning", "reasoning"]
              }
            }
          },
          required: ["names"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("API 返回内容为空");
    return JSON.parse(text) as NamingResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
