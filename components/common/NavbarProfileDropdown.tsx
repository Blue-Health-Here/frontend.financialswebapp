import { signOutAction } from "@/app/actions"
import { adminSidebarItems, pharmacySidebarItems } from "@/utils/constants";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
interface NavbarProfileDropdownProps {
    role?: string;
}

const NavbarProfileDropdown: React.FC<NavbarProfileDropdownProps> = ({ role }) => {
    const pathname = usePathname();
    const sidebarItems = role === 'admin' ? adminSidebarItems : pharmacySidebarItems
    return (
        <div className="absolute right-0 top-full p-4 w-48 md:w-60 bg-primary rounded-lg shadow-lg">
            {sidebarItems.map((item, index) => {
                const isActive = pathname === item.path
                return (
                    <Link href={item.path} key={index}>
                        <li className={`flex items-center gap-x-2 mb-1 p-2 text-white rounded-md text-sm cursor-pointer transition
                                        ${isActive ? "bg-secondary text-white" : "hover:bg-secondary hover:text-white"}`}>
                            <Image src={item.icon} alt={`${item.name} Icon`} width={15} height={15} />
                            <span className="text-xs sm:text-sm md:text-[16px]">{item.name}</span>
                        </li>
                    </Link>
                )
            })}
            <hr className='mb-1' />
            <button className='flex items-center gap-x-2 p-2 rounded-md text-sm text-white cursor-pointer transition' onClick={signOutAction}>
                <svg  className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.22222 22C3.61111 22 3.08815 21.7826 2.65333 21.3478C2.21852 20.913 2.00074 20.3896 2 19.7778V4.22222C2 3.61111 2.21778 3.08815 2.65333 2.65333C3.08889 2.21852 3.61185 2.00074 4.22222 2H12V4.22222H4.22222V19.7778H12V22H4.22222ZM16.4444 17.5556L14.9167 15.9444L17.75 13.1111H8.66667V10.8889H17.75L14.9167 8.05556L16.4444 6.44444L22 12L16.4444 17.5556Z" fill="#ffffff" />
                </svg>
                <span className="text-xs sm:text-sm md:text-[16px]">Logout</span>
            </button>
        </div>
    )
}

export default NavbarProfileDropdown