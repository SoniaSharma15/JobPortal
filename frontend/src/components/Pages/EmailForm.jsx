import { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NOTIFICATION_API_END_POINT } from '@/utils/constant';
import { Copy } from "lucide-react";
import { useSelector } from 'react-redux';
const EmailForm = () => {
  const {singleJob}=useSelector(store=>store.job)
  console.log(singleJob)
  const {email}=useParams();
  const navigate=useNavigate();
  const [emailData, setEmailData] = useState({
    to: email || '',
    subject: '',
    message: ''
  });
  const [loading,setLoading]=useState(false)
  const [emailAbout,setEmailAbout]=useState('')
  const [emailDrafed,setemailDrafed]=useState('')
  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };
const handleCopy = async (text) => {
  if (!text) {
    toast.error("Nothing to copy");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard ✅");
  } catch (err) {
    toast.error("Failed to copy ❌");
  }
};

  const handleSend = async () => {
    try {
      const res = await axios.post(`${NOTIFICATION_API_END_POINT}/send-email`, emailData,{
        headers: {
    'Content-Type': 'application/json'
  }
      });
          toast.success(res.data.message);
      setEmailData({ to: '', subject: '', message: '' });
        } catch (err) {
      console.error('Error sending email:', err);
          toast.error('Failed to send email');
    }
  };
const handleGenerateEmail=async()=>{
  setLoading(true)
  console.log("Generating email about:", emailAbout);
  try {
     const InputPrompt =
      `Draft an email using this detail ${emailAbout}.Email must be professional and according to Indian standard email format.THis email was drafted by a Rectruiter to the applicant.The details about the job are as follows:${singleJob.description,singleJob.requirment,singleJob.location}Output Format must be like this only:` +
      "```json {'draft': ''}";
    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY
    ); 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(InputPrompt);
    const MockJsonResp =
      result.response.text().replace("```json", "").replace("```", "") || "{}";

    console.log("Generative AI Result:", MockJsonResp);
    setemailDrafed(JSON.parse(MockJsonResp)?.draft || "");
  }catch (error) {
    console.log(error)
  }
finally{
  setLoading(false)
}}
  return (
    <div className='flex flex-col md:flex-row gap-3 mx-1 md:mx-5 '>
        
        <div className='md:w-1/2 flex-col'>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold "
            onClick={() => {
              navigate("/admin/jobs");
            }}
          >
            <ArrowLeft /> <span>Back</span>
          </Button>
          <div className='p-2 md:px-10'>
         <div>
      <label htmlFor="About" className="block text-sm font-medium text-gray-700 mb-1">
        Email About
      </label>
      <textarea
        id="About"
        name="emailAbout"
        value={emailAbout}
        onChange={(e)=>setEmailAbout(e.target.value)}
        rows={5}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Draft your Email About..."
      />
    </div>
    <Button onClick={handleGenerateEmail} className="my-1" disabled={loading}>{
      loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Generate Using AI
        </Button>
          </div>
              <div className=' relative p-2 md:px-10'>
      <label htmlFor="generated" className="block text-sm font-medium text-gray-700 mb-1">
        Drafted Email
      </label>
      {/* Copy Button */}
  <button
    type="button"
    onClick={() => handleCopy(emailDrafed)}
    className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 transition"
  >
    <Copy className="w-5 h-5 text-gray-600" />
  </button>
      <textarea
        id="generated"
        name="emailDrafed"
        value={emailDrafed}
        rows={10}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Draft your Email About..."
      />
    </div>
          </div>
<div className="md:w-1/2 mt-10 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📧 Send an Email</h2>

  <form className="space-y-4">
    <div>
      <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
        Recipient Email
      </label>
      <input
        type="email"
        id="to"
        name="to"
        value={emailData.to}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g. someone@example.com"
      />
    </div>

    <div>
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
        Subject
      </label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={emailData.subject}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g. Job Application Update"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        value={emailData.message}
        onChange={handleChange}
        rows={8}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your message here..."
      />
    </div>

    <button
      type="button"
      onClick={handleSend}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Send Email
    </button>
  </form>
</div>
</div>
  );
};

export default EmailForm;