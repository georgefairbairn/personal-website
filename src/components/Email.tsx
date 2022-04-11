import { useState } from "preact/hooks";
import SvgIcon from "./SvgIcon";

const Email = () => {
  const [from, setFrom] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSent, setSent] = useState<boolean>(false);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "from":
        setFrom(value);
        break;

      case "subject":
        setSubject(value);
        break;

      case "message":
        setMessage(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({ from, subject, message }),
      });

      if (result.ok) {
        setSent(true);
      }
    } catch (error) {
      console.error("There was an issue sending the message");
    }
  };

  return (
    <form
      className="flex flex-col bg-white dark:bg-slate-600 rounded w-6/12 p-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center w-full dark:text-slate-200 mb-4">
        <div className="flex items-center justify-start w-full">
          <label htmlFor="to" className="mr-3">
            To:
          </label>
          <input
            id="to"
            name="to"
            className="w-32 font-bold bg-white dark:bg-slate-600"
            value="George Fairbairn"
            type="text"
            disabled
          />
          <img
            className="h-8 w-8 rounded-full ml-3"
            src={`${
              import.meta.env.PUBLIC_CLOUDINARY_URL
            }/profilpicsquare_qphjkn`}
            alt="profile picture"
          />
        </div>
        <hr className="h-px border-none w-full bg-slate-300 dark:bg-slate-400 mt-2" />
      </div>

      <div className="flex flex-col items-center w-full dark:text-slate-200 mb-4">
        <div className="flex items-start w-full peer">
          <label htmlFor="from" className="mr-3">
            From:
          </label>
          <input
            id="from"
            name="from"
            className="w-full font-bold outline-none placeholder:font-normal dark:bg-slate-600 disabled:bg-white"
            type="text"
            placeholder="Your name or email"
            value={from}
            onChange={handleChange}
            disabled={isSent}
            required
          />
        </div>
        <hr className="h-px border-none w-full bg-slate-300 dark:bg-slate-400 mt-2 peer-focus-within:bg-violet-500 peer-focus-within:h-0.75" />
      </div>

      <div className="flex flex-col items-center w-full dark:text-slate-200 mb-4">
        <div className="flex items-start w-full peer">
          <label htmlFor="subject" className="mr-3">
            Subject:
          </label>
          <input
            id="subject"
            name="subject"
            className="w-full font-bold outline-none placeholder:font-normal dark:bg-slate-600 disabled:bg-white"
            type="text"
            placeholder="The reason for your message"
            value={subject}
            onChange={handleChange}
            disabled={isSent}
            required
          />
        </div>
        <hr className="h-px border-none w-full bg-slate-300 dark:bg-slate-400 mt-2 peer-focus-within:bg-violet-500 peer-focus-within:h-0.75" />
      </div>

      <div className="flex items-center w-full dark:text-slate-200 mb-4">
        <textarea
          id="message"
          name="message"
          className="bg-white outline-none border-white dark:border-slate-600 border-b focus-within:border-b-0.75 focus-visible:border-b-0.75 focus-within:border-violet-500 focus-visible:border-violet-500 dark:focus-within:border-violet-500 dark:focus-visible:border-violet-500 w-full p-1 placeholder:font-normal dark:bg-slate-600 disabled:bg-white"
          rows={5}
          placeholder="Your message"
          value={message}
          onChange={handleChange}
          disabled={isSent}
          required
        ></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className={`flex items-center justify-center bg-violet-500 text-white rounded font-bold py-1 px-3 border-none outline-none ${
            isSent ? "bg-emerald-400" : "bg-violet-500"
          } ${isSent ? "hover:bg-emerald-400" : "hover:bg-violet-400"} ${
            isSent
              ? "focus-visible:bg-emerald-400"
              : "focus-visible:bg-violet-400"
          } ${
            isSent
              ? "focus-within:bg-emerald-400"
              : "focus-within:bg-violet-400"
          }`}
          type="submit"
          disabled={isSent}
        >
          <span>{isSent ? "Sent" : "Send"}</span>
          <SvgIcon
            icon={isSent ? "check" : "email"}
            className="h-4 w-4 fill-white ml-2"
          />
        </button>
      </div>
    </form>
  );
};

export default Email;
