import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline/index.js";
import { toast } from "react-toastify";
import emailjs from 'emailjs-com';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        phone: "",
        message: "",
    })


    return (
        <>
            <form id="contact" className={"mb-16 lg:px-4"}
                onSubmit={e => {
                    e.preventDefault()
                    let send = true
                    Object.keys(formData).forEach(i => {
                        if (formData[i].length === 0)
                            send = false
                    })

                    if (send) {
                        emailjs.send("service_w64am7g", "template_6tz0up1", formData);
                        setFormData({
                            from_name: "",
                            reply_to: "",
                            phone: "",
                            message: "",
                        })
                        toast.success("Notification sent, I'll repsond to you soon!")
                    }
                    else
                        toast.error("Please fill out all the boxes")
                }}
            >
                <h4 className={"font-bold text-lg mb-4 text-white"}>CONTACT ME</h4>

                <div className="flex flex-col">
                    <div className="mb-4 w-full">
                        <input type="text" placeholder={"Fullname"} value={formData.from_name}
                            onChange={e => setFormData({ ...formData, "from_name": e.target.value })}
                            className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"} />
                    </div>
                    <div className="mb-4 w-full">
                        <input type="email" placeholder={"Email"} value={formData.reply_to}
                            onChange={e => setFormData({ ...formData, "reply_to": e.target.value })}
                            className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"} />
                    </div>
                    <div className="mb-6 w-full">
                        <input type="phone" placeholder={"Phone Number"} value={formData.phone}
                            onChange={e => setFormData({ ...formData, "phone": e.target.value })}
                            className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"} />
                    </div>
                    <div className="w-full mb-4">
                        <textarea placeholder={"Message"} value={formData.message}
                            onChange={e => setFormData({ ...formData, "message": e.target.value })}
                            className={"bg-transparent border  p-2 px-4 rounded w-full block border-[#e0bfb4] outline-none"} />
                    </div>

                    <button
                        className={"flex flex-row items-center py-2 px-3 border border-[#e0bfb4] w-fit hover:bg-[#174859aa] hover:text-[#6ac9eb] hover:border-[#6ac9eb] duration-300"}>
                        <span>Send</span>
                        <span className={"ml-3"}><PaperAirplaneIcon
                            className={"w-5 aspect-square -rotate-45"} /></span>
                    </button>
                </div>
            </form>
        </>)
}