import React, { useEffect} from 'react'

const Chatbot = ({isVerified}) => {
    console.log(isVerified)
    const initFunction = () => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
                "composerPlaceholder": "Chat with Leo",
                "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
                "botId": "92ec9e59-a0c4-4e8f-8326-615471642044",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "92ec9e59-a0c4-4e8f-8326-615471642044",
                "lazySocket": true,
                "botName": "Leo",
                "hideWidget": false,
                "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/0d44c2c6-9e20-4034-a6ba-68c78534faf8/v42851/style.css",
                "frontendVersion": "v1",
                "useSessionStorage": false,
                "enableConversationDeletion": true 
            });
            window.botpressWebChat.onEvent((event) => {
                if (event.type === 'LIFECYCLE.LOADED') {
                    window.botpressWebChat.sendEvent(window.botpressWebChat.sendEvent({ type: 'show' }))
                }
            },['LIFECYCLE.LOADED'])
        }
        
    }
    useEffect(() => {
        initFunction()
        //eslint-disable-next-line
    }, [])

    return <div id="webchat" >
        
    </div>
}

export default Chatbot