// src/data.js
export const stories = [
    { id: 1, name: "Về tôi", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop" },
    { id: 2, name: "Dự án", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop" },
    { id: 3, name: "Coding", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=200&fit=crop" },
    { id: 4, name: "Setup", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&h=200&fit=crop" },
    { id: 5, name: "Travel", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop" },
];

// Dữ liệu Blog đã được chuẩn hóa về 1 tác giả
const AUTHOR_NAME = "Tiến Thuận";

export const blogPosts = [
    {
        id: 1,
        title: "Khám phá Hệ sinh thái MacOS mới",
        excerpt: "Trải nghiệm mượt mà, đồng bộ hóa tuyệt đối giữa các thiết bị là điều khiến mình không thể rời bỏ hệ sinh thái này.",
        date: "20 Tháng 10, 2025",
        author: AUTHOR_NAME,
        category: "Technology",
        likes: 120,
        images: [
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=60",
        ]
    },
    {
        id: 2,
        title: "Minimalism trong thiết kế UI/UX",
        excerpt: "Tại sao khoảng trắng lại quan trọng? Cùng tìm hiểu về triết lý 'Less is More' trong thiết kế hiện đại.",
        date: "18 Tháng 10, 2025",
        author: AUTHOR_NAME,
        category: "Design",
        likes: 85,
        images: [
            "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60"
        ]
    },
    {
        id: 3,
        title: "React 19 có gì mới?",
        excerpt: "Tổng hợp những thay đổi đáng chú ý trong phiên bản React sắp tới và cách nó thay đổi cách chúng ta code.",
        date: "15 Tháng 10, 2025",
        author: AUTHOR_NAME,
        category: "Coding",
        likes: 240,
        images: []
    },
    {
        id: 4,
        title: "Góc làm việc năng suất",
        excerpt: "Setup một góc làm việc tạo cảm hứng với tông màu xanh dương chủ đạo.",
        date: "12 Tháng 10, 2025",
        author: AUTHOR_NAME,
        category: "Lifestyle",
        likes: 96,
        images: [
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60"
        ]
    }
];