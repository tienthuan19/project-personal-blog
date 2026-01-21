import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Heart, Share2, Home, User,
    ChevronLeft, MoreHorizontal, Bell, X
} from 'lucide-react';
import { blogPosts, stories, userData } from './data';

// --- UTILS: Hook ẩn hiện Header (GIỮ NGUYÊN) ---
const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
                setScrollDirection(direction);
            }
            setIsTop(scrollY < 50);
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener("scroll", updateScrollDirection);
        return () => window.removeEventListener("scroll", updateScrollDirection);
    }, [scrollDirection]);

    return { scrollDirection, isTop };
};

// --- COMPONENT: Story Viewer (THÊM MỚI VÀO ĐÂY) ---
// --- COMPONENT: Story Viewer (CẬP NHẬT: GIAO DIỆN DYNAMIC ISLAND) ---
// --- COMPONENT: Story Viewer (ĐÃ CHUYỂN "ĐẢO" XUỐNG DƯỚI) ---
const StoryViewer = ({ story, onClose }) => {
    // Tự động đóng sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[80] flex justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-[440px] h-full relative bg-black flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden shadow-2xl">

                {/* 1. Thanh thời gian (Progress Bar) */}
                <div className="absolute top-0 left-0 w-full px-2 pt-2 z-20 flex gap-1">
                    <div className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-white animate-[progress_5s_linear_forwards] origin-left"></div>
                    </div>
                </div>

                {/* 2. Header: Avatar + Tên */}
                <div className="absolute top-6 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <div className="w-8 h-8 rounded-full border border-white/50 overflow-hidden">
                        <img src={story.img} className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-xs font-bold drop-shadow-md">{story.name}</span>
                        <span className="text-white/80 text-[10px] drop-shadow-md">{story.time} trước</span>
                    </div>
                </div>

                {/* 3. Ảnh chính */}
                <div className="flex-1 flex items-center justify-center relative bg-neutral-900">
                    <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                    {/* Gradient đen mờ dưới đáy */}
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>

                {/* 4. DYNAMIC ISLAND (ĐÃ CHUYỂN XUỐNG DƯỚI)
                    - Vị trí: bottom-8 (cách đáy 32px)
                    - Căn giữa: left-1/2 -translate-x-1/2
                */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl animate-in slide-in-from-bottom-4 duration-500">

                    {/* Nút Tim */}
                    <button className="text-white/90 hover:text-red-500 active:scale-90 transition-all flex flex-col items-center gap-1">
                        <Heart size={24} />
                    </button>

                    {/* Vách ngăn mờ */}
                    <div className="w-px h-5 bg-white/20"></div>

                    {/* Nút Đóng (X) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="text-white/90 hover:text-white active:scale-90 transition-all flex flex-col items-center gap-1"
                    >
                        <X size={24} />
                    </button>
                </div>

            </div>
            <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
        </div>
    );
};

// --- COMPONENT: Story Circle (GIỮ NGUYÊN) ---
const StoryItem = ({ story, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
        <div className="w-[68px] h-[68px] rounded-full p-[3px] bg-gradient-to-tr from-blue-400 via-blue-500 to-cyan-300">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                <img src={story.img} alt={story.name} className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500" />
            </div>
        </div>
        <span className="text-[11px] font-medium text-slate-600 truncate w-full text-center">{story.name}</span>
    </div>
);



// --- COMPONENT: Bottom Tab Bar ---
// --- COMPONENT: Bottom Tab Bar (STYLE DYNAMIC ISLAND) ---
// --- COMPONENT: Bottom Tab Bar (BLUE DYNAMIC ISLAND THEME) ---
const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Trang chủ' },
        { id: 'search', icon: Search, label: 'Tìm kiếm' },
        { id: 'about', icon: User, label: 'Tác giả' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
            {/* THAY ĐỔI PALETTE MÀU:
                - bg-white/80: Nền trắng kính (thay vì đen)
                - border-blue-100: Viền xanh siêu nhạt
                - shadow-blue-900/10: Bóng đổ màu xanh đen nhạt tạo chiều sâu
            */}
            <div className="flex items-center justify-center p-1.5 bg-white/80 backdrop-blur-2xl border border-blue-100/50 rounded-full shadow-2xl shadow-blue-900/10 gap-1">

                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ease-out
                                ${isActive
                                // Active: Nền Xanh Blue-600, Chữ Trắng, Bóng xanh Glow nhẹ
                                ? 'bg-blue-600 text-white pl-5 pr-6 shadow-lg shadow-blue-600/30'
                                // Inactive: Chữ xám, Hover vào thì nền xanh nhạt
                                : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 w-12'
                            }
                            `}
                        >
                            <Icon
                                size={22}
                                strokeWidth={isActive ? 2.5 : 2}
                                className="shrink-0"
                            />

                            {isActive && (
                                <span className="text-[13px] font-bold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                    {tab.label}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};



// --- COMPONENT: Mobile Blog Card (GIỮ NGUYÊN) ---
const MobileBlogCard = ({ data, onClick }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    return (
        <article
            onClick={onClick}
            className="flex flex-col gap-4 mb-8 px-5 group cursor-pointer"
        >
            {/* 1. IMAGE AREA: Hình ảnh làm chủ đạo, bo góc lớn */}
            <div className="relative w-full">
                {data.images.length > 0 ? (
                    <div className="overflow-x-auto flex gap-3 scrollbar-hide snap-x snap-mandatory rounded-[1.5rem] shadow-sm">
                        {data.images.map((img, idx) => (
                            <div key={idx} className="relative shrink-0 w-full aspect-[4/3] snap-center">
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover rounded-[1.5rem]"
                                    loading="lazy"
                                />
                                {/* Số lượng ảnh (chỉ hiện nếu > 1) - Tinh tế hơn */}
                                {data.images.length > 1 && (
                                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-bold border border-white/10">
                                        {idx + 1}/{data.images.length}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    // Fallback nếu không có ảnh (hiện placeholder màu)
                    <div className="w-full aspect-[2/1] rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-300">
                        <span className="text-sm font-medium">No Image</span>
                    </div>
                )}
            </div>

            {/* 2. CONTENT AREA: Thoáng hơn, không có đường kẻ */}
            <div className="flex flex-col gap-2">
                {/* Meta Row: Category & Date */}
                <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 tracking-wider uppercase text-[10px]">
                        {data.category || 'Blog'}
                    </span>
                    <span className="text-slate-400 font-medium">
                        {data.date}
                    </span>
                </div>

                {/* Title & Excerpt */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2 group-active:text-blue-600 transition-colors">
                        {data.title}
                    </h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-2">
                        {data.excerpt}
                    </p>
                </div>

                {/* 3. FOOTER AREA: Tác giả & Actions (Gọn gàng hơn) */}
                <div className="flex items-center justify-between mt-1 pt-2">
                    {/* Author Info (Nhỏ gọn) */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {data.author[0]}
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{data.author}</span>
                    </div>

                    {/* Actions (Tim & Share) - Style nhẹ nhàng */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={(e) => handleAction(e, () => setIsLiked(!isLiked))}
                                className="active:scale-75 transition-transform p-1 -mr-1"
                            >
                                <Heart
                                    size={20}
                                    className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
                                />
                            </button>
                            <span className="text-xs font-medium text-slate-400">
                                {isLiked ? (data.likes + 1) : data.likes}
                            </span>
                        </div>

                        <button
                            onClick={(e) => handleAction(e, () => {})}
                            className="text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

// --- COMPONENT: Full Screen Post Detail ---
const PostDetailMobile = ({ post, onBack }) => {
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const contentRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);

    const handleScroll = (e) => {
        const scrolled = e.target.scrollTop;
        const opacity = Math.min(scrolled / 200, 1);
        setHeaderOpacity(opacity);
    };

    const images = post.images || [];
    const showIsland = headerOpacity > 0.85;

    return (
        <div className="fixed inset-0 z-[60] flex justify-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[440px] bg-white h-full relative shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-300">

                {/* --- HEADER --- */}
                {/* --- HEADER --- */}
                <div
                    className="absolute top-0 w-full z-10 transition-all duration-200"
                    style={{
                        backgroundColor: `rgba(255, 255, 255, ${headerOpacity > 0.9 ? 0.9 : headerOpacity})`,
                        backdropFilter: `blur(${headerOpacity * 10}px)`,
                        borderBottom: `1px solid rgba(226, 232, 240, ${headerOpacity})`
                    }}
                >
                    <div className="flex items-center justify-between px-4 h-[50px] pt-safe-top mt-2 relative">
                        {/* Nút Back */}
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-full transition-colors z-20 ${headerOpacity < 0.5 ? 'bg-black/20 text-white' : 'text-slate-900'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* --- DYNAMIC ISLAND TITLE (AESTHETIC STYLE) --- */}
                        {/* Căn giữa tuyệt đối */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full pointer-events-none z-10 px-12">
                            <div
                                className={`
                                    flex items-center justify-center px-8 py-2.5 rounded-full 
                                    /* Gradient Xanh hiện đại + Bóng đổ mềm mại */
                                    bg-gradient-to-r from-sky-500 to-blue-600 
                                    shadow-lg shadow-blue-500/30 border border-white/20
                                    transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) 
                                    ${showIsland ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-75'}
                                `}
                                style={{ maxWidth: '100%' }}
                            >
                                {/* Tiêu đề: Font chữ nét hơn, màu trắng tinh khiết */}
                                <span className="text-white text-[15px] font-bold truncate tracking-wide drop-shadow-sm">
                                    Tác Giả: {userData.name}
                                </span>
                            </div>
                        </div>

                        {/* Nút Menu */}
                        <button
                            className={`p-2 rounded-full transition-colors z-20 ${headerOpacity < 0.5 ? 'bg-black/20 text-white' : 'text-slate-900'}`}
                            onClick={(e) => { e.stopPropagation(); }}
                        >
                            <MoreHorizontal size={24} />
                        </button>
                    </div>
                </div>

                {/* --- CONTENT (Giữ nguyên) --- */}
                <div
                    className="flex-1 overflow-y-auto overflow-x-hidden bg-white pb-40 scrollbar-hide"
                    onScroll={handleScroll}
                    ref={contentRef}
                >
                    {images.length > 0 && (
                        <div className="w-full h-[45vh] relative group">
                            <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                {images.map((img, idx) => (
                                    <div key={idx} className="w-full h-full shrink-0 snap-center relative">
                                        <img src={img} className="w-full h-full object-cover" alt={`slide-${idx}`} />
                                        {images.length > 1 && (
                                            <div className="absolute top-24 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                                                {idx + 1}/{images.length}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    )}

                    <div className={`px-5 relative z-0 ${images.length > 0 ? '-mt-8' : 'mt-20'}`}>
                        <div className="bg-white rounded-t-[2rem] pt-8 pb-4 min-h-screen px-6 shadow-sm">
                            <span className="text-blue-600 font-bold text-xs tracking-wider uppercase mb-3 block">{post.category}</span>
                            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{post.title}</h1>

                            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                                    {post.author[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                                    <p className="text-xs text-slate-400">{post.date}</p>
                                </div>
                            </div>

                            {/* --- PHẦN RENDER HTML TỪ DATA --- */}
                            <div
                                className="prose prose-slate prose-lg leading-relaxed text-slate-600 max-w-none"
                                // Sử dụng dangerouslySetInnerHTML để hiển thị HTML từ data.js
                                // Nếu post.content chưa có, sẽ hiển thị post.excerpt tạm
                                dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
                            />
                        </div>
                    </div>
                </div>

                {/* --- FOOTER (Giữ nguyên) --- */}
                <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-5 flex items-center justify-between z-50">
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium bg-slate-100 px-4 py-2 rounded-full">
                        <span className="text-xs">❤️</span>
                        <span>{isLiked ? post.likes + 1 : post.likes} yêu thích</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="active:scale-90 transition-transform"
                        >
                            <Heart size={28} className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
                        </button>
                        <button className="active:scale-90 transition-transform">
                            <Share2 size={28} className="text-slate-900" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP ---
export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedPost, setSelectedPost] = useState(null);
    const { scrollDirection, isTop } = useScrollDirection();
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        // EDIT: Outer Container - Nền xám nhạt, căn giữa Flex
        <div className="min-h-screen bg-[#F2F4F7] flex justify-center font-sans selection:bg-blue-100">

            {/* EDIT: Phone Container - Max Width 440px, Shadow, Nền trắng */}
            <div className="w-full max-w-[440px] bg-white min-h-screen shadow-2xl relative">

                {/* Header: Thêm max-w và căn giữa để không bị tràn ra ngoài container */}
                <header className={`
                    fixed top-0 w-full max-w-[440px] left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-transform duration-300
                    ${scrollDirection === 'down' && !isTop ? '-translate-y-full' : 'translate-y-0'}
                `}>
                    <div className="flex items-center justify-between px-4 h-[52px] pt-safe-top">
                        <h1 className="text-xl font-bold tracking-tight flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                            MyBlog
                        </h1>
                        <div className="relative p-2">
                            <Bell size={22} className="text-slate-700" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="pt-[60px] pb-32">
                    {activeTab === 'home' && (
                        <>
                            <div className="mb-2 overflow-x-auto flex gap-3 px-4 py-3 scrollbar-hide w-full border-b border-slate-50">
                                {stories.map(story => <StoryItem key={story.id} story={story} onClick={() => setSelectedStory(story)}/>)}
                            </div>

                            <div className="px-4 py-2">
                                <h2 className="text-2xl font-bold tracking-tight">Mới nhất</h2>
                            </div>

                            <div>
                                {blogPosts.map(post => (
                                    <MobileBlogCard
                                        key={post.id}
                                        data={post}
                                        onClick={() => setSelectedPost(post)}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Các tab khác */}
                    {activeTab === 'search' && (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 px-6 text-center">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p>Tính năng tìm kiếm bài viết đang được phát triển.</p>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="px-5 py-8">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
                                    {userData.avatarChar}
                                </div>
                                <h2 className="text-2xl font-bold">{userData.name}</h2>
                                <p className="text-slate-500">{userData.role}</p>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed">
                                {userData.bio}
                            </div>
                        </div>
                    )}
                </main>

                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* MODAL STORY VIEWER */}
                {selectedStory && (
                    <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
                )}

                {selectedPost && (
                    <PostDetailMobile post={selectedPost} onBack={() => setSelectedPost(null)} />
                )}
            </div>
        </div>
    );
}