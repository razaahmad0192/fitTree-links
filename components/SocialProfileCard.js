// components/SocialProfileCard.jsx
import Image from "next/image";
import Link from "next/link";
import Watermark from "./Watermark";
const SocialProfileCard = ({ pic, handle, desc, links = [] }) => {
  return (
    <div className="bg-gray-800 text-white md:h-auto h-screen w-full  md:w-100 py-6 md:p-6 px-2 md:rounded-xl flex flex-col items-center gap-6">
      {/* Avatar */}
      <img
        src={pic}
        alt={handle}
       
       className="h-40 w-40 rounded-full  object-cover my-4 border-2 border-gray-300"
      />

      {/* Handle */}
      <div className="text-xl font-bold mt-2">@{handle}</div>

      {/* Description */}
      {desc && <p className="text-center text-gray-200 text-sm">{desc}</p>}

      {/* Links */}
      <div className="w-full flex flex-col gap-3">
        {links.map((linkItem, index) => (
          <Link key={index} target="_blank" href={linkItem.link}>
            <div className="w-full mx-auto bg-gray-700 text-center py-4 rounded-lg cursor-pointer hover:bg-green-400 hover:text-gray-900 font-medium transition">
              {linkItem.linktext}
            </div>
          </Link>
        ))}
      </div>
      <Watermark/>
    </div>
  );
};

export default SocialProfileCard;
