# Quy chuẩn phát triển giao diện Môi Trường Bảo Châu (Ground Truth Base)

Mọi file HTML, layout, component, CSS và script đều phải tuân thủ nghiêm ngặt các quy định:
1. **Lấy `index.html` làm chuẩn mực duy nhất**: Toàn bộ class, cấu trúc thẻ, dataset và assets.
2. **Background Shapes**: Luôn có `.webhd-shap-bg` (`images/bg-02.webp`) và `.webhd-shap` (`images/logo-leave-png-min.png` opacity-15) đầu `<main>`.
3. **Section Subtitle Badges (Tiêu đề phụ)**: Đồng bộ 100% markup hoa thị `images/asterisk.png` + gradient text `.icon-list-icon` & `.icon-list-text`. Tuyệt đối không tự chế kiểu pill hay pulse dot riêng lẻ.
4. **Header & Navigation**: Menu đa cấp, search dropdown toggle, off-canvas drawer `#offCanvasMenu` đồng bộ logo thương hiệu + nút Hotline ghim chân.
5. **Footer 3 Cột**: Thông tin công ty + MST + 2 email, Tổng đài 5 số hotline chuyên viên tư vấn/kinh doanh, Danh sách 7 dịch vụ chính, Logo giữa và bản quyền 2019-2026.
6. **Double Marquee Slider**: Swiper 2 hàng chạy vô tận (Row 1 RTL, Row 2 LTR) với card kính mờ `.c-light-button.glass-effect.rounded-xl.border.border-white`.
7. **Card & Icon Layout**: Dùng chuẩn `.card-item.relative.glass-effect.rounded-3xl.p-6.xl:p-8`, icon wrapper `52x52px`, svg `26x26px`.
8. **Không viết custom CSS tùy tiện**: Chỉ sử dụng class Tailwind và CSS utilities có sẵn.
9. **Assets nội bộ**: Trỏ file trực tiếp trong thư mục dự án (`css/`, `js/`, `images/`, `fonts/`).
