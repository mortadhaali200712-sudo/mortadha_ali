const express = require('express');
const cors = require('cors');
const { ytdlp } = require('ytdl-exec'); // أو مكتبة تحليل روابط حقيقية
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url;
    try {
        // السيرفر الحقيقي يقوم بسحب بيانات الفيديو أو رابط التحميل المباشر
        // مثال باستخدام مكتبة سحب بيانات
        res.json({ success: true, downloadUrl: videoUrl, title: "فيديو تجريبي" });
    } catch (error) {
        res.status(500).json({ success: false, error: "فشل التحليل" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
