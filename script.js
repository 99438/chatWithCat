document.addEventListener("DOMContentLoaded", function() {
    const initialMessages = [
        { sender: "you", text: "阿厌！啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊", type: "sender" },
        { text: "嗯？", type: "receiver" }
    ];

    showMessageSequentially(initialMessages, 0, () => showChoices('initial'));
});

function showMessageSequentially(messages, index, callback) {
    if (index < messages.length) {
        const message = messages[index];
        setTimeout(() => {
            addMessage(message.text, message.type);
            showMessageSequentially(messages, index + 1, callback);
        }, 1000 * index);
    } else if (callback) {
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
        avatar.src = 'cat.jpg';
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
            { text: "承泽，关于我们之间，我总感觉有些隔阂。你能告诉我，你心里在想什么吗？", responseKey: 'first' },
            { text: "我注意到你最近和长公主走得很近，这让我很不安。我们能谈谈吗？", responseKey: 'second' }
        ],
        'first': [
            { text: "承泽，我愿意倾听你的所有烦恼。或许，我们可以一起找到解决的办法。", responseKey: 'A' },
            { text: "如果你现在不想说，也没关系。但请记得，无论何时，我都在这里等你。", responseKey: 'B' }
        ],
        'second': [
            { text: "承泽，我相信你的判断。但请记得，你的安全比我更重要。如果你需要，我可以帮你。", responseKey: 'C' },
            { text: "我无法忍受你与她的任何接触。如果你真的在乎我，就请远离她。", responseKey: 'D' }
        ]
    };

    const currentChoices = choicesData[choiceType];
    const chatContainer = document.getElementById('chat-container');
    chatContainer.querySelectorAll('.choice').forEach(el => el.remove()); // Remove all previous choices

    setTimeout(() => {
        currentChoices.forEach(choice => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'message choice';
            choiceDiv.textContent = choice.text;
            choiceDiv.onclick = () => {
                chatContainer.querySelectorAll('.choice').forEach(el => el.remove()); // Remove other choices
                addMessage(choice.text, "sender"); // Add chosen option as a message
                handleChoice(choice.responseKey);
            };
            chatContainer.appendChild(choiceDiv);
            window.setTimeout(() => choiceDiv.style.opacity = 1, 10);
        });

        // Scroll to bottom after showing choices
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000); // Show choices after 1 second
}

function getRandomDelay() {
    return Math.floor(Math.random() * 9000) + 2000; // Random delay between 2 to 10 seconds
}

function handleChoice(responseKey) {
    const responses = {
        'first': [
            { text: "范闲，你敏锐如常。确实，我心里有很多事情在盘旋。但请相信，我对你的感情从未改变。", type: "receiver" }
        ],
        'second': [
            { text: "范闲，你误会了。我和长公主之间只是利益交换，没有其他。但你的担忧，我会放在心上。", type: "receiver" }
        ],
        'A': [
            { text: "谢谢你，范闲。你的理解和支持对我来说意义重大。我会慢慢向你敞开心扉的。", type: "receiver" },
            { text: "分支结局一：两人开始更加深入地交流彼此的心声和烦恼，逐渐消除了隔阂，感情更加深厚。", type: "conclusion" }
        ],
        'B': [
            { text: "范闲，你的包容让我感动。请给我一些时间，我会处理好自己的事情，然后找你详谈。", type: "receiver" },
            { text: "分支结局二：李承泽在独处中反思了自己的情感和责任，最终决定向范闲坦白一切，两人共同面对未来的挑战。", type: "conclusion" }
        ],
        'C': [
            { text: "范闲，你的关心让我很温暖。但请放心，我有自己的打算和安排。你的支持，是我最坚实的后盾。", type: "receiver" },
            { text: "分支结局三：范闲选择相信并支持李承泽，两人共同制定计划，确保李承泽的安全并推进复仇计划。他们的关系在共同奋斗中更加牢固。", type: "conclusion" }
        ],
        'D': [
            { text: "范闲，你的占有欲让我感到压力。我不能为了迎合你而放弃自己的原则和计划。", type: "receiver" },
            { text: "分支结局四：范闲的强势要求让李承泽感到困扰和不满，两人的关系因此出现裂痕。他们开始重新审视彼此的价值观和期望，面临分手的危机。", type: "conclusion" }
        ]
    };

    const nextResponses = responses[responseKey];
    const delay = getRandomDelay();
    setTimeout(() => {
        showMessageSequentially(nextResponses, 0, () => {
            if (responseKey === 'first') {
                showChoices('first');
            } else if (responseKey === 'second') {
                showChoices('second');
            } else {
                const conclusion = nextResponses.find(response => response.type === 'conclusion');
                if (conclusion) {
                    showConclusion(conclusion.text);
                }
            }
        });
    }, delay); // Add random delay before showing response
}

function showConclusion(conclusionText) {
    const chatContainer = document.getElementById('chat-container');
    const conclusionDiv = document.createElement('div');
    conclusionDiv.className = 'conclusion';
    conclusionDiv.innerHTML = conclusionText;
    chatContainer.appendChild(conclusionDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    window.setTimeout(() => conclusionDiv.style.opacity = 1, 10);
}
