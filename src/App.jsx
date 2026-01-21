import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Heart, Share2, Bookmark, Home, User,
    ChevronLeft, MoreHorizontal, Bell, MessageCircle
} from 'lucide-react';
import { blogPosts, stories } from './data';

// --- UTILS: Hook ẩn hiện Header ---
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

// --- COMPONENT: Story Circle ---
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

// --- COMPONENT: Bottom Tab Bar ---
const BottomNav = ({ activeTab, setActiveTab }) => {
    // Đổi tên label Profile thành About vì người xem không có Profile
    const tabs = [
        { id: 'home', icon: Home, label: 'Trang chủ' },
        { id: 'search', icon: Search, label: 'Tìm kiếm' },
        { id: 'saved', icon: Bookmark, label: 'Đã lưu' },
        { id: 'about', icon: User, label: 'Tác giả' },
    ];

    return (
        <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe z-50">
            <div className="flex justify-around items-center h-16 pb-1">
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
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Xử lý click nút chức năng không làm mở bài viết
    const handleAction = (e, action) => {
        e.stopPropagation(); // QUAN TRỌNG: Ngăn chặn click lan ra thẻ cha
        action();
    };

    return (
        <article
            onClick={onClick}
            className="bg-white mb-3 active:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0 pb-6 pt-2"
        >
            {/* Header: Vì chỉ có 1 tác giả nên có thể làm gọn lại hoặc giữ nguyên style Instagram */}
            <div className="px-4 flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-blue-200">
                        {/* Avatar mặc định cho tác giả */}
                        <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-xs">
                            {data.author[0]}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-slate-900 leading-none">{data.author}</h4>
                        <span className="text-[11px] text-slate-400">{data.date}</span>
                    </div>
                </div>
                <button className="text-slate-300" onClick={(e) => handleAction(e, () => {})}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Images */}
            <div className="mb-3">
                {data.images.length > 0 && (
                    <div className={`${data.images.length === 1 ? 'px-4' : 'pl-4 overflow-x-auto flex gap-2 scrollbar-hide snap-x'}`}>
                        {data.images.map((img, idx) => (
                            <div key={idx} className={`
                                relative overflow-hidden shrink-0 bg-slate-100
                                ${data.images.length === 1 ? 'w-full aspect-video rounded-2xl shadow-sm' : 'w-[85vw] aspect-[4/3] rounded-2xl snap-center first:pl-0 last:pr-4'}
                            `}>
                                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
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
                <h2 className="text-[17px] font-bold text-slate-900 leading-snug">{data.title}</h2>
                <p className="text-slate-500 text-[14px] leading-normal line-clamp-2">{data.excerpt}</p>
            </div>

            {/* Mobile Actions - Đã sửa lỗi click */}
            <div className="px-4 mt-3 flex items-center gap-5">
                <button
                    onClick={(e) => handleAction(e, () => setIsLiked(!isLiked))}
                    className="flex items-center gap-1.5 group active:scale-95 transition-transform"
                >
                    <Heart
                        size={24}
                        className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-800 group-hover:text-red-500'}`}
                    />
                </button>

                <button
                    onClick={(e) => handleAction(e, () => {})}
                    className="flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                    <MessageCircle size={24} className="text-slate-800" />
                </button>

                <button
                    onClick={(e) => handleAction(e, () => {})}
                    className="flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                    <Share2 size={24} className="text-slate-800" />
                </button>

                <button
                    onClick={(e) => handleAction(e, () => setIsSaved(!isSaved))}
                    className="flex items-center gap-1.5 ml-auto active:scale-95 transition-transform"
                >
                    <Bookmark
                        size={24}
                        className={`transition-colors ${isSaved ? 'fill-slate-800 text-slate-800' : 'text-slate-800'}`}
                    />
                </button>
            </div>

            <div className="px-4 mt-2">
                <span className="text-xs font-semibold text-slate-900">
                    {isLiked ? (data.likes + 1) : data.likes} lượt thích
                </span>
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

    return (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-right duration-300">
            {/* Dynamic Header */}
            <div
                className="absolute top-0 w-full z-10 transition-all duration-200"
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${headerOpacity > 0.9 ? 0.9 : headerOpacity})`,
                    backdropFilter: `blur(${headerOpacity * 10}px)`,
                    borderBottom: `1px solid rgba(226, 232, 240, ${headerOpacity})`
                }}
            >
                <div className="flex items-center justify-between px-4 h-[50px] pt-safe-top mt-2">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-full transition-colors ${headerOpacity < 0.5 ? 'bg-black/20 text-white' : 'text-slate-900'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <span
                        className="font-semibold text-slate-900 truncate max-w-[60%] transition-opacity duration-300"
                        style={{ opacity: headerOpacity > 0.8 ? 1 : 0 }}
                    >
                        {post.author}
                    </span>

                    <button className={`p-2 rounded-full transition-colors ${headerOpacity < 0.5 ? 'bg-black/20 text-white' : 'text-slate-900'}`}>
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
                {post.images && post.images.length > 0 && (
                    <div className="w-full h-[45vh] relative">
                        <img src={post.images[0]} className="w-full h-full object-cover" alt="cover"/>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
                    </div>
                )}

                <div className={`px-5 relative z-0 ${post.images && post.images.length > 0 ? '-mt-8' : 'mt-20'}`}>
                    <div className="bg-white rounded-t-[2rem] pt-8 pb-4 min-h-screen">
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

                        <div className="prose prose-slate prose-lg leading-relaxed text-slate-600 max-w-none">
                            <p className="font-medium text-slate-900 text-lg mb-4">{post.excerpt}</p>
                            <p>Đây là phần nội dung mẫu (dummy content) để mô phỏng bài viết. Trong thực tế, nội dung này sẽ được lấy từ database hoặc file markdown.</p>
                            <p>Vì đây là blog cá nhân, giao diện tập trung hoàn toàn vào nội dung bài viết và trải nghiệm đọc.</p>
                            <h3>Tiêu đề phụ</h3>
                            <p>Thêm một đoạn văn bản nữa để test khả năng cuộn trang. Giao diện này được tối ưu cho việc đọc trên di động với font size lớn và line-height thoáng.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-3 pb-safe-bottom flex items-center justify-between z-50">
                <div className="flex gap-1 text-slate-500 text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full">
                    ❤️ {isLiked ? post.likes + 1 : post.likes} yêu thích
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => setIsLiked(!isLiked)}>
                        <Heart size={26} className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
                    </button>
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
        <div className="bg-white min-h-screen text-slate-900 font-sans overscroll-none pb-20 selection:bg-blue-100">
            {/* Header */}
            <header className={`
                fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-transform duration-300
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
            <main className="pt-[60px]">
                {activeTab === 'home' && (
                    <>
                        <div className="mb-2 overflow-x-auto flex gap-3 px-4 py-3 scrollbar-hide w-full border-b border-slate-50">
                            {stories.map(story => <StoryItem key={story.id} story={story} />)}
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

                {/* Các tab khác hiển thị thông báo hoặc nội dung tĩnh */}
                {activeTab === 'search' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 px-6 text-center">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p>Tính năng tìm kiếm bài viết đang được phát triển.</p>
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 px-6 text-center">
                        <Bookmark size={48} className="mb-4 opacity-20" />
                        <p>Danh sách bài viết đã lưu (Local Storage) sẽ hiển thị ở đây.</p>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="px-5 py-8">
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
                                T
                            </div>
                            <h2 className="text-2xl font-bold">Tiến Thuận</h2>
                            <p className="text-slate-500">Developer & Tech Lover</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed">
                            Chào mừng đến với blog cá nhân của mình. Đây là nơi mình chia sẻ về công nghệ, lập trình và cuộc sống hàng ngày.
                        </div>
                    </div>
                )}
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {selectedPost && (
                <PostDetailMobile post={selectedPost} onBack={() => setSelectedPost(null)} />
            )}
        </div>
    );
}