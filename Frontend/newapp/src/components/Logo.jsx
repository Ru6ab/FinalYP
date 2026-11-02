import { Link } from "react-router-dom";
import { MdHomeWork } from "react-icons/md";

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span
        className={`grid h-9 w-9 place-items-center rounded-lg ${
          light ? "bg-white text-blue-800" : "bg-blue-700 text-white"
        }`}
      >
        <MdHomeWork size={20} />
      </span>
      <span
        className={`text-xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        Heaven<span className={light ? "text-blue-200" : "text-blue-600"}>Homes</span>
      </span>
    </Link>
  );
}