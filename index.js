const axios = require('axios');

// إعدادات البوت والاتصال بقناة Kick
const CHANNEL_SLUG = process.env.KICK_CHANNEL || 'اسم_قناتك'; // اسم قناتك على كيك
const CHAT_INTERVAL = 45000; // إرسال تعليق كل 45 ثانية (فترة آمنة لتجنب الحظر)

// قائمة التعليقات والسمايلات (الصمايلات) التي سيرسلها البوت بالتناوب
// تقدر تعدل هذه القائمة وتضيف أي سمايلات أو عبارات تعجبك
const messages = [
    "🔥 ❤️ 🔥",
    "منور البث يا مبدع 👍",
    "💪 🚀 👑",
    "احلى متابعة واستمرار بالتوفيق ✨"
];

let messageIndex = 0;

console.log(`تم بدء تشغيل بوت تفاعل Kick لقناة: ${CHANNEL_SLUG}`);

// دالة إرسال التعليقات والسمايلات بشكل دوري ومستمر
setInterval(async () => {
    try {
        const currentMessage = messages[messageIndex];
        
        const chatroomId = process.env.KICK_CHATROOM_ID;
        const authToken = process.env.KICK_AUTH_TOKEN;

        if (!chatroomId || !authToken) {
            console.log(`[وضع المحاكاة]: سيتم إرسال ( ${currentMessage} ) إلى شات قناة ${CHANNEL_SLUG}`);
            messageIndex = (messageIndex + 1) % messages.length;
            return;
        }

        // الطلب الفعلي لإرسال الرسالة أو السمايل لشات كيك عبر الـ API
        const response = await axios.post(
            `https://kick.com/api/v2/messages/send`,
            {
                content: currentMessage,
                type: "user"
            },
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'X-Chatroom-Id': chatroomId,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                }
            }
        );

        console.log(`[تم الإرسال بنجاح لشات Kick]: ${currentMessage}`);
        
        // الانتقال للتعليق أو السمايل التالي في القائمة بشكل دوري
        messageIndex = (messageIndex + 1) % messages.length;

    } catch (error) {
        console.error("حدث خطأ أثناء إرسال التعليق لشات كيك:", error.response?.data || error.message);
    }
}, CHAT_INTERVAL);

// خادم شبكي للحفاظ على تشغيل البوت على السحابة 24/7 (Keep-Alive)
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('بوت تفاعل Kick يعمل بنجاح 100% وبدون توقف على Railway!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`خادم الحفاظ على البوت يعمل الآن على البورت ${PORT}`);
});
