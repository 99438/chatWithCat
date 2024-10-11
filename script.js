document.addEventListener("DOMContentLoaded", function() {
    const initialMessages = [
        { sender: "you", text: "阿厌！", type: "sender" },
        { text: "嗯？", type: "receiver" },
        { sender: "you", text: "突然发现一件很重要的事", type: "sender" },
        { sender: "you", text: "明天……", type: "sender" }
    ];

    showMessageSequentially(initialMessages, 0, () => showChoices('initial'));
});

function showMessageSequentially(messages, index, callback) {
    if (index < messages.length) {
        const message = messages[index];
        const delay = message.type === 'conclusion' ? 0 : 1000 * index;
        setTimeout(() => {
            addMessage(message.text, message.type);
            showMessageSequentially(messages, index + 1, callback);
        }, delay);
    } else if (callback && typeof callback === 'function') {
        callback();
    }
}

function addMessage(text, className) {
    if (className === "conclusion") return; // Skip printing conclusion messages
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;

    // Add avatar for receiver
    if (className === "receiver") {
        const avatar = document.createElement('img');
        // 头像图片的路径
        avatar.src = 'cat.png';
        avatar.className = 'avatar';
        messageDiv.appendChild(avatar);
    }

    const messageText = document.createElement('span');
    messageText.innerHTML = text;
    messageDiv.appendChild(messageText);

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    window.setTimeout(() => messageDiv.style.opacity = 1, 10);
}


function showChoices(choiceType) {
    const choicesData = {
        'initial': [
            { text: "是鱼摊收保护费的时间了哦？", responseKey: '1' },
            { text: "明天就要欠阿厌一个吻了", responseKey: '2' }
        ],
        '1': [
            { text: "最近手头比较紧嘛……", responseKey: 'A' },
            { text: "习惯了，就当是体验生活了？", responseKey: 'B' }
        ],
        '2': [
            { text: "等等……!", responseKey: '3' },
            { text: "那就恭候统领大驾咯？", responseKey: 'C' },
        ],
        '3': [
            { text: "我最近手头还挺宽裕的……", responseKey: 'D' },
            { text: "现在不在家……！！", responseKey: 'E' },
        ]
    };

    const currentChoices = choicesData[choiceType];
    const chatContainer = document.getElementById('chat-container');
    chatContainer.querySelectorAll('.choice').forEach(el => el.remove());

    setTimeout(() => {
        currentChoices.forEach(choice => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'message choice';
            choiceDiv.textContent = choice.text;
            choiceDiv.onclick = () => {
                chatContainer.querySelectorAll('.choice').forEach(el => el.remove());
                addMessage(choice.text, "sender");
                handleChoice(choice.responseKey);
            };
            chatContainer.appendChild(choiceDiv);
            window.setTimeout(() => choiceDiv.style.opacity = 1, 10);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}

function getRandomDelay() {
    return Math.floor(Math.random() * 9000) + 1000;
}

function handleChoice(responseKey) {
    const responses = {
        '1': [
            { text: "？", type: "receiver" },
            { text: "我没记错的话，我们的南州督军大人明天好不容易休沐吧？", type: "receiver" },
            { text: "还要去卖鱼？", type: "receiver" },
        ],
        '2': [
            { text: "欠？", type: "receiver" },
            { text: "嗯，那确实是件大事。瞻京卫向来不会对欠债不还这种恶事置之不理。", type: "receiver" },
            { text: "事不宜迟，统领现在亲自过去查办。我们的南州督军大人此刻在家吧？", type: "receiver" }
        ],
        '3': [
            { text: "怎么，大人有什么难处吗？", type: "receiver" },
        ],
        'A': [
            { text: "缺钱怎么不和我说？", type: "receiver" },
            { text: "你的鱼有多少？全都给我，我全买了。", type: "receiver" },
            { text: "上次买的十条吃完了？", type: "sender" },
            { text: "嗯。", type: "receiver" },
            { text: "真的？", type: "sender" },
            { text: "真的。", type: "receiver" },
            { text: "^^好小猫，乖狸儿", type: "sender" },
            { text: "…不许问了。你在家吧？我现在就去找你拿。", type: "receiver" },
            { text: "end：黑毛白猫能吃鱼的猫就是好猫", type: "conclusion" }
        ],
        'B': [
            { text: "鱼都卖给我，明天带你去体验其他生活。", type: "receiver" },
            { text: "昨日巡逻的时候看到河道两岸的花开得正盛，就是不知大人愿不愿意赏脸？", type: "receiver" },
            { text: "要是本官说没空陪厌统领呢？", type: "sender" },
            { text: "我陪你也行，去哪你定。", type: "receiver" },
            { text: "这么霸道？", type: "sender" },
            { text: "嗯，就这么霸道。", type: "receiver" },
            { text: "end：下班了粗去丸嘛", type: "conclusion" }
        ],
        'C': [
            { text: "嗯", type: "receiver" },
            { text: "债主来了，大人不开门吗？", type: "receiver" },
            { text: "end：欠债还钱 欠吻还吻", type: "conclusion" }
        ],
        'D': [
            { text: "现在知道交钱了？", type: "receiver" },
            { text: "迟了。", type: "receiver" },
            { text: "你们瞻京卫这么不讲理？", type: "sender" },
            { text: "嗯。就是这么不讲理。", type: "receiver" },
            { text: "在家等我，马上到。", type: "receiver" },
            { text: "end：贿赂公职人员是不对的", type: "conclusion" }
        ],
        'E': [
            { text: "不在家？", type: "receiver" },
            { text: "哦…在江边啊", type: "receiver" },
            { text: "钓鱼？还是", type: "receiver" },
            { text: "数鹅呢？", type: "receiver" },
            { text: "行。一会就有东西帮你打窝了。", type: "receiver" },
            { text: "等我^^", type: "receiver" },
            { text: "？？？阿厌？", type: "sender" },
            { text: "等一下？", type: "sender" },
            { text: "阿厌！！", type: "sender" },
            { text: "end：鹅鹅鹅?", type: "conclusion" }
        ]
    };

    const nextResponses = responses[responseKey];
    const delay = getRandomDelay();
    setTimeout(() => {
        showMessageSequentially(nextResponses, 0, () => {
            if (responseKey === '1') {
                showChoices('1');
            } else if (responseKey === '2') {
                showChoices('2');
            } else if (responseKey === '3') {
                showChoices('3');
            } else {
                const conclusion = nextResponses.find(response => response.type === 'conclusion');
                if (conclusion) {
                    showConclusion(conclusion.text);
                }
            }
        });
    }, delay);
}

function showConclusion(conclusionText) {
    const chatContainer = document.getElementById('chat-container');
    const conclusionDiv = document.createElement('div');
    conclusionDiv.className = 'conclusion';
    conclusionDiv.innerHTML = conclusionText;
    chatContainer.appendChild(conclusionDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    conclusionDiv.style.opacity = 1; 
}
