import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Noto+Sans+KR:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f7f5f2; font-family: 'Noto Sans KR', sans-serif; }

  .page {
    min-height: 100vh;
    background: #f7f5f2;
    display: flex;
    justify-content: center;
    padding: 48px 16px;
  }

  .card {
    background: #ffffff;
    width: 100%;
    max-width: 600px;
    border: 1px solid #e8e4df;
    padding: 52px 48px 48px;
    position: relative;
  }

  .corner-tl, .corner-br {
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: #c9b99a;
    border-style: solid;
  }
  .corner-tl { top: 14px; left: 14px; border-width: 1px 0 0 1px; }
  .corner-br { bottom: 14px; right: 14px; border-width: 0 1px 1px 0; }

  .brand-area {
    text-align: center;
    margin-bottom: 36px;
    padding-bottom: 28px;
    border-bottom: 1px solid #ebe7e2;
  }

  .brand-en {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    letter-spacing: 0.2em;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .brand-sub {
    font-size: 10px;
    letter-spacing: 0.25em;
    color: #a89880;
    font-weight: 300;
    text-transform: uppercase;
  }

  .reservation-box {
    background: #faf8f5;
    border: 1px solid #ebe7e2;
    padding: 16px 20px;
    margin-bottom: 36px;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .res-item { flex: 1; min-width: 120px; }

  .res-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    color: #a89880;
    text-transform: uppercase;
    margin-bottom: 4px;
    font-weight: 300;
  }

  .res-value {
    font-size: 13px;
    color: #1a1a1a;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .section { margin-bottom: 32px; }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    color: #1a1a1a;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ebe7e2;
  }

  .section-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    color: #c9b99a;
    font-style: normal;
    letter-spacing: 0.1em;
  }

  .question-block { margin-bottom: 20px; }

  .question-label {
    font-size: 11px;
    color: #6b6158;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    font-weight: 300;
    line-height: 1.6;
  }

  .chip-group { display: flex; flex-wrap: wrap; gap: 6px; }

  .chip {
    padding: 6px 14px;
    border: 1px solid #ddd8d0;
    font-size: 11px;
    color: #6b6158;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: all 0.2s;
    background: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
  }

  .chip:hover { border-color: #c9b99a; color: #1a1a1a; }
  .chip.selected { background: #1a1a1a; border-color: #1a1a1a; color: #ffffff; }

  .text-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ddd8d0;
    padding: 8px 0;
    font-size: 12px;
    color: #1a1a1a;
    background: transparent;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    letter-spacing: 0.05em;
    outline: none;
    transition: border-color 0.2s;
  }

  .text-input:focus { border-bottom-color: #1a1a1a; }
  .text-input::placeholder { color: #c5bfb8; }

  .textarea-input {
    width: 100%;
    border: 1px solid #ddd8d0;
    padding: 12px 14px;
    font-size: 12px;
    color: #1a1a1a;
    background: #faf8f5;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    letter-spacing: 0.05em;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
    line-height: 1.8;
    min-height: 80px;
  }

  .textarea-input:focus { border-color: #1a1a1a; }
  .textarea-input::placeholder { color: #c5bfb8; }

  .upload-area {
    border: 1px dashed #ddd8d0;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: #faf8f5;
    position: relative;
  }

  .upload-area:hover { border-color: #c9b99a; background: #f7f3ee; }

  .upload-area input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .upload-icon {
    font-size: 20px;
    margin-bottom: 6px;
    color: #c9b99a;
  }

  .upload-text {
    font-size: 11px;
    color: #a89880;
    letter-spacing: 0.08em;
    font-weight: 300;
  }

  .upload-sublabel {
    font-size: 10px;
    color: #c5bfb8;
    margin-top: 6px;
    letter-spacing: 0.06em;
    font-weight: 300;
    line-height: 1.6;
  }

  .upload-previews {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .upload-preview {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #ebe7e2;
  }

  .upload-remove {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 18px;
    height: 18px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .yes-no { display: flex; gap: 8px; }

  .yn-btn {
    padding: 6px 20px;
    border: 1px solid #ddd8d0;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;
    background: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    letter-spacing: 0.05em;
    color: #6b6158;
  }

  .yn-btn.selected { background: #1a1a1a; border-color: #1a1a1a; color: #fff; }

  .divider { height: 1px; background: #ebe7e2; margin: 28px 0; }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #1a1a1a;
    color: #ffffff;
    border: none;
    font-size: 11px;
    letter-spacing: 0.25em;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    transition: background 0.2s;
    margin-top: 8px;
  }

  .submit-btn:hover { background: #c9b99a; }

  .footer-note {
    text-align: center;
    margin-top: 20px;
    font-size: 10px;
    color: #c5bfb8;
    letter-spacing: 0.12em;
    line-height: 1.8;
    font-weight: 300;
  }

  .thank-you { text-align: center; padding: 60px 20px; }

  .thank-you .ty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    font-style: italic;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  .thank-you .ty-sub {
    font-size: 11px;
    color: #a89880;
    letter-spacing: 0.15em;
    line-height: 2;
    font-weight: 300;
  }

  .lang-toggle {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: 24px;
  }

  .lang-btn {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #a89880;
    cursor: pointer;
    padding: 4px 8px;
    border: 1px solid transparent;
    background: none;
    font-family: 'Noto Sans KR', sans-serif;
    transition: all 0.2s;
  }

  .lang-btn.active { border-color: #c9b99a; color: #1a1a1a; }
`;

const content = {
  ko: {
    brandSub: "MAKEUP CONSULTATION",
    resLabels: { name: "고객명", date: "예약 일시", service: "서비스" },
    sections: [
      {
        title: "오늘의 무드",
        num: "01",
        questions: [
          {
            id: "occasion",
            type: "chips_with_sub",
            label: "오늘 방문 목적",
            options: ["데일리", "촬영", "하객", "파티·행사", "소개팅·데이트", "면접", "기타"],
            subTriggers: {
              "촬영": "ex. 화보, 유튜브 촬영, 증명사진...",
              "기타": "ex. 돌잔치, 졸업식..."
            }
          },
          {
            id: "mood_word",
            type: "chips",
            label: "오늘 메이크업의 키워드를 골라주세요.",
            options: ["맑고 깔끔하게", "색감있게", "자연스럽게", "또렷하게", "화려하게", "분위기있게", "잘 모르겠어요"]
          },
          {
            id: "vibe",
            type: "text",
            showIf: { id: "occasion", value: "촬영" },
            label: "사진/영상에서 어떤 느낌이길 바라나요?",
            placeholder: "ex. 필름감성, 화보느낌, 자연스럽게 예쁜..."
          }
        ]
      },
      {
        title: "컬러톤",
        num: "02",
        questions: [
          {
            id: "personal_color",
            type: "chips",
            label: "퍼스널컬러 추구미는?",
            options: ["봄 웜", "여름 쿨", "가을 웜", "겨울 쿨", "잘 모르겠어요"]
          },
          {
            id: "color_pref",
            type: "chips",
            label: "선호하는 립/블러셔 색감은?",
            options: ["피치", "코랄", "핑크", "모브", "베이지", "레드", "플럼", "잘 모르겠어요"]
          }
        ]
      },
      {
        title: "피부 & 컨디션",
        num: "03",
        questions: [
          {
            id: "skin",
            type: "chips",
            label: "피부 타입",
            options: ["지성", "건성", "복합성", "민감성", "중성", "잘 모르겠어요"]
          },
          {
            id: "concern",
            type: "text",
            label: "피부 고민이나 커버하고 싶은 부분이 있으신가요?",
            placeholder: "ex. 다크서클, 모공, 붉은기..."
          },
          {
            id: "allergy",
            type: "yesno",
            label: "알레르기 또는 민감한 성분 / 제품이 있으신가요?",
            subInput: true,
            subPlaceholder: "ex. 라텍스, 향료, OO브랜드 파운데이션..."
          }
        ]
      },
      {
        title: "나만의 취향 & 포인트",
        num: "04",
        questions: [
          {
            id: "focus",
            type: "chips_with_other",
            label: "본인이 생각하는 내 얼굴의 포인트는?",
            options: ["눈매", "코", "입술", "피부", "얼굴형", "전체적인 조화", "잘 모르겠어요", "기타"]
          },
          {
            id: "filter",
            type: "chips_with_other",
            label: "셀카 보정 시 가장 신경 쓰이는 부위는? (복수 선택 가능)",
            options: ["전체 톤", "피부결/모공", "잡티/트러블", "다크서클", "눈매", "중안부", "코", "입술", "턱선/윤곽", "기타"]
          },
          {
            id: "no_style",
            type: "text",
            label: "피하고 싶은 표현이나 절대 NO인 메이크업이 있다면?",
            placeholder: "ex. 너무 두꺼운 속눈썹, 짙은 스모키, 과한 쉐딩..."
          },
          {
            id: "result",
            type: "chips",
            max: 2,
            label: "메이크업 후 가장 선호하는 결과는? (최대 2개)",
            options: ["자연스럽고 나에게 어울리게", "피부가 좋아보이게", "내 장점이 돋보이게", "사진에 예쁘게 나오게", "인상이 달라보이게", "새로운 분위기로 보이게", "디자이너 추천"]
          }
        ]
      },
      {
        title: "사진 첨부",
        num: "05",
        questions: [
          {
            id: "photo_my_style",
            type: "upload",
            label: "평소 메이크업 스타일 사진을 첨부해주세요.",
            sublabel: "평소 본인이 즐기는 메이크업이 담긴 셀카나 사진이면 충분해요."
          },
          {
            id: "photo_reference",
            type: "upload",
            label: "원하는 메이크업 레퍼런스 사진을 첨부해주세요.",
            sublabel: "여러 장도 괜찮아요. 분위기나 느낌이 담긴 사진이면 뭐든지 환영이에요."
          }
        ]
      },
      {
        title: "자유롭게 적어주세요",
        num: "06",
        questions: [
          {
            id: "free",
            type: "textarea",
            label: "위 질문 외에 디자이너에게 전하고 싶은 말이 있다면 무엇이든 편하게 적어주세요.",
            placeholder: "ex. 오늘 컨디션, 특별히 신경 써줬으면 하는 부분, 전달하고 싶은 이야기..."
          }
        ]
      }
    ],
    submit: "상담지 제출하기",
    footer: "작성해주신 내용을 바탕으로\n방문 전 꼼나나에서 미리 준비하겠습니다.",
    thankTitle: "감사합니다",
    thankSub: "소중한 답변 감사합니다 : )\n작성해주신 내용을 바탕으로 방문 전 미리 준비하겠습니다.\nCOMMENANA에서 기다리고 있을게요 🤍"
  },
  en: {
    brandSub: "MAKEUP CONSULTATION",
    resLabels: { name: "Client", date: "Appointment", service: "Service" },
    sections: [
      {
        title: "Today's Mood",
        num: "01",
        questions: [
          {
            id: "occasion",
            type: "chips_with_sub",
            label: "Purpose of today's visit",
            options: ["Daily", "Shoot", "Wedding Guest", "Party·Event", "Blind Date·Date", "Interview", "Other"],
            subTriggers: {
              "Shoot": "ex. Editorial, YouTube, ID photo...",
              "Other": "ex. Graduation, birthday party..."
            }
          },
          {
            id: "mood_word",
            type: "chips",
            label: "Choose the keyword for today's makeup.",
            options: ["Clear & Fresh", "Colorful", "Natural", "Defined", "Glamorous", "Moody", "Not sure"]
          },
          {
            id: "vibe",
            type: "text",
            showIf: { id: "occasion", value: "Shoot" },
            label: "How would you like to look in photos or video?",
            placeholder: "ex. Film-like, editorial, naturally beautiful..."
          }
        ]
      },
      {
        title: "Color Tone",
        num: "02",
        questions: [
          {
            id: "personal_color",
            type: "chips",
            label: "What's your personal color season?",
            options: ["Spring Warm", "Summer Cool", "Autumn Warm", "Winter Cool", "Not sure"]
          },
          {
            id: "color_pref",
            type: "chips",
            label: "Preferred lip/blusher color tone?",
            options: ["Peach", "Coral", "Pink", "Mauve", "Beige", "Red", "Plum", "Not sure"]
          }
        ]
      },
      {
        title: "Skin & Condition",
        num: "03",
        questions: [
          {
            id: "skin",
            type: "chips",
            label: "Skin Type",
            options: ["Oily", "Dry", "Combination", "Sensitive", "Normal", "Not sure"]
          },
          {
            id: "concern",
            type: "text",
            label: "Do you have any skin concerns or areas you'd like to cover?",
            placeholder: "ex. Dark circles, pores, redness..."
          },
          {
            id: "allergy",
            type: "yesno",
            label: "Do you have any allergies or sensitivities to ingredients / products?",
            subInput: true,
            subPlaceholder: "ex. Latex, fragrance, specific foundation brand..."
          }
        ]
      },
      {
        title: "My Style & Point",
        num: "04",
        questions: [
          {
            id: "focus",
            type: "chips_with_other",
            label: "What do you consider your best feature?",
            options: ["Eye shape", "Nose", "Lips", "Skin", "Face shape", "Overall harmony", "Not sure", "Other"]
          },
          {
            id: "filter",
            type: "chips_with_other",
            label: "Which areas bother you most when editing selfies? (multiple choice)",
            options: ["Overall tone", "Skin texture/Pores", "Blemishes", "Dark circles", "Eye shape", "Mid-face", "Nose", "Lips", "Jawline", "Other"]
          },
          {
            id: "no_style",
            type: "text",
            label: "Any expressions or styles you'd like to avoid?",
            placeholder: "ex. Heavy lashes, dramatic smoky eyes, strong contouring..."
          },
          {
            id: "result",
            type: "chips",
            max: 2,
            label: "What's your ideal result after makeup? (up to 2)",
            options: ["Natural & true to me", "Glowing skin", "My best features highlighted", "Photogenic", "A different impression", "Fresh new vibe", "Designer's pick"]
          }
        ]
      },
      {
        title: "Photo Attachments",
        num: "05",
        questions: [
          {
            id: "photo_my_style",
            type: "upload",
            label: "Please attach a photo of your everyday makeup style.",
            sublabel: "A selfie or photo showing your usual look works perfectly."
          },
          {
            id: "photo_reference",
            type: "upload",
            label: "Please attach your makeup reference photo(s).",
            sublabel: "Multiple photos are welcome — anything that captures the vibe you're going for."
          }
        ]
      },
      {
        title: "Anything Else?",
        num: "06",
        questions: [
          {
            id: "free",
            type: "textarea",
            label: "Feel free to share anything else you'd like your designer to know.",
            placeholder: "ex. How you're feeling today, specific requests, anything on your mind..."
          }
        ]
      }
    ],
    submit: "Submit Consultation",
    footer: "Based on your answers,\nCOMMENANA will prepare everything before your visit.",
    thankTitle: "Thank You",
    thankSub: "We've received your answers.\nWe'll use them to create a truly personal experience for you.\n\nSee you soon at COMMENANA ✦"
  },
  zh: {
    brandSub: "化妆咨询表",
    resLabels: { name: "顾客姓名", date: "预约时间", service: "服务项目" },
    sections: [
      {
        title: "今日心情",
        num: "01",
        questions: [
          {
            id: "occasion",
            type: "chips_with_sub",
            label: "今日到访目的",
            options: ["日常", "拍摄", "婚礼宾客", "派对·活动", "相亲·约会", "面试", "其他"],
            subTriggers: {
              "拍摄": "例：写真、YouTube拍摄、证件照...",
              "其他": "例：毕业典礼、生日派对..."
            }
          },
          {
            id: "mood_word",
            type: "chips",
            label: "请选择今日妆容的关键词。",
            options: ["清透干净", "色彩感", "自然妆感", "轮廓分明", "华丽感", "有氛围感", "还不确定"]
          },
          {
            id: "vibe",
            type: "text",
            showIf: { id: "occasion", value: "拍摄" },
            label: "希望在照片或视频中呈现什么感觉？",
            placeholder: "例：胶片感、大片感、自然好看..."
          }
        ]
      },
      {
        title: "色彩偏好",
        num: "02",
        questions: [
          {
            id: "personal_color",
            type: "chips",
            label: "您的个人色彩季型是？",
            options: ["春暖色", "夏冷色", "秋暖色", "冬冷色", "还不确定"]
          },
          {
            id: "color_pref",
            type: "chips",
            label: "偏好的唇/腮红色调是？",
            options: ["桃色", "珊瑚色", "粉色", "莫兰迪", "米色", "正红", "梅子色", "还不确定"]
          }
        ]
      },
      {
        title: "肤质 & 状态",
        num: "03",
        questions: [
          {
            id: "skin",
            type: "chips",
            label: "您的肤质类型",
            options: ["油性", "干性", "混合性", "敏感性", "中性", "还不确定"]
          },
          {
            id: "concern",
            type: "text",
            label: "您有哪些肌肤烦恼或想遮盖的部位？",
            placeholder: "例：黑眼圈、毛孔、泛红..."
          },
          {
            id: "allergy",
            type: "yesno",
            label: "您是否对某些成分或产品过敏/敏感？",
            subInput: true,
            subPlaceholder: "例：乳胶、香料、某品牌粉底液...",
            yesLabel: "是",
            noLabel: "否"
          }
        ]
      },
      {
        title: "我的风格 & 重点",
        num: "04",
        questions: [
          {
            id: "focus",
            type: "chips_with_other",
            label: "您认为自己脸部最有特色的部位是？",
            options: ["眼形", "鼻子", "嘴唇", "皮肤", "脸型", "整体协调感", "还不确定", "其他"]
          },
          {
            id: "filter",
            type: "chips_with_other",
            label: "修图自拍时，您最在意哪些部位？（可多选）",
            options: ["整体肤色", "肤质/毛孔", "斑点/痘印", "黑眼圈", "眼形", "鼻中隔区域", "鼻子", "嘴唇", "下颌线/轮廓", "其他"]
          },
          {
            id: "no_style",
            type: "text",
            label: "有没有想避免的妆容表现或绝对不喜欢的风格？",
            placeholder: "例：太厚重的假睫毛、浓烈烟熏妆、过强轮廓感..."
          },
          {
            id: "result",
            type: "chips",
            max: 2,
            label: "化妆后您最希望呈现的效果是？（最多选2个）",
            options: ["自然且适合自己", "皮肤看起来很好", "优点更突出", "拍照好看", "给人不同的印象", "呈现全新气质", "设计师推荐"]
          }
        ]
      },
      {
        title: "照片上传",
        num: "05",
        questions: [
          {
            id: "photo_my_style",
            type: "upload",
            label: "请上传您平时的妆容照片。",
            sublabel: "平时妆容的自拍或照片即可，越自然越好。"
          },
          {
            id: "photo_reference",
            type: "upload",
            label: "请上传您想要的妆容参考图。",
            sublabel: "可以上传多张，任何能体现您想要的氛围或感觉的图片都欢迎。"
          }
        ]
      },
      {
        title: "自由填写",
        num: "06",
        questions: [
          {
            id: "free",
            type: "textarea",
            label: "除以上问题外，有什么想对设计师说的，都可以在这里自由填写。",
            placeholder: "例：今日状态、特别想关注的部分、任何想传达的内容..."
          }
        ]
      }
    ],
    submit: "提交咨询表",
    footer: "根据您填写的内容，\nCOMMENANA 将在您到访前提前做好准备。",
    thankTitle: "感谢您",
    thankSub: "已收到您宝贵的回答。\n我们将根据您的需求，为您打造专属的美丽体验。\n\nCOMMENANA 期待与您相见 ✦"
  }
};

export default function App() {
  const [lang, setLang] = useState("ko");
  const [answers, setAnswers] = useState({});
  const [uploads, setUploads] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [params, setParams] = useState({ name: "", date: "", service: "메이크업" });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setParams({
      name: p.get("name") || "",
      date: p.get("date") || "",
      service: p.get("service") || "메이크업"
    });
  }, []);

  const handleUpload = (id, files) => {
    const fileArr = Array.from(files);
    fileArr.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploads(prev => ({
          ...prev,
          [id]: [...(prev[id] || []), { name: file.name, url: e.target.result }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUpload = (id, idx) => {
    setUploads(prev => ({ ...prev, [id]: prev[id].filter((_, i) => i !== idx) }));
  };

  const c = content[lang];

  const setChip = (id, val, max) => {
    setAnswers(prev => {
      const cur = prev[id] || [];
      if (cur.includes(val)) return { ...prev, [id]: cur.filter(v => v !== val) };
      if (max && cur.length >= max) return prev;
      return { ...prev, [id]: [...cur, val] };
    });
  };

  const setText = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const setYN = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const handleSubmit = () => {
    setSubmitted(true);

    const fields = {
      "고객명": params.name || "",
      "예약일시": params.date || "",
      "서비스": params.service || "",
      "방문목적": (answers["occasion"] || []).join(", "),
      "메이크업키워드": (answers["mood_word"] || []).join(", "),
      "사진영상느낌": answers["vibe"] || "",
      "퍼스널컬러": (answers["personal_color"] || []).join(", "),
      "립블러셔색감": (answers["color_pref"] || []).join(", "),
      "피부타입": (answers["skin"] || []).join(", "),
      "피부고민": answers["concern"] || "",
      "알레르기": answers["allergy"] === "yes" ? (answers["allergy_detail"] || "있음") : "없음",
      "얼굴포인트": (answers["focus"] || []).join(", "),
      "셀카보정부위": (answers["filter"] || []).join(", "),
      "피하고싶은메이크업": (answers["no_style"] || []).join(", "),
      "선호결과": (answers["result"] || []).join(", "),
      "자유작성": answers["free"] || "",
      "언어": lang,
    };

    fetch("https://api.airtable.com/v0/appWChDaRSjcYInj4/tbl9Kdd3Th32FItyU", {
      method: "POST",
      headers: {
        "Authorization": "Bearer patLNl2jHjLlNP7uz.8ec6aadaeb3fb9b7ce66f6b7bc39e52407e52833c800bc5feb5e2ea6435259de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }).catch(() => {});
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="card">
          <div className="corner-tl" />
          <div className="corner-br" />

          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "ko" ? "active" : ""}`} onClick={() => setLang("ko")}>KR</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
          </div>

          {submitted ? (
            <div className="thank-you">
              <div className="ty-title">{c.thankTitle}</div>
              <div className="ty-sub" style={{ whiteSpace: "pre-line" }}>{c.thankSub}</div>
            </div>
          ) : (
            <>
              <div className="brand-area">
                <div className="brand-en">COMMENANA</div>
                <div className="brand-sub">{c.brandSub}</div>
              </div>

              <div className="reservation-box">
                  <div className="res-item">
                  <div className="res-label">{c.resLabels.name}</div>
                  <div className="res-value" style={{ color: params.name ? "#1a1a1a" : "#c5bfb8" }}>{params.name ? `${params.name} 고객님` : "—"}</div>
                </div>
                <div className="res-item">
                  <div className="res-label">{c.resLabels.date}</div>
                  <div className="res-value" style={{ color: params.date ? "#1a1a1a" : "#c5bfb8" }}>{params.date || "—"}</div>
                </div>
                <div className="res-item">
                  <div className="res-label">{c.resLabels.service}</div>
                  <div className="res-value">{params.service}</div>
                </div>
              </div>

              {c.sections.map((section, si) => (
                <div key={si} className="section">
                  <div className="section-title">
                    <span className="section-num">{section.num}</span>
                    {section.title}
                  </div>

                  {section.questions.map((q) => {
                    if (q.showIf && !(answers[q.showIf.id] || []).includes(q.showIf.value)) return null;
                    return (
                    <div key={q.id} className="question-block">
                      <div className="question-label">{q.label}</div>

                      {q.type === "chips_with_sub" && (
                        <>
                          <div className="chip-group">
                            {q.options.map(opt => (
                              <button
                                key={opt}
                                className={`chip ${(answers[q.id] || []).includes(opt) ? "selected" : ""}`}
                                onClick={() => setChip(q.id, opt)}
                              >{opt}</button>
                            ))}
                          </div>
                          {q.subTriggers && Object.entries(q.subTriggers).map(([trigger, placeholder]) =>
                            (answers[q.id] || []).includes(trigger) && (
                              <input
                                key={trigger}
                                className="text-input"
                                style={{ marginTop: 8 }}
                                placeholder={placeholder}
                                value={answers[q.id + "_sub_" + trigger] || ""}
                                onChange={e => setText(q.id + "_sub_" + trigger, e.target.value)}
                              />
                            )
                          )}
                        </>
                      )}

                      {q.type === "chips_with_other" && (
                        <>
                          <div className="chip-group">
                            {q.options.map(opt => (
                              <button
                                key={opt}
                                className={`chip ${(answers[q.id] || []).includes(opt) ? "selected" : ""}`}
                                onClick={() => setChip(q.id, opt)}
                              >{opt}</button>
                            ))}
                          </div>
                          {(answers[q.id] || []).includes(q.options[q.options.length - 1]) && (
                            <input
                              className="text-input"
                              style={{ marginTop: 8 }}
                              placeholder={lang === "ko" ? "직접 입력해주세요" : lang === "zh" ? "请填写" : "Please specify"}
                              value={answers[q.id + "_other"] || ""}
                              onChange={e => setText(q.id + "_other", e.target.value)}
                            />
                          )}
                        </>
                      )}

                      {q.type === "chips" && (
                        <div className="chip-group">
                          {q.options.map(opt => (
                            <button
                              key={opt}
                              className={`chip ${(answers[q.id] || []).includes(opt) ? "selected" : ""}`}
                              onClick={() => setChip(q.id, opt, q.max)}
                            >{opt}</button>
                          ))}
                        </div>
                      )}

                      {q.type === "text" && (
                        <input
                          className="text-input"
                          placeholder={q.placeholder}
                          value={answers[q.id] || ""}
                          onChange={e => setText(q.id, e.target.value)}
                        />
                      )}

                      {q.type === "textarea" && (
                        <textarea
                          className="textarea-input"
                          placeholder={q.placeholder}
                          value={answers[q.id] || ""}
                          onChange={e => setText(q.id, e.target.value)}
                        />
                      )}

                      {q.type === "upload" && (
                        <>
                          <div className="upload-area">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={e => handleUpload(q.id, e.target.files)}
                            />
                            <div className="upload-icon">✦</div>
                            <div className="upload-text">
                              {lang === "ko" ? "사진을 클릭하거나 끌어서 놓아주세요" : lang === "zh" ? "点击或拖拽上传照片" : "Click or drag to upload photos"}
                            </div>
                          </div>
                          {q.sublabel && <div className="upload-sublabel">{q.sublabel}</div>}
                          {(uploads[q.id] || []).length > 0 && (
                            <div className="upload-previews">
                              {(uploads[q.id] || []).map((f, idx) => (
                                <div key={idx} className="upload-preview">
                                  <img src={f.url} alt={f.name} />
                                  <button className="upload-remove" onClick={() => removeUpload(q.id, idx)}>×</button>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {q.type === "yesno" && (
                        <>
                          <div className="yes-no">
                            <button
                              className={`yn-btn ${answers[q.id] === "yes" ? "selected" : ""}`}
                              onClick={() => setYN(q.id, "yes")}
                            >{q.yesLabel || (lang === "ko" ? "네" : lang === "zh" ? "是" : "Yes")}</button>
                            <button
                              className={`yn-btn ${answers[q.id] === "no" ? "selected" : ""}`}
                              onClick={() => setYN(q.id, "no")}
                            >{q.noLabel || (lang === "ko" ? "아니오" : lang === "zh" ? "否" : "No")}</button>
                          </div>
                          {q.subInput && answers[q.id] === "yes" && (
                            <input
                              className="text-input"
                              style={{ marginTop: 8 }}
                              placeholder={q.subPlaceholder}
                              value={answers[q.id + "_detail"] || ""}
                              onChange={e => setText(q.id + "_detail", e.target.value)}
                            />
                          )}
                        </>
                      )}
                    </div>
                    );
                  })}

                  {si < c.sections.length - 1 && <div className="divider" />}
                </div>
              ))}

              <button className="submit-btn" onClick={handleSubmit}>
                {c.submit}
              </button>

              <div className="footer-note" style={{ whiteSpace: "pre-line" }}>{c.footer}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
