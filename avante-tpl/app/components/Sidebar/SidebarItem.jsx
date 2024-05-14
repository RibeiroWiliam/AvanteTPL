export default function SidebarItem({ icon, text, href, isActive }) {
  const styles = isActive ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary';
  
  return (
    <a href={href}>
      <div className={`p-2.5 mt-3 flex items-center rounded-xl px-4 duration-300 cursor-pointer ${styles}`}>
        <i className={icon}></i>
        <span className="text-[15px] ml-4">{text}</span>
      </div>   
    </a>
  );
}