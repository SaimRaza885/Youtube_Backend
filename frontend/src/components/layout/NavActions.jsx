import { Link } from 'react-router-dom'
import { Search, Bell, Plus } from 'lucide-react'
import { useUI } from '../../context/UIContext'

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'

export const NavActions = () => {
  const { setShowUploadModal } = useUI()

  return (
    <div className="flex items-center gap-1">
      <Link to="/search" className="md:hidden text-[#6B6B80] hover:text-[#F0F0F8] p-2 hover:bg-[#1C1C2E] rounded-full transition-colors">
        <Search className="w-5 h-5" />
      </Link>
      <button
        onClick={() => setShowUploadModal(true)}
        className="flex items-center gap-1.5 text-[#A1A1B5] hover:text-white px-3 py-1.5 hover:bg-[#1C1C2E] rounded-full transition-colors text-sm font-medium border border-[#2A2A42]"
        title="Create"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Create</span>
      </button>
      <button className="text-[#6B6B80] hover:text-[#F0F0F8] p-2 hover:bg-[#1C1C2E] rounded-full transition-colors relative" title="Notifications">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF0000] rounded-full ring-2 ring-[#0f0f0f]" />
      </button>
      <button className="p-0.5 hover:opacity-80 transition-opacity" title="Profile">
        <img
          src={DEFAULT_AVATAR}
          alt="User"
          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#2A2A42]"
        />
      </button>
    </div>
  )
}
