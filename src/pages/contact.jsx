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
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let isValid = true

        Object.keys(formData).forEach(i => {
            if (formData[i].trim().length === 0)
                isValid = false
        })

        if (!isValid) {
            toast.error("Please fill out all fields", {
                position: "bottom-right",
                autoClose: 3000,
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate email sending - replace with your emailjs configuration
            await new Promise(resolve => setTimeout(resolve, 1000))

            setFormData({
                from_name: "",
                reply_to: "",
                phone: "",
                message: "",
            })

            toast.success("Message sent successfully! I'll respond soon.", {
                position: "bottom-right",
                autoClose: 5000,
            })
        } catch (error) {
            toast.error("Failed to send message. Please try again.", {
                position: "bottom-right",
                autoClose: 3000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form id="contact"
                  className={"mb-16 lg:px-4"}
                  onSubmit={handleSubmit}>
                <h4 className={"font-bold text-lg mb-2 text-white uppercase tracking-wide"}
                    data-aos="fade-up">
                    Get In Touch
                </h4>
                <p className="text-[#8892B0] mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                </p>

                <div className="flex flex-col" data-aos="fade-up" data-aos-delay="200">
                    <div className="mb-4 w-full">
                        <label htmlFor="fullname" className="block text-sm text-[#8892B0] mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            placeholder="John Doe"
                            value={formData.from_name}
                            onChange={e => setFormData({ ...formData, "from_name": e.target.value })}
                            className="glass-input w-full"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="block text-sm text-[#8892B0] mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.reply_to}
                            onChange={e => setFormData({ ...formData, "reply_to": e.target.value })}
                            className="glass-input w-full"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="phone" className="block text-sm text-[#8892B0] mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, "phone": e.target.value })}
                            className="glass-input w-full"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="w-full mb-6">
                        <label htmlFor="message" className="block text-sm text-[#8892B0] mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            placeholder="Tell me about your project or idea..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, "message": e.target.value })}
                            className="glass-input w-full min-h-[120px] resize-y"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="glass-button flex items-center justify-center py-3 px-6 rounded-lg w-fit font-medium text-[#64FFDA] disabled:opacity-50 disabled:cursor-not-allowed group">
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <PaperAirplaneIcon
                            className={`w-5 h-5 ml-3 -rotate-45 transition-transform duration-300 ${
                                isSubmitting ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1"
                            }`}
                        />
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-[#8892B0]/20" data-aos="fade-up" data-aos-delay="300">
                    <p className="text-[#8892B0] text-sm mb-4">
                        You can also reach me at:
                    </p>
                    <div className="flex flex-col space-y-2 text-sm">
                        <a href="mailto:akibeulah@gmail.com"
                           className="text-[#64FFDA] hover:underline flex items-center group">
                            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                                 fill="currentColor"
                                 viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            akibeulah@gmail.com
                        </a>
                        <a href="https://linkedin.com/in/beulah-akindele-8093b9193"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-[#64FFDA] hover:underline flex items-center group">
                            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                                 fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn Profile
                        </a>
                    </div>
                </div>
            </form>
        </>
    )
}