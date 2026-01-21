// src/data.js
export const userData = {
    name: "Mai Hiên",
    role: "Content Creator & Dreamer",
    avatarChar: "M",
    bio: "Chào mừng đến với blog cá nhân của mình. Nơi lưu giữ những khoảnh khắc đời thường, những công thức nấu ăn nhỏ và những điều chữa lành tâm hồn.",
    socials: {
        facebook: "#",
        instagram: "#",
        tiktok: "#"
    }
};

export const stories = [
    { id: 1, name: "Daily", time: "2 giờ", img: "https://images.immediate.co.uk/production/volatile/sites/10/2023/06/2048x1365-Oak-trees-SEO-GettyImages-90590330-b6bfe8b.jpg" },
    { id: 2, name: "Travel", time: "5 giờ", img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=400&h=800&fit=crop" },
    { id: 3, name: "Food", time: "12 giờ", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=800&fit=crop" },
    { id: 4, name: "Cats", time: "1 ngày", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=800&fit=crop" },
    { id: 5, name: "Books", time: "1 ngày", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=800&fit=crop" },
];

export const blogPosts = [
    {
        id: 1,
        title: "Một buổi sáng thảnh thơi ở Đà Lạt",
        excerpt: "Không khí se lạnh, ly cà phê nóng và cuốn sách yêu thích. Những khoảnh khắc chữa lành tâm hồn sau một tuần làm việc căng thẳng.",
        date: "20 Tháng 10, 2025",
        author: userData.name,
        category: "Travel",
        likes: 342,
        images: [
            "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=60",
        ],
        // Dưới đây là nội dung HTML giả lập (Rich Text)
        content: `
            <p>Đà Lạt luôn chào đón mình bằng một cái ôm se lạnh. Sáng nay thức dậy lúc 6 giờ, sương mù vẫn còn giăng mắc trên những ngọn thông phía xa.</p>
            
            <h3>Thói quen buổi sáng</h3>
            <p>Mình không vội vã đi check-in các điểm du lịch nổi tiếng. Thay vào đó, mình chọn một quán cà phê nhỏ nằm sâu trong hẻm dốc.</p>
            <ul>
                <li>Gọi một ly <strong>Cà phê sữa nóng</strong> ít ngọt.</li>
                <li>Mở cuốn sách đang đọc dở (<em>Rừng Na Uy</em>).</li>
                <li>Ngắm nhìn dòng người chậm rãi qua lại.</li>
            </ul>

            <h3>Tại sao mình yêu nơi này?</h3>
            <p>Có lẽ là vì sự tĩnh lặng. Ở Sài Gòn, tiếng còi xe chưa bao giờ dứt. Còn ở đây, âm thanh rõ nhất mình nghe thấy là tiếng gió rít qua khe cửa và tiếng chim hót.</p>
            <p>Nếu bạn đang cảm thấy kiệt sức, hãy thử tắt điện thoại và đến đây một lần. Chỉ cần ngồi yên và thở thôi cũng đủ để sạc đầy năng lượng rồi.</p>
        `
    },
    {
        id: 2,
        title: "Tự tay vào bếp: Món Pasta kem nấm",
        excerpt: "Cuối tuần là thời gian tuyệt vời để nuông chiều bản thân bằng một bữa ăn ngon tự nấu. Công thức này siêu đơn giản mà cực cuốn.",
        date: "18 Tháng 10, 2025",
        author: userData.name,
        category: "Cooking",
        likes: 189,
        images: ["https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=60"],
        content: `
            <p>Hôm nay mình sẽ chia sẻ công thức món tủ mỗi khi lười nhưng vẫn muốn ăn ngon: <strong>Pasta Kem Nấm</strong>.</p>
            <h3>Nguyên liệu cần chuẩn bị:</h3>
            <ul>
                <li>Mỳ Ý (loại sợi dẹt hoặc tròn đều được)</li>
                <li>Nấm mỡ hoặc nấm đùi gà</li>
                <li>Kem tươi (Whipping cream)</li>
                <li>Tỏi, hành tây, phô mai Parmesan</li>
            </ul>
            <p>Bí quyết nằm ở việc phi tỏi thật thơm và không nấu kem quá lâu để tránh bị tách nước nhé!</p>
        `
    },
    // ... Các bài khác bạn có thể thêm tương tự hoặc để trống content, code sẽ tự handle
    {
        id: 3,
        title: "Nhật ký: Học cách yêu bản thân",
        excerpt: "Đôi khi chúng ta mải mê chạy theo kỳ vọng của người khác mà quên mất việc chăm sóc chính mình.",
        date: "15 Tháng 10, 2025",
        author: userData.name,
        category: "Journal",
        likes: 560,
        images: ["https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=60"],
        content: `<p>Nội dung đang cập nhật...</p>`
    },
    {
        id: 4,
        title: "Góc xanh nhỏ trong phòng ngủ",
        excerpt: "Việc chăm sóc cây cối mỗi ngày giúp mình rèn luyện sự kiên nhẫn và tìm thấy sự bình yên giữa thành phố ồn ào.",
        date: "12 Tháng 10, 2025",
        author: userData.name,
        category: "My Home",
        likes: 215,
        images: [
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop&q=60"
        ],
        content: `<p>Nội dung đang cập nhật...</p>`
    }
];