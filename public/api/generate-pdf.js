const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  // PDF 생성
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const chunks = [];
  
  await new Promise((resolve) => {
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', resolve);

    doc.fontSize(20).font('Helvetica-Bold').text('COMMENANA', { align: 'center' });
    doc.fontSize(9).font('Helvetica').fillColor('#a89880').text('MAKEUP CONSULTATION', { align: 'center' });
    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor('#e8e4df').stroke();
    doc.moveDown(0.5);

    doc.fillColor('#1a1a1a').fontSize(10).font('Helvetica-Bold');
    doc.text(`고객명: ${data.name || '-'}   예약 일시: ${data.date || '-'}   서비스: ${data.service || '-'}`);
    doc.moveDown(0.5);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor('#e8e4df').stroke();
    doc.moveDown(0.8);

    const section = (title) => {
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a1a').text(title);
      doc.moveDown(0.3);
    };

    const field = (label, value) => {
      if (!value) return;
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#6b6158').text(label);
      doc.fontSize(9).font('Helvetica').fillColor('#1a1a1a').text(value);
      doc.moveDown(0.4);
    };

    section('오늘의 무드');
    field('방문 목적', data.occasion);
    field('메이크업 키워드', data.mood_word);
    field('사진/영상 느낌', data.vibe);
    doc.moveDown(0.3);

    section('컬러톤');
    field('퍼스널컬러', data.personal_color);
    field('립/블러셔 색감', data.color_pref);
    doc.moveDown(0.3);

    section('피부 & 컨디션');
    field('피부 타입', data.skin);
    field('피부 고민 & 안 맞는 성분/제품', data.concern);
    field('알레르기', data.allergy);
    doc.moveDown(0.3);

    section('나만의 취향 & 포인트');
    field('얼굴 포인트', data.focus);
    field('셀카 보정 신경 쓰이는 부위', data.filter);
    field('피하고 싶은 메이크업', data.no_style);
    field('메이크업 후 선호 결과', data.result);
    doc.moveDown(0.3);

    if (data.free) {
      section('자유 작성');
      doc.fontSize(9).font('Helvetica').fillColor('#1a1a1a').text(data.free);
    }

    doc.end();
  });

  const pdfBuffer = Buffer.concat(chunks);

  // 이메일 발송
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gpdnjs84@gmail.com',
      pass: 'ppip pief wloe dfju',
    },
  });

  await transporter.sendMail({
    from: 'gpdnjs84@gmail.com',
    to: 'gpdnjs84@gmail.com',
    subject: `[COMMENANA] ${data.name || '고객'} 님의 사전 상담지`,
    text: `${data.name || '고객'} 님이 상담지를 제출하셨습니다.\n예약 일시: ${data.date || '-'}`,
    attachments: [
      {
        filename: `commenana-${data.name || 'consultation'}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  res.status(200).json({ success: true });
}
