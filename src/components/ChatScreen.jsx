import Message from "./Message"
import { useState, useEffect } from "react"
import AllChatsDrawer from "./AllChatsDrawer"
import send from "../send.png"
import Aos from "aos";
import Web3 from "web3";
import { healthABI } from "../components/abi.js";
const web3js = new Web3(window.ethereum);
var myContractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";
var myContract = new web3js.eth.Contract(healthABI, myContractAddress);

export default function ChatScreen() {
    const [array, setArray] = useState([
       
    ])

    useEffect(() => {
        Aos.init({duration: 800});
    }, []);
  
    const messages = () => {
        return array.map((item) => {
            return <Message message={item.message} color={item.color} by={item.by} />
        }) 
    }

    const [message, setMessage] = useState('')

    function handleMessageChange(e) {
        setMessage(e.target.value)
    }

    function sendMessage(e) {
      e.preventDefault();
      if (message === "") return;
      let newArray = [...array];
      newArray.push({
        message: message,
        color: "bg-blue-600",
        by: "justify-start",
      });
      setArray(newArray);
      console.log(myContract.methods);
      console.log(message);
      myContract.methods
        .sendMessage("0xfC986a6A04D2Bd4bF87123e5d1F3bc91B84e5515", message)
        .send({
          from: "0x5C3E220E257496212cAf4fC6CCfe394b5Ca92d8a",
        });
      setMessage("");
    }
    useEffect(() => {
        let screen = document.getElementById('screen')
        screen.scrollTop = screen.scrollHeight
        let chat = document.getElementById('chat')
        chat.focus()
    }, [array])

    return (
        <div className="items-center py-32 font-sans cursor-none">
            <h1 className="text-white text-4xl lg:text-6xl font-extrabold text-center mb-8"
            >Chat with your Doctor!</h1>
            <div className="flex justify-center items-center">
                <AllChatsDrawer />
                <div className="w-3/4 mt-10">
                    <div className="flex justify-center items-center">
                        <div className="w-full lg:w-1/2 h-1/2 bg-gray-300 rounded-sm shadow-lg pt-8">
                            <div className="flex justify-start flex-col h-96 overflow-y-scroll" id="screen">
                                {messages()}
                            </div>
                            <div className="flex justify-between items-center">
                            <input id="chat" onChange={handleMessageChange} value={message} type="text" placeholder="Enter your message" className="w-4/5 h-14 rounded-sm focus:border-2 border-blue-600 focus:outline-none px-5" />
                            <button onClick={sendMessage} className="w-14 h-14 pl-2 mr-8 hover:bg-transparent border-blue-600 border-2 bg-blue-600 rounded-full focus:outline-none items-center">
                                <img src={send} alt
                                ="send" className="w-8 h-8" />
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}