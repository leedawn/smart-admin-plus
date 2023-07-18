import { toDataURL } from 'qrcode';

export function Qrcode() {
  async function generateQrcode() {
    try {
      const url = await toDataURL(
        'https://activity.feishu.cn/landing/free_trial?tracking_code=7010o0000024cQ8AAI&utm_from=360sem_keyword_pc_office_pinpai_pinpai_feishu&source=360&device=pc&e_keywordid=36828965252',
        { errorCorrectionLevel: 'H' }
      );
      console.log('🚀 ~ file: index.tsx:7 ~ generateQrcode ~ url:', url);
    } catch (err) {
      console.log(err);
    }
  }
  generateQrcode();
  return <div>qrcode</div>;
}