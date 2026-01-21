import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Heart, Share2, Bookmark, Home, User,
    ChevronLeft, MoreHorizontal, Bell
} from 'lucide-react';
import { blogPosts, stories } from './data';

// --- UTILS: Hook để ẩn hiện Header khi scroll (Hiệu ứng iOS) ---
const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
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

// --- COMPONENT: Story Circle (Giống Instagram) ---
const StoryItem = ({ story }) => (
    <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
        <div className="w-[68px] h-[68px] rounded-full p-[3px] bg-gradient-to-tr from-blue-400 via-blue-500 to-cyan-300">
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                <img src={story.img} alt={story.name} className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500" />
            </div>
        </div>
        <span className="text-[11px] font-medium text-slate-600 truncate w-full text-center">{story.name}</span>
    </div>
);

// --- COMPONENT: Bottom Tab Bar (Điều hướng chính cho iPhone) ---
const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'saved', icon: Bookmark, label: 'Saved' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe z-50">
            <div className="flex justify-around items-center h-16 pb-1"> {/* pb-1 để căn chỉnh visual */}
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex flex-col items-center justify-center w-full h-full active:scale-90 transition-transform duration-200"
                        >
                            <Icon
                                size={24}
                                className={`mb-1 transition-colors ${isActive ? 'text-blue-600 stroke-[2.5px]' : 'text-slate-400'}`}
                            />
                            <span className={`text-[10px] font-medium ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                {tab.label}
              </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// --- COMPONENT: Mobile Blog Card ---
const MobileBlogCard = ({ data, onClick }) => {
    return (
        <article
            onClick={onClick}
            className="bg-white mb-3 active:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0 pb-6 pt-2"
        >
            {/* Header nhỏ gọn */}
            <div className="px-4 flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-xs">{data.author[0]}</div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-slate-900 leading-none">{data.author}</h4>
                        <span className="text-[11px] text-slate-400">{data.date}</span>
                    </div>
                </div>
                <button className="text-slate-300">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Grid ảnh thông minh (Mobile version: Full width hoặc Grid tight) */}
            <div className="mb-3">
                {data.images.length === 0 ? null : (
                    <div className={`
                ${data.images.length === 1 ? 'px-4' : 'pl-4 overflow-x-auto flex gap-2 scrollbar-hide snap-x'}
             `}>
                        {data.images.map((img, idx) => (
                            <div key={idx} className={`
                        relative overflow-hidden shrink-0
                        ${data.images.length === 1 ? 'w-full aspect-video rounded-2xl shadow-sm' : 'w-[85vw] aspect-[4/3] rounded-2xl snap-center first:pl-0 last:pr-4'}
                    `}>
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                {/* Số lượng ảnh nếu nhiều */}
                                {data.images.length > 1 && (
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-white text-[10px] font-bold">
                                        {idx + 1}/{data.images.length}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Text */}
            <div className="px-4 space-y-1">
                <h2 className="text-[17px] font-bold text-slate-900 leading-snug">
                    {data.title}
                </h2>
                <p className="text-slate-500 text-[14px] leading-normal line-clamp-2">
                    {data.excerpt}
                </p>
            </div>

            {/* Mobile Actions */}
            <div className="px-4 mt-3 flex items-center gap-5">
                <button className="flex items-center gap-1.5 group active:scale-95 transition-transform">
                    <Heart size={22} className="text-slate-800 group-hover:text-red-500 transition-colors" />
                </button>
                <button className="flex items-center gap-1.5 active:scale-95 transition-transform">
                    <div className="relative">
                        {/* Icon comment giả lập */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </div>
                </button>
                <button className="flex items-center gap-1.5 ml-auto active:scale-95 transition-transform">
                    <Share2 size={22} className="text-slate-800" />
                </button>
            </div>
        </article>
    );
};

// --- COMPONENT: Full Screen Post Detail ---
const PostDetailMobile = ({ post, onBack }) => {
    // Logic ẩn/hiện header khi scroll trong trang chi tiết
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const contentRef = useRef(null);

    const handleScroll = (e) => {
        const scrolled = e.target.scrollTop;
        const opacity = Math.min(scrolled / 200, 1); // 200px là hiện full
        setHeaderOpacity(opacity);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-right duration-300">
            {/* Dynamic Header */}
            <div
                className="absolute top-0 w-full z-10 transition-all duration-200 border-b border-slate-100/0"
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${headerOpacity > 0.9 ? 0.9 : headerOpacity})`,
                    backdropFilter: `blur(${headerOpacity * 10}px)`,
                    borderBottomColor: `rgba(226, 232, 240, ${headerOpacity})`
                }}
            >
                <div className="flex items-center justify-between px-4 h-[50px] pt-safe-top mt-2">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-full transition-colors ${headerOpacity < 0.5 ? 'bg-black/30 text-white' : 'text-slate-900'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Title nhỏ ở header khi scroll xuống */}
                    <span
                        className="font-semibold text-slate-900 truncate max-w-[60%] transition-opacity duration-300"
                        style={{ opacity: headerOpacity > 0.8 ? 1 : 0 }}
                    >
                        {post.author}
                    </span>

                    <button className={`p-2 rounded-full transition-colors ${headerOpacity < 0.5 ? 'bg-black/30 text-white' : 'text-slate-900'}`}>
                        <MoreHorizontal size={24} />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                className="flex-1 overflow-y-auto overflow-x-hidden bg-white pb-24"
                onScroll={handleScroll}
                ref={contentRef}
            >
                {/* Full Bleed Image */}
                {post.images && post.images.length > 0 && (
                    <div className="w-full h-[40vh] relative">
                        <img src={post.images[0]} className="w-full h-full object-cover" alt="cover"/>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
                    </div>
                )}

                <div className="px-5 -mt-6 relative z-0">
                    <div className="bg-white rounded-t-[2rem] pt-8 pb-4">
                        <span className="text-blue-600 font-bold text-xs tracking-wider uppercase mb-3 block">{post.category}</span>
                        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{post.title}</h1>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                {post.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                                <p className="text-xs text-slate-400">{post.date} • 5 mins read</p>
                            </div>
                        </div>

                        <div className="prose prose-slate prose-lg leading-relaxed text-slate-600">
                            <p className="font-medium text-slate-900 text-lg mb-4">{post.excerpt}</p>
                            <p>Đây là nội dung chi tiết bài viết, được tối ưu hóa cho việc đọc trên điện thoại. Cỡ chữ lớn hơn, khoảng cách dòng thoáng hơn.</p>
                            <p>Việc sử dụng hình ảnh full chiều ngang màn hình (Full-bleed) giúp tạo trải nghiệm thị giác ấn tượng ngay khi vừa mở bài viết.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 pb-safe-bottom flex items-center justify-between">
                <div className="flex gap-1 text-slate-500 text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full">
                    ❤️ 1.2k
                </div>
                <div className="flex items-center gap-6">
                    <Heart size={26} className="text-slate-900" />
                    <Share2 size={26} className="text-slate-900" />
                    <Bookmark size={26} className="text-slate-900" />
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

    return (
        // Overscroll behavior none: Ngăn kéo dãn trang trên Chrome Mobile
        <div className="bg-white min-h-screen text-slate-900 font-sans overscroll-none pb-20">

            {/* 1. Header (Dynamic: Ẩn khi scroll xuống, hiện khi scroll lên) */}
            <header className={`
        fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-transform duration-300
        ${scrollDirection === 'down' && !isTop ? '-translate-y-full' : 'translate-y-0'}
      `}>
                <div className="flex items-center justify-between px-4 h-[52px] pt-safe-top">
                    <h1 className="text-xl font-bold tracking-tight flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                        MyBlog
                    </h1>
                    <div className="relative p-2">
                        <Bell size={22} className="text-slate-700" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <main className="pt-[60px]">
                {activeTab === 'home' && (
                    <>
                        {/* 2. Stories Rail (Vuốt ngang) */}
                        <div className="mb-2 overflow-x-auto flex gap-3 px-4 py-3 scrollbar-hide w-full border-b border-slate-50">
                            {stories.map(story => <StoryItem key={story.id} story={story} />)}
                        </div>

                        {/* 3. Feed Title */}
                        <div className="px-4 py-2">
                            <h2 className="text-2xl font-bold tracking-tight">Dành cho bạn</h2>
                        </div>

                        {/* 4. Blog Posts Feed */}
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

                {/* Placeholder cho các tab khác */}
                {activeTab !== 'home' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                        <p>Đang phát triển tab {activeTab}...</p>
                    </div>
                )}
            </main>

            {/* 5. Bottom Navigation */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* 6. Detail Modal (Conditional Rendering) */}
            {selectedPost && (
                <PostDetailMobile post={selectedPost} onBack={() => setSelectedPost(null)} />
            )}
        </div>
    );
}