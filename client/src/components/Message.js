"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { MessageCircle, Send, ImageIcon, Smile, X, ChevronLeft, Circle } from "lucide-react"

const Message = ({ userId, onClose }) => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [images, setImages] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [loading, setLoading] = useState(true)

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    fetchConversations()
    const interval = setInterval(fetchConversations, 10000)
    return () => clearInterval(interval)
  }, [userId])

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  const fetchConversations = async () => {
    if (!userId) return

    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:8080/api/messages/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const processed = response.data.reduce((acc, msg) => {
        const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id
        const existing = acc.find((c) => c.otherUserId === otherUserId && c.productId === msg.product_id)

        if (existing) {
          if (!msg.is_read && msg.receiver_id === userId) {
            existing.unreadCount++
          }
          if (new Date(msg.created_at) > new Date(existing.lastMessageTime)) {
            existing.lastMessage = msg.content
            existing.lastMessageTime = msg.created_at
            existing.lastMessageType = msg.message_type
          }
        } else {
          acc.push({
            otherUserId,
            otherUsername: msg.sender_id === userId ? msg.receiver_username : msg.sender_username,
            productId: msg.product_id,
            productName: msg.product_name,
            lastMessage: msg.content,
            lastMessageType: msg.message_type,
            lastMessageTime: msg.created_at,
            unreadCount: !msg.is_read && msg.receiver_id === userId ? 1 : 0,
          })
        }
        return acc
      }, [])

      setConversations(processed)
      setUnreadCount(processed.reduce((sum, conv) => sum + conv.unreadCount, 0))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching conversations:", error)
      setLoading(false)
    }
  }

  const fetchMessages = async (otherUserId, productId = null) => {
    try {
      const token = localStorage.getItem("token")
      const url = productId
        ? `http://localhost:8080/api/messages/conversation/${otherUserId}?productId=${productId}`
        : `http://localhost:8080/api/messages/conversation/${otherUserId}`

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSelectedConversation({
        otherUserId,
        otherUsername:
          response.data[0]?.sender_id === userId
            ? response.data[0]?.receiver_username
            : response.data[0]?.sender_username,
        productId,
        productName: response.data[0]?.product_name,
        messages: response.data,
      })

      await axios.put(
        `http://localhost:8080/api/messages/mark-read`,
        {
          senderId: otherUserId,
          productId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      fetchConversations()
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const sendMessage = async () => {
    if ((!newMessage.trim() && !imagePreview) || !selectedConversation) return

    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("receiverId", selectedConversation.otherUserId)
      formData.append("content", newMessage)
      if (selectedConversation.productId) {
        formData.append("productId", selectedConversation.productId)
      }

      if (imagePreview) {
        formData.append("image", imagePreview)
      }

      await axios.post("http://localhost:8080/api/messages/send", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      setNewMessage("")
      setImagePreview(null)
      fetchMessages(selectedConversation.otherUserId, selectedConversation.productId)
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(e.target.files[0])
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()

    if (date.toDateString() === now.toDateString()) {
      return "Today"
    }

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }

    return date.toLocaleDateString()
  }

  const renderLastMessage = (conv) => {
    if (conv.lastMessageType === "image") {
      return "📷 Image"
    }
    return conv.lastMessage?.length > 30 ? `${conv.lastMessage.substring(0, 30)}...` : conv.lastMessage || ""
  }

  const renderMessageContent = (msg) => {
    if (msg.message_type === "image" && msg.image_path) {
      return (
        <img
          src={`http://localhost:8080/${msg.image_path}`}
          alt="Sent content"
          className="max-w-full max-h-[200px] rounded-lg object-contain"
        />
      )
    }
    return msg.content
  }

  // Simple emoji picker
  const emojis = ["😊", "👍", "❤️", "🎉", "🔥", "👋", "😂", "🙏", "👏", "🤔"]

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <MessageCircle className="mr-2" size={20} />
          Messages
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{unreadCount}</span>
          )}
        </h2>
        {onClose && (
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div
          className={`w-1/3 border-r border-white/10 overflow-y-auto ${selectedConversation ? "hidden md:block" : ""}`}
        >
          {loading ? (
            <div className="flex flex-col space-y-4 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-white/10"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : conversations.length > 0 ? (
            <div className="divide-y divide-white/5">
              {conversations.map((conv, index) => (
                <div
                  key={index}
                  className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${
                    selectedConversation?.otherUserId === conv.otherUserId &&
                    selectedConversation?.productId === conv.productId
                      ? "bg-white/10"
                      : ""
                  }`}
                  onClick={() => fetchMessages(conv.otherUserId, conv.productId)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-white flex items-center">
                      {conv.otherUsername}
                      {conv.unreadCount > 0 && <Circle className="ml-2 text-red-500 fill-red-500" size={8} />}
                    </h3>
                    <span className="text-xs text-white/60">{formatDate(conv.lastMessageTime)}</span>
                  </div>

                  {conv.productName && <div className="text-xs text-white/60 mb-1">About: {conv.productName}</div>}

                  <div className="text-sm text-white/80 truncate">{renderLastMessage(conv)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-white/60">
              <MessageCircle size={40} className="mb-2 opacity-50" />
              <p>No conversations yet</p>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-white/10 flex items-center">
                <button
                  className="md:hidden mr-2 text-white/70 hover:text-white"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="font-medium text-white">{selectedConversation.otherUsername}</h3>
                  {selectedConversation.productName && (
                    <p className="text-xs text-white/60">About: {selectedConversation.productName}</p>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        msg.sender_id === userId
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white/10 text-white rounded-bl-none"
                      }`}
                    >
                      <div className="break-words">{renderMessageContent(msg)}</div>
                      <div
                        className={`text-xs mt-1 ${msg.sender_id === userId ? "text-blue-100/70" : "text-white/50"}`}
                      >
                        {formatTime(msg.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-white/10">
                {imagePreview && (
                  <div className="relative inline-block mb-2">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                      <img
                        src={URL.createObjectURL(imagePreview) || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Smile size={20} />
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <ImageIcon size={20} />
                  </button>

                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />

                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>

                {showEmojiPicker && (
                  <div className="mt-2 p-2 bg-white/10 rounded-lg flex flex-wrap gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-xl hover:bg-white/10 p-1 rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/60">
              <MessageCircle size={48} className="mb-3 opacity-50" />
              <p className="text-lg">Select a conversation</p>
              <p className="text-sm mt-2">Choose a conversation from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message

