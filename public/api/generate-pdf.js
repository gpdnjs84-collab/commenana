import { Resend } from 'resend';

const resend = new Resend('re_4vKuZCjt_EQ6VaMqk6BAakcKCTeLFH1fG');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const d = req.body;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="text-align:center;letter-spacing:0.2em;">COMMENANA</h2>
      <p style="text-align:center;color:#a89880;font-size:11px;letter-spacing:0.2em;">MAKEUP CONSULTATION</p>
      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      
      <table style="width:100%;font-size:13px;margin-bottom:20px;">
        <tr>
          <td><b>고객명</b></td><td>${d.name || '-'}</td>
          <td><b>예약 일시</b></td><td>${d.date || '-'}</td>
          <td><b>서비스</b></td><td>${d.service || '-'}</td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">

      <h3 style="font-size:13px;color:#a89880;letter-spacing:0.1em;">오늘의 무드</h3>
      ${d.occasion ? `<p><b style="color:#6b6158;font-size:12px;">방문 목적</b><br>${d.occasion}</p>` : ''}
      ${d.mood_word ? `<p><b style="color:#6b6158;font-size:12px;">메이크업 키워드</b><br>${d.mood_word}</p>` : ''}
      ${d.vibe ? `<p><b style="color:#6b6158;font-size:12px;">사진/영상 느낌</b><br>${d.vibe}</p>` : ''}

      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      <h3 style="font-size:13px;color:#a89880;letter-spacing:0.1em;">컬러톤</h3>
      ${d.personal_color ? `<p><b style="color:#6b6158;font-size:12px;">퍼스널컬러</b><br>${d.personal_color}</p>` : ''}
      ${d.color_pref ? `<p><b style="color:#6b6158;font-size:12px;">립/블러셔 색감</b><br>${d.color_pref}</p>` : ''}

      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      <h3 style="font-size:13px;color:#a89880;letter-spacing:0.1em;">피부 & 컨디션</h3>
      ${d.skin ? `<p><b style="color:#6b6158;font-size:12px;">피부 타입</b><br>${d.skin}</p>` : ''}
      ${d.concern ? `<p><b style="color:#6b6158;font-size:12px;">피부 고민 & 안 맞는 성분/제품</b><br>${d.concern}</p>` : ''}
      ${d.allergy ? `<p><b style="color:#6b6158;font-size:12px;">알레르기</b><br>${d.allergy}</p>` : ''}

      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      <h3 style="font-size:13px;color:#a89880;letter-spacing:0.1em;">나만의 취향 & 포인트</h3>
      ${d.focus ? `<p><b style="color:#6b6158;font-size:12px;">얼굴 포인트</b><br>${d.focus}</p>` : ''}
      ${d.filter ? `<p><b style="color:#6b6158;font-size:12px;">셀카 보정 신경 쓰이는 부위</b><br>${d.filter}</p>` : ''}
      ${d.no_style ? `<p><b style="color:#6b6158;font-size:12px;">피하고 싶은 메이크업</b><br>${d.no_style}</p>` : ''}
      ${d.result ? `<p><b style="color:#6b6158;font-size:12px;">메이크업 후 선호 결과</b><br>${d.result}</p>` : ''}

      ${d.free ? `<hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      <h3 style="font-size:13px;color:#a89880;letter-spacing:0.1em;">자유 작성</h3>
      <p>${d.free}</p>` : ''}

      <hr style="border:none;border-top:1px solid #e8e4df;margin:16px 0;">
      <p style="text-align:center;color:#c5bfb8;font-size:11px;letter-spacing:0.1em;">COMMENANA ✦</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gpdnjs84@gmail.com',
      subject: `[COMMENANA] ${d.name || '고객'} 님의 사전 상담지`,
      html,
    });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
