import { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { useParams } from 'react-router-dom';

const EmailForm = () => {
  const {email}=useParams();
  const [emailData, setEmailData] = useState({
    to: email || '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
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
          toast.error('Failed to send email');
    }
  };

  return (
<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
        rows={5}
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
  );
};

export default EmailForm;