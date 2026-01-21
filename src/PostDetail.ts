import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, Calendar, User, Clock } from 'lucide-react';

const PostDetail = ({ post, onBack }) => {
    const [liked, setLiked] = useState(false);

    // Scroll to top khi mở bài viết
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) return null;

    // Tách ảnh: Ảnh đầu tiên làm cover, các ảnh còn lại làm gallery
    const coverImage = post.images && post.images.length > 0 ? post.images[0] : null;
    const galleryImages = post.images && post.images.length > 1 ? post.images.slice(1) : [];

    return (
        <div className="min-h-screen bg-white animate-in slide-in-from-bottom-4 duration-500 fade-in">
            {/* --- Navigation Bar (Sticky & Glass) --- */}
            <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
    <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
    <button
        onClick={onBack}
    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors py-2 pr-4"
    >
    <ArrowLeft size={20} />
    <span className="font-medium">Quay lại</span>
    </button>

    <div className="flex gap-2">
    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 rounded-full">
    <Share2 size={18} />
    </button>
    </div>
    </div>
    </div>

    {/* --- Main Content --- */}
    <article className="pt-24 pb-20 max-w-3xl mx-auto px-6">

        {/* Category Pill */}
        <div className="flex justify-center mb-6">
    <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase">
        {post.category}
        </span>
        </div>

    {/* Title */}
    <h1 className="text-3xl md:text-5xl font-bold text-center text-slate-900 leading-tight tracking-tight mb-8">
        {post.title}
        </h1>

    {/* Meta Info (Author, Date) */}
    <div className="flex items-center justify-center gap-6 text-slate-500 text-sm mb-10 border-b border-slate-100 pb-10">
    <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
        {post.author.charAt(0)}
        </div>
        <span className="font-medium text-slate-700">{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
    <Calendar size={16} />
    <span>{post.date}</span>
    </div>
    <div className="flex items-center gap-2">
    <Clock size={16} />
    <span>5 phút đọc</span>
    </div>
    </div>

    {/* Hero Image */}
    {coverImage && (
        <div className="w-full aspect-video rounded-[2rem] overflow-hidden shadow-sm mb-12">
        <img
            src={coverImage}
        alt={post.title}
        className="w-full h-full object-cover"
            />
            </div>
    )}

    {/* Body Text (Giả lập nội dung dài) */}
    <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 mx-auto text-slate-700 leading-relaxed">
    <p className="text-xl leading-8 font-medium text-slate-900 mb-6">
        {post.excerpt}
        </p>

        <p className="mb-6">
        Đây là phần nội dung chi tiết của bài viết (giả lập). Trong thực tế, bạn sẽ lấy nội dung này từ trường `content` trong file JSON. Phong cách Apple thường sử dụng font chữ sans-serif sạch sẽ, khoảng cách dòng (line-height) lớn để mắt không bị mỏi khi đọc lâu.
    </p>

    <h2 className="text-2xl text-slate-900 mb-4 mt-8">Tại sao thiết kế này hiệu quả?</h2>
        <p className="mb-6">
        Khoảng trắng (Whitespace) là yếu tố then chốt. Thay vì nhồi nhét thông tin, chúng ta để cho nội dung "thở". Các thành phần như hình ảnh được bo góc lớn (rounded-2xl hoặc 3xl) tạo cảm giác thân thiện, hiện đại.
    </p>

    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-8 bg-slate-50 py-4 pr-4 rounded-r-xl">
        "Thiết kế không chỉ là nó trông như thế nào và cảm thấy như thế nào. Thiết kế là cách nó hoạt động." - Steve Jobs
    </blockquote>

    <p className="mb-6">
        Màu xanh dương (Blue) được sử dụng làm màu điểm nhấn (Accent color) xuyên suốt, từ các nút bấm, icon cho đến các đường link, tạo nên sự nhất quán về thương hiệu.
    </p>
    </div>

    {/* Gallery Grid (Nếu còn ảnh thừa) */}
    {galleryImages.length > 0 && (
        <div className="mt-12 pt-10 border-t border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Thư viện ảnh</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {galleryImages.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group cursor-zoom-in">
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
    ))}
        </div>
        </div>
    )}
    </article>

    {/* Floating Bottom Action Bar (Like Button) */}
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
    <button
        onClick={() => setLiked(!liked)}
    className={`
                flex items-center gap-3 px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-105
                ${liked ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-white'}
            `}
>
    <Heart size={20} className={liked ? 'fill-current' : ''} />
    <span className="font-semibold text-sm">
        {liked ? 'Đã thích bài viết' : 'Thả tim bài viết'}
        </span>
        </button>
        </div>
        </div>
);
};

export default PostDetail;