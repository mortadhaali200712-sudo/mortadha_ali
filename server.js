const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url;
    
    if (!videoUrl) {
        return res.status(400).json({ success: false, error: "الرابط مطلوب" });
    }

    try {
        // استخدام محاولة جلب البيانات بالطريقة الرسمية والمستقرة للروابط المدعومة
        const response = await fetch('https://co.wukko.me/api/json', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            body: JSON.stringify({ url: videoUrl, vQuality: '720' })
        });

        const data = await response.json();

        if (!data || data.status === 'error' || (!data.url && !data.picker)) {
            return res.status(400).json({ success: false, error: "عذراً، هذا الرابط غير مدعوم أو محمي من التحميل المباشر." });
        }

        const directLink = data.url || (data.picker ? data.picker[0].url : '');

        res.json({ 
            success: true, 
            title: data.filename || 'فيديو أونلاين',
            thumbnail: data.thumbnail || '',
            downloadUrl: directLink 
        });

    } catch (error) {
        res.status(500).json({ success: false, error: "فشل الاتصال بخدمة التحليل، حاول مرة أخرى." });
    }
});

app.listen(PORT, () => {
    console.log(`السيرفر يعمل بكامل قوته على: http://localhost:${PORT}`);
});
