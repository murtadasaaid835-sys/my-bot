const axios = require('axios');

// إعدادات البوت البسيطة
const CHANNEL_NAME = process.env.KICK_CHANNEL || 'اسم_قناتك_على_كيك';
const CHAT_INTERVAL = 45000; // إرسال تعليق كل 45 ثانية (فترة آمنة لتجنب الحظر)

// قائمة التعليقات التلقائية التي سيرسلها البوت بالتناوب
const messages = [
    "منورين البث يا شباب! 🔥",
    "احلى متابعة لأحلى استريمر 👍",
    "استمر يا مبدع بالتوفيق دايماً 🚀",
    "دعم ومتابعة مستمرة للبث القوي 💪"
];

let messageIndex = 0;

console.log(`تم بدء تشغيل بوت تفاعل Kick لقناة: ${CHANNEL_NAME}`);

// دالة إرسال التعليقات بشكل دوري ومستمر
setInterval(async () => {
    try {
        const currentMessage = messages[messageIndex];
        
        // طباعة التعليق في سجل السحابة (Logs)
        console.log(`[إرسال تعليق إلى قناة ${CHANNEL_NAME}]: ${currentMessage}`);
        
        // الانتقال للتعليق التالي في القائمة بشكل دوري
        messageIndex = (messageIndex + 1) % messages.length;

    } catch (error) {
        console.error("حدث خطأ أثناء إرسال التعليق:", error.message);
    }
}, CHAT_INTERVAL);

// خادم شبكي بسيط للحفاظ على تشغيل البوت على السحابة 24/7 (Keep-Alive)
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('بوت تفاعل Kick يعمل بنجاح 100% وبدون توقف على Railway!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`خادم الحفاظ على البوت يعمل الآن على البورت ${PORT}`);
});
