const chatInput =  document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

// Agr code nhi chl rha ho to ho scta h ki api key expire ho gai h
// New api key k lie tumhe new phone no chaiye jispe chatGPT ki id na bni ho

const API_KEY = "write Api key here"; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
        console.log(data);
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking....", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
    generateResponse();
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

















// const chatInput = document.querySelector(".chat-input span");
// const sendChatBtn = document.querySelector(".chat-input span");
// const chatbox = document.querySelector(".chatbox");
// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const chatbotClosebtn = document.querySelector(".close-btn");


// let userMessage;
// const API_KEY = "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";
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     //Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", chatName);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi;
// }
// const generateRespomse = (incomingChatLi) => {
//     const API_URL = "https://api.openai.com/v1/chat/completions"
//     const messageElement = incomingChatLi.querySelector("p");

//     // Define the properties and message for the API request
//     const requestOptions = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${API_KEY}`
//     },
//     body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: userMessage}]
//     })

// }

// // Send POST request to API, get response
// fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//     messageElement.textContent = data.choices[0].message.content;
// }).catch((error) => {
//     messageElement.classList.add("error");
//     messageElement.textContent = "Oops! Something went wrong. Please try again.";
// }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }

// const handleChat = () => {
//     userMessage = ChatInput.value.trim();
//     if (!userMessage) return ;
//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;


//     //Append the user's message to the Chatbox
//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     setTimeout(() => {
//         //Display "Thinking..." message while waiting for the response
//         const incomingChatLi = createChatLi("Thinking...", "incoming")
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);
//         generateRespomse(incomingChatLi);
//     }, 600);
// }

// chatInput.addEventListener("input", () => {
//     // Adjust the height of the input textarea based on its content
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed without Shift key and the window
//     // width is greater than 800px, handle the chat
//     if(e.Key === "Enter" && !e.shiftKey && window.innerWidth > 800){
//         e.preventDefault();
//         handleChat();
//     }
// });
    


// sendChatBtn.addEventListener("click", handleChat);
// chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
