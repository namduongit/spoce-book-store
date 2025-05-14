
const footer = document.querySelector('.footer-info');

function showFooterInfo(info) {
    showLoading();
    const infoContainer = document.querySelector('.footer-info__container');
    let url = new URLSearchParams();
    hideMainPage();
    if (footer.classList.contains('hide-item')) {
        footer.classList.remove('hide-item');
    }

    if (info === 'aboutus') {
        infoContainer.innerHTML = `
        <h2>Giới thiệu</h2>
        <h3 class="footer-info__introduction-title">SPOCE BOOK STORE - Nơi Tri Thức Vươn Xa</h3>
        <p>Spoce Book Store ra đời với khát vọng mang đến cho cộng đồng yêu sách Việt Nam một không gian mua sắm trực tuyến hiện đại, tiện lợi và đầy cảm hứng. Chúng tôi tự hào là một trong những nhà sách trực tuyến tiên phong, không ngừng nỗ lực để trở thành điểm đến lý tưởng cho mọi độc giả.</p>
        <p>Từ những ngày đầu thành lập, Spoce Book Store luôn đặt mục tiêu xây dựng một nền tảng mua sắm sách trực tuyến hàng đầu, được tin tưởng và yêu mến bởi hàng triệu khách hàng. Chúng tôi hiểu rằng, sách không chỉ là sản phẩm, mà còn là nguồn tri thức vô giá, là cầu nối giữa con người với thế giới rộng lớn.</p>
        <p>Với sứ mệnh lan tỏa tri thức đến mọi miền đất nước, Spoce Book Store không ngừng mở rộng phạm vi hoạt động, mang sách đến tay độc giả từ những thành phố lớn đến những vùng sâu vùng xa, từ Việt Nam đến cộng đồng người Việt trên toàn thế giới. Chúng tôi tin rằng, không có khoảng cách nào có thể ngăn cản niềm đam mê đọc sách và khát vọng khám phá tri thức.</p>
        <p>Để thực hiện sứ mệnh đó, Spoce Book Store luôn chú trọng đầu tư vào công nghệ, xây dựng hệ thống mua sắm trực tuyến hiện đại, thân thiện với người dùng. Đồng thời, chúng tôi cũng không ngừng nâng cao chất lượng dịch vụ, mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất.</p>
        <p>Spoce Book Store cam kết sẽ tiếp tục nỗ lực không ngừng, để trở thành người bạn đồng hành tin cậy của mọi độc giả trên hành trình khám phá tri thức. Chúng tôi tin rằng, cùng với sự ủng hộ của quý khách hàng, Spoce Book Store sẽ ngày càng phát triển và đóng góp vào sự phát triển văn hóa đọc của Việt Nam.</p>
        <h3 class="footer-info__introduction-title">Đội ngũ Spoce Book Store</h3>
        <ul>
            <li>Với đội ngũ trẻ trung, yêu mến sách và với mong muốn thúc đẩy văn hóa đọc của người Việt, các nhân viên của Spoce sẵn sàng đáp ứng mọi nhu cầu quý khách về sách với chất lượng phục vụ tốt nhất.</li>
        </ul>
        <h3 class="footer-info__introduction-title">Phong cách Spoce Book Store</h3>
        <ul>
            <li>Phục vụ khách hàng tốt nhất, nhanh nhất, chu đáo nhất và tiết kiệm nhất. Spoce là Nhà sách, vì vậy Dịch vụ của Spoce hướng đến và hiểu những quý khách hàng là những người đọc sách. Phục vụ khách hàng tốt nhất, nhanh nhất, chu đáo nhất và tiết kiệm nhất. Spoce là Nhà sách, vì vậy Dịch vụ của Spoce hướng đến và hiểu những quý khách hàng là những người đọc sách. </li>
            <li>Hiện nay, Spoce Book Store là nhà sách trên mạng có số lượng đầu sách lớn nhất với hơn 60,000 tựa sách và đều cập nhật mới mỗi ngày.</li>
        </ul>
        <h3 class="footer-info__introduction-title">Dịch vụ của Spoce Book Store</h3>
        <ul>
            <li>Đặt hàng trực tuyến, giao hàng tận nơi</li>
            <li>Sách trước khi giao được bao bọc cẩn thận trong thùng giấy hoặc túi giấy Kraft Vintage, lịch sự và bảo vệ môi trường</li>
            <li>Đội ngũ giao hàng trong thành phố thân thiện, tận tâm</li>
            <li>Sẵn sàng giao đến mọi miền đất nước thông qua dịch vụ giao hàng của Bưu Chính Việt Nam</li>
            <li>Chuyển sách đi nước ngoài thông qua dịch vụ chuyển phát nhanh DHL hoặc chuyển phát bằng máy bay.</li>
            <li>Nhiều hình thức thanh toán tiện lợi, trả trước bằng thẻ trực tuyến hoặc thu tiền tận nơi</li>
            <li>Dịch vụ bọc sách bằng bọc nhựa cao cấp, thực hiện tỉ mỉ và cẩn thận cho từng cuốn</li>
            <li>Dịch vụ gói quà, giúp quý khách gởi tặng những món quà tinh thần bổ ích đến những người thân yêu</li>
            <li>Dịch vụ chăm sóc khách hàng 7 ngày trong tuần, kể cả thứ 7 và chủ nhật thông qua tổng đài 0388.853.835 hoặc hệ thống hỗ trợ khách hàng qua email tại spoce_bookstore@gmail.com hoặc các hình thức chat trực tuyến Yahoo Messenger, Skype và Facebook.</li>
        </ul>
        `;
        url.set("info", "aboutus");

    } else if (info === 'contact') {
        infoContainer.innerHTML = `
        <h2>Thông tin liên hệ</h2>
        <p><strong>Địa chỉ: </strong>273 An Dương Vương Phường 3, Quận 5, TP.HCM</p>
        <p><strong>Số điện thoại: </strong>0388.853.835</p>
        <p><strong>Email: </strong>spoce_bookstore@gmail.com</p>
        `;
        url.set("info", "contact");
    } else if (info === 'warranty') {
        infoContainer.innerHTML = `
        <h2>Thông tin đổi trả</h2>
        <strong><u>1. Thời gian giải quyết đổi trả:</u></strong>
        <table class="footer-info__warranty-table">
            <thead>
                <tr>
                    <th></th>
                    <th><strong>Đơn hàng của quý khách được giao hàng thành công</strong></th>
                    <th><strong>Đơn hàng quý khách chưa được giao thành công</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Thời gian đổi trả</strong></td>
                    <td>-  Trong vòng 05 ngày kể từ ngày Quý khách nhận được hàng đối với khu vực TP HCM và 10 ngày đối với các tỉnh, thành phố khác</td>
                    <td>-  Khi nhận được yêu cầu từ quý khách.</td>
                </tr>
                <tr>
                    <td><strong>Nội dung được giải quyết</strong></td>
                    <td>Theo hiện trạng đơn hàng cần đổi/trả (theo điều kiện đổi trả)</td>
                    <td>
                        <p>Nếu đơn hàng chưa được bàn giao đơn vị vận chuyển à hỗ trợ quý khách đổi mặt hàng khác để phù hợp hơn với nhu cầu của quý khách/hủy đơn hàng.</p>
                        <br>
                        <p>Nếu đơn hàng đã bàn giao đơn vị vận chuyển, chúng tôi sẽ tiếp nhận và liên hệ trao đổi hướng xử lý đến quý khách qua mail/điện thoại.</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <strong><u>2. Điều kiện đổi trả:</u></strong>
        <br>
        <p><strong>Spoce</strong> hỗ trợ đổi/ trả sản phẩm cho quý khách nếu:</p>
        <p>  - Sản phẩm còn nguyên bao bì như hiện trạng ban đầu.</p>
        <p>  - Sản phầm còn đầy đủ phụ kiện, quà tặng khuyến mãi kèm theo.</p>
        <p>  - Hóa đơn GTGT (nếu có).</p>
        <strong>Lưu ý: Không áp dụng đổi / trả / hoàn tiền đối với các Đơn Hàng Sỉ.</strong>
        <br>
        <br>
        <br>
        <strong><u>Các trường hợp đổi trả cụ thể:</u></strong>
        <table class="footer-info__warranty-table">
            <thead>
                <tr>
                    <th></th>
                    <th><strong>Nội dung đổi/ trả sản phẩm</strong></th>
                    <th><strong>Cách thức xử lý</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>1</strong></td>
                    <td>Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung,…)</td>
                    <td>
                        <p>·  Spoce có sản phẩm cùng loại → thực hiện đổi sản phẩm mới cùng loại</p>
                        <p>·  Spoce hết hàng → Hoàn tiền/Quý khách có thể chọn mặt hàng khác tại website</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>2</strong></td>
                    <td>Sản phẩm hỏng do quý khách</td>
                    <td>·  Không hỗ trợ đổi/ trả</td>
                </tr>
                <tr>
                    <td><strong>3</strong></td>
                    <td>Lý do đổi/trả sản phẩm như: khách đặt nhầm hoặc không còn nhu cầu.</td>
                    <td>
                        <p>·  Sản phẩm phải còn nguyên vẹn, không có dấu hiệu đã qua sử dụng, còn đầy đủ phụ kiện và quà tặng kèm (nếu có).</p>
                        <p>·  Hỗ trợ thu hồi và hoàn tiền 100% giá trị sản phẩm cho quý khách hàng.</p>
                        <p><u>Lưu ý:</u> Spoce rất tiếc sẽ không hỗ trợ hoàn lại chi phí vận chuyển trong đơn hàng cho trường hợp này.</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>4</strong></td>
                    <td>Giao nhầm/ giao thiếu ( thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo )</td>
                    <td>
                        <p>·  Giao nhầm → Đổi lại đúng sản phẩm đã đặt.</p>
                        <p>·  Giao thiếu → Giao bù thêm số lượng còn thiếu theo đơn hàng</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>5</strong></td>
                    <td>Hình thức sản phẩm không giống mô tả ban đầu hoặc hàng giao kém chất lượng do vận chuyển</td>
                    <td>
                        <p>Chúng tôi khuyến cáo khách hàng nên kiểm tra sản phẩm và liên hệ chúng tôi trong vòng 48h kể từ thời điểm nhận hàng qua số <strong>Hotline 0388.853.835</strong>, chúng tôi sẵn sàng lắng nghe và giải quyết cho bạn (cụ thể theo từng trường hợp)</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>Phương thức hoàn tiền: Hoàn tiền vào tài khoản điểm của quý khách trong vòng 03 ngày để mua sản phẩm mới. Hoặc hoàn tiền vào tài khoản ngân hàng của Quý khách trong vòng 30 ngày làm việc.</p>
        <br>
        <br>
        <strong><u>3. Cách thức chuyển sản phẩm đổi trả về Spoce</u></strong>
        <br>
        <p>- Tất cả các đơn hàng đổi trả cần được chụp hình và gửi email về spoce_bookstore@gmail.com với tiêu đề “Đổi Trả Đơn Hàng – Mã đơn hàng”:</p>
        <p>- Chụp hình về tình trạng sản phẩm, nêu rõ lỗi kỹ thuật nếu có.</p>
        <p>- Chụp hình về tình trạng bao bì, chú ý các điểm như:</p>
        <p>+ Sách có được bọc màng co hay không?</p>
        <p>+ Hộp có được chèn lót giấy vụn để bảo vệ khi vận chuyển hay không?</p>
        <p>+ Hộp bị ướt …?</p>
        <p>- Khi yêu cầu đổi trả được giải quyết, quý khách vui lòng gửi lại đơn hàng còn nguyên như hiện trạng khi nhận hàng ban đầu (bao gồm sản phẩm, quà tặng, phụ kiện kèm theo sản phẩm, hóa đơn,…nếu có).</p>
        <p><strong><u>Lưu ý:</u></strong> Quý khách vui lòng chịu trách nhiệm về trạng thái nguyên vẹn của sản phẩm khi gửi về Spoce.</p>
        <p>- Sau khi nhận được sản phẩm quý khách gởi về, Spoce sẽ phản hồi và cập nhật thông tin trên từng giai đoạn xử lý đến quý khách qua điện thoại/email .</p>
        `;
        url.set("info", "warranty");
    } else if (info === "security") {
        infoContainer.innerHTML = `
        <h2>Thông tin bảo mật</h2>
        <h1>I. CHÍNH SÁCH BẢO MẬT THÔNG TIN CÁ NHÂN</h1>
        <p>Chính sách này áp dụng cho các thông tin cá nhân của các quý khách hàng Spoce được thông qua thông tin đăng ký tài khoản của khách hàng khai báo trên website.</p>
        <h1>1. Mục đích và phạm vi thu thập thông tin của khách hàng</h1>
        <p>Spoce không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác.</p>
        <p>Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty, khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà Spoce thu thập bao gồm:</p>
        <ul>
            <li>Họ và tên</li>
            <li>Địa chỉ</li>
            <li>Điện thoại</li>
            <li>Email</li>
        </ul>

        <p>Ngoài thông tin cá nhân là các thông tin về dịch vụ</p>
        <ul>
            <li>Tên sản phẩm</li>
            <li>Số lượng</li>
            <li>Thời gian giao nhận sản phẩm</li>
        </ul>
        <h1>2. Phạm vi sử dụng thông tin</h1>
        <p>Thông tin cá nhân thu thập được sẽ chỉ được Spoce sử dụng trong nội bộ công ty và cho một hoặc tất cả các mục đích sau đây:</p>
        <p>– Hỗ trợ khách hàng</p>
        <p>– Cung cấp thông tin liên quan đến dịch vụ</p>
        <p>– Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo yêu cầu của bạn</p>
        <p>– Chúng tôi có thể sẽ gửi thông tin sản phẩm, dịch vụ mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu quý khách đăng kí nhận email thông báo.</p>
        <p>– Ngoài ra, chúng tôi sẽ sử dụng thông tin bạn cung cấp để hỗ trợ quản lý tài khoản khách hàng; xác nhận và thực hiện các giao dịch tài chính liên quan đến các khoản thanh toán trực tuyến của bạn</p>

        <h1>3. Spoce lưu trữ thông tin khách hàng trong bao lâu</h1>
        <p>Đối với thông tin cá nhân, Spoce chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu, khách hàng yêu cầu gửi mail về spoce_bookstore@gmail.com</p>
        
        <h1>4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân</h1>
        <p>Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:</p>
        <p>– CÔNG TY CỔ PHẦN TMDV SPOCE GROUP</p>

        <h1>5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h1>
        <p>Spoce không thu thập thông tin khách hàng qua trang web, thông tin cá nhân khách hàng được thực hiện thu thập qua email liên hệ đặt mua sản phẩm, dịch vụ gửi về hộp mail của chúng tôi: spoce_bookstore@gmail.com hoặc số điện thoại liên hệ đặt mua sản phẩm gọi về 0388.853.835</p>
        <p>Bạn có thể liên hệ địa chỉ email cùng số điện thoại trên để yêu cầu SPOCE chỉnh sửa dữ liệu cá nhân của mình.</p>

        <h1>6. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo.</h1>
        <p>Tại Spoce , việc bảo vệ thông tin cá nhân của bạn là rất quan trọng, bạn được đảm bảo rằng thông tin cung cấp cho chúng tôi sẽ được mật Spoce cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ người nào khác. Spoce cam kết chỉ sử dụng các thông tin của bạn vào các trường hợp sau:</p>
        <p>– Nâng cao chất lượng dịch vụ dành cho khách hàng</p>
        <p>– Giải quyết các tranh chấp, khiếu nại</p>
        <p>– Khi cơ quan pháp luật có yêu cầu.</p>
        <p>Spoce hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá nhân cũng chính là trách nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật của Spoce và liên quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã thông báo vui lòng liên hệ qua số hotline 0388.853.835 hoặc email: spoce_bookstore@gmail.com</p>


        <h1>II. CHÍNH SÁCH BẢO MẬT THÔNG TIN THANH TOÁN</h1>
        <h1>1. Cam kết bảo mật</h1>
        <p>Hệ thống thanh toán thẻ được cung cấp bởi các đối tác cổng thanh toán (“Đối Tác Cổng Thanh Toán”) đã được cấp phép hoạt động hợp pháp tại Việt Nam. Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ tại Spoce đảm bảo tuân thủ theo các tiêu chuẩn bảo mật ngành.</p>
        
        <h1>2 Quy định bảo mật</h1>
        <p>     - Chính sách giao dịch thanh toán bằng thẻ quốc tế và thẻ nội địa (internet banking) đảm bảo tuân thủ các tiêu chuẩn bảo mật của các Đối Tác Cổng Thanh Toán gồm:</p>
        <p>• Thông tin tài chính của Khách hàng sẽ được bảo vệ trong suốt quá trình giao dịch bằng giao thức SSL (Secure Sockets Layer).</p>
        <p>• Chứng nhận tiêu chuẩn bảo mật dữ liệu thông tin thanh toán (PCI DSS) do Trustwave cung cấp.</p>
        <p>• Mật khẩu sử dụng một lần (OTP) được gửi qua SMS để đảm bảo việc truy cập tài khoản được xác thực.</p>
        <p>• Tiêu chuẩn mã hóa MD5 128 bit.</p>
        <p>• Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của Ngân hàng nhà nước Việt Nam.</p>
        <p>     - Chính sách bảo mật giao dịch trong thanh toán của Spoce áp dụng với Khách hàng:</p>
        <p>• Spoce cung cấp tiện ích lưu giữ token - chỉ lưu chuỗi đã được mã hóa bởi Đối Tác Cổng Thanh Toán cung cấp cho Spoce. Spoce không trực tiếp lưu trữ thông tin thẻ khách hàng. Việc bảo mật thông tin thẻ thanh toán Khách hàng được thực hiện bởi Đối Tác Cổng Thanh Toán đã được cấp phép.</p>
        <p>• Đối với thẻ quốc tế: thông tin thẻ thanh toán của Khách hàng mà có khả năng sử dụng để xác lập giao dịch không được lưu trên hệ thống của Spoce . Đối Tác Cổng Thanh Toán sẽ lưu trữ và bảo mật.</p>
        <p>• Đối với thẻ nội địa (internet banking), Spoce chỉ lưu trữ mã đơn hàng, mã giao dịch và tên ngân hàng.</p>
        <p>Spoce cam kết đảm bảo thực hiện nghiêm túc các biện pháp bảo mật cần thiết cho mọi hoạt động thanh toán thực hiện trên sàn giao dịch thương mại điện tử Spoce.</p>
        `;
        url.set("info", "security");
    } else if (info === 'howto') {
        infoContainer.innerHTML = `
        <h2>Hướng dẫn mua hàng</h2>
        <h1>1.  Chọn sản phẩm cần mua.</h1>
        <p>o  Khách hàng lựa chọn xem sản phẩm cần mua, hệ thống Spoce cung cấp cho khách hàng các thông tin chi tiết nhất liên quan đến cuốn sách khách hàng quan tâm để có sự lựa chọn tốt nhất. Ngoài ra hệ thống Spoce còn cho phép khách hàng xem trước trích đoạn của sách.</p>
        <img src="public/images/howto/howto1.png" alt="howto1">
        <p>o  Sau khi xem xong các thông tin của sách, khách hàng nhấn vào nút "MUA NGAY" để mua sách.</p>
        <h1>2.  Kiểm tra giỏ hàng.</h1>
        <p>o  Khách hàng nhấn vào mục giỏ hàng sẽ hiện ra danh sách sản phẩm trong giỏ hàng.</p>
        <img src="public/images/howto/howto2.png" alt="howto2">
        <p>o  Khách hàng nhấn nút "Xem Giỏ Hàng" để thực hiện bước kế tiếp.</p>
        <p>o  Tại trang giỏ hàng, khách hàng có thể thêm, bớt hoặc bỏ sản phẩm ra khỏi giỏ hàng trước khi thanh toán.</p>
        <img src="public/images/howto/howto3.png" alt="howto3">
        <p>o  Khách hàng nhấn nút "Thanh Toán" để thực hiện bước kế tiếp.</p>
        <p>o  Nếu khách hàng chưa đăng nhập hệ thống Spoce sẽ hiện trang yêu cầu đăng nhập.</p>
        <p>o  Nếu khách hàng chưa có tài khoản trên hệ thống Spoce Book Store, khách hàng có thể đăng ký tài khoản trên hệ thống.</p>
        <h1>3.  Cung cấp thông tin giao hàng và lựa chọn dịch vụ kèm theo:</h1>
        <p>o  Khách hàng điền địa chỉ giao hàng đầy đủ.</p>
        <img src="public/images/howto/howto4.png" alt="howto4">
        <p>o  Khách hàng có thể tham khảo mục ghi chú ở dưới phương thức thanh toán để lựa chọn phương thức thanh toán phù hợp và tiện lợi nhất.</p>\
        <p>o Tại bước này, khách hàng có thể nhập mã giảm giá (nếu có) để được giảm giá thêm</p>
        <p>o  Quý khách kiểm tra lại "Địa chỉ thanh toán", "Địa chỉ giao hàng", "Số tiền trên đơn hàng", nếu các thông tin đã khớp xin vui lòng nhấn nút "Thanh toán" để xác nhận đặt hàng.</p>
        <p>o  Hệ thống Spoce sẽ thông báo quý khách số đơn hàng đồng thời gửi Email xác nhận đơn hàng và Email mà quý khách dùng đăng ký</p>
        `;
        url.set("info", "howto");
    } else if (info === 'shipment') {
        infoContainer.innerHTML = `
        <h2>Phương thức vận chuyển</h2>
        <h1>Miễn Phí Vận Chuyển</h1>
        <ul>
            <li>Áp dụng đơn hàng tại nội thành Hồ Chí Minh và nội thành Hà Nội giá trị từ 150.000 VNĐ. Thời gian nhận hàng từ 1-3 ngày làm việc (nội thành Hồ chí Minh), 3-7 ngày làm việc (ngoại thành Hồ Chí Minh và Hà Nội) kể từ ngày có đủ sách.</li>
            <li>Áp dụng đơn hàng tại ngoại thành Hồ Chí Minh,Hà Nội và tỉnh thành khác giá trị từ 250.000 VNĐ. Thời gian nhận hàng từ 3-7 ngày làm việc theo quy định về thời gian giao hàng của bưu điện.</li>
        </ul>
        <p>* Các quận nội thành Hồ Chí Minh: 1, 2, 3,  4, 5, 6, 7, 8, 10, 11, 12, Tân Bình, Tân Phú, Phú Nhuận, Bình Tân, Bình Thạnh</p>
        <p>* Các quận nội thành Hà Nội: Đống Đa, Thanh Xuân, Tây Hồ, Hoàng Mai, Hoàng Kiếm, Hai Bà Trưng, Cầu Giấy, Ba Đình</p>

        <h1>Giao hàng nhanh chóng và bảo đảm</h1>
        <p> 1. Trách nhiệm xử lý đơn hàng và vận chuyển sản phẩm đến khách hàng do Spoce đảm nhận và phụ thuộc vào hình thức thanh toán và vận chuyển cho các sản phẩm mà khách hàng khai báo khi tạo đơn hàng.</p>
        <p> 2. Spoce sẽ chịu trách nhiệm đảm bảo khách hàng nhận được hàng hóa đúng như đã đặt mua trong thời gian giao hàng như cam kết. Trường hợp hàng hóa bị lỗi, hư hại trong quá trình vận chuyển, Spoce sẽ chấp nhận việc đổi hàng mới cho khách.</p>
        <p> 3. Trong trường hợp khách hàng tự ý hủy đơn hàng hoặc đơn hàng hoàn thành nhưng không giao cho khách hàng được vì lý do thông tin liên lạc không chính xác, Spoce sẽ hủy đơn hàng đó.</p>
        <p> 4. Với những đơn hàng trả tiền trước như:</p>
        <p> - Thanh toán bằng thẻ ATM</p>
        <p> - Chuyển tiền Western Union</p>
        <p> - Chuyển khoản ngân hàng</p>
        <p> Spoce sẽ xác nhận và tiến hành gởi hàng đi sau khi nhận được thanh toán từ phía quý khách. Vì vậy để sớm nhận được hàng, quý khách vui lòng tiến hành thủ tục chuyển tiền sớm.</p>
        <p> 5. Trong trường hợp vì lý do bất khả kháng, thời gian giao hàng bị chậm so với thời gian quy định, Spoce sẽ thông báo đến khách hàng. Trong trường hợp khách hàng muốn hủy đơn hàng, Spoce sẽ hoàn trả tiền lại cho khách hàng (nếu đã thanh toán trước)</p>

        <h1>Giao hàng trong nước</h1>
        <strong>1. Chuyển tận nơi trong nội thành TP. HCM:</strong>
        <p>Nhân viên giao hàng của Spoce sẽ giao hàng tận nơi trong nội thành TP. Hồ Chí Minh từ 1-3 ngày làm việc kể từ ngày có đủ sách.</p>
        <strong>2. Chuyển thường qua bưu điện:</strong>
        <p>Hàng hóa được gởi theo đường bưu điện. Với cách này, quý khách sẽ nhận được hàng trong khoảng thời gian từ 3 đến 7 ngày.</p>

        <h1>Giao hàng quốc tế</h1>
        <strong>1. Chuyển phát nhanh DHL:</strong>
        <p>Hàng hoá được vận chuyển nhanh thông qua nhà cung cấp dịch vụ DHL. Với cách gởi này, quý khách sẽ nhận được hàng tận nhà trong khoảng từ 3 đến 5 ngày.</p>
        <strong>2. Chuyển thường bằng máy bay:</strong>
        <p>Hàng hoá được gởi thông qua bưu điện, vận chuyển bằng máy bay. Thời gian quý khách nhận được hàng khoảng từ 10 đến 20 ngày</p>


        <h1>Chi phí vận chuyển</h1>
        <strong>1. Vận chuyển trong nước: (áp dụng từ ngày 1/1/2018)</strong>
        <table class="footer-info__warranty-table max-width">
            <thead>
                <tr>
                    <th><strong>Khu vực</strong></th>
                    <th><strong>Phí vận chuyển</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nội thành Hồ Chí Minh và Hà Nội (ĐH trên 150.000VNĐ)</td>
                    <td>Miễn Phí</td>
                </tr>
                <tr>
                    <td>Nội Hồ Chí Minh và Hà Nội (ĐH dưới 150.000VNĐ)</td>
                    <td>20.000 VNĐ/ĐH</td>
                </tr>
                <tr>
                    <td>Ngoại thành Hồ Chí Minh, Hà Nội và các Tỉnh thành khác (ĐH trên 250.000VNĐ)</td>
                    <td>Miễn Phí</td>
                </tr>
                <tr>
                    <td>Ngoại thành Hồ Chí Minh, Hà Nội và các Tỉnh thành khác (ĐH dưới 250.000VNĐ)</td>
                    <td>	33.000VNĐ/ĐH</td>
                </tr>
            </tbody>
        </table>

        <strong>2. Vận chuyển ngoài nước</strong>
        <p>a. Chuyển phát nhanh</p>
        <table class="footer-info__warranty-table max-width">
            <thead>
                <tr>
                    <th><strong>Trọng lượng (gram)</strong></th>
                    <th><strong>Norway</strong></th>
                    <th><strong>Các nước khác</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Dưới - 500</strong></td>
                    <td>1.700.000 VND</td>
                    <td>1.400.000 VND</td>
                </tr>
                <tr>
                    <td><strong>501 - 1.000</strong></td>
                    <td>2.100.000 VND</td>
                    <td>1.700.000 VND</td>
                </tr>
                <tr>
                    <td><strong>1.001- 2.000</strong></td>
                    <td>Mỗi 500 gram tiếp theo thêm 400.000 VND</td>
                    <td>Mỗi 500 gram tiếp theo thêm 300.000 VND</td>
                </tr>
                <tr>
                    <td><strong>10.001 - 20.000</strong></td>
                    <td>Mỗi 500 gram tiếp theo thêm 300.000 VND</td>
                    <td>Mỗi 500 gram tiếp theo thêm 150.000 VND</td>
                </tr>
                <tr>
                    <td><strong>20.001 - 30.000</strong></td>
                    <td>Mỗi 500 gram tiếp theo thêm 350.000 VND</td>
                    <td>Mỗi 500 gram tiếp theo thêm 170.000 VND</td>
                </tr>
                <tr>
                    <td><strong>Trên 30.000</strong></td>
                    <td>900.000 VND * Số kg</td>
                    <td>650.000 VND * Số kg</td>
                </tr>
            </tbody>
        </table>

        <p>b. Chuyển thường bằng máy bay</p>
        <table class="footer-info__warranty-table max-width">
            <thead>
                <tr>
                    <th><strong>Trọng lượng (gram)</strong></th>
                    <th><strong>Máy bay (Air mail)</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Dưới - 500</strong></td>
                    <td>500.000 VND</td>
                </tr>
                <tr>
                    <td><strong>501 - 1.000</strong></td>
                    <td>934.000 VND</td>
                </tr>
                <tr>
                    <td><strong>1.001- 2.000</strong></td>
                    <td>Mỗi 500 gram tiếp theo thêm 134.000 VND</td>
                </tr>
            </tbody>
        </table>
        <p>* SPOCE chịu trách nhiệm cung cấp chứng từ và hóa đơn trong quá trình giao nhận</p>
        `;
        url.set("info", "shipment");
    } else if (info === 'payment') {
        infoContainer.innerHTML = `
        <h2>Phương thức thanh toán</h2>
        <p>Nhằm đảm bảo tính tiện lợi trong việc thanh toán, Spoce hỗ trợ khách hàng thanh toán qua thẻ ATM và thẻ Visa. Quý khách đọc kỹ hướng dẫn sử dụng bên dưới nhằm đảm bảo tính chính xác khi thanh toán.</p>
        <h1>1. Thanh toán qua thẻ ATM</h1>
        <ul>
            <li>Quý khách có thẻ ATM do các ngân hàng sau phát hành và đã đăng ký dịch vụ Internet Banking, có thể thực hiện thanh toán ngay mà không bị tốn thêm khoản phí, đơn hàng sẽ được ưu tiên xử lý trước:</li>
            <img src="public/images/banklist.png" alt="banklist">
            <li>Để thanh toán bằng thẻ ATM đã đăng ký dịch vụ Internet Banking, quý khách vui lòng chọn hình thức Thanh toán bằng thẻ ATM (miễn phí thanh toán)</li>
            <li>Tiến hành đặt hàng</li>
            <li><strong>Quý khách lưu ý</strong></li>
            <ul>
                <li>Chỉ chấp nhận thanh toán các thẻ ATM do các ngân hàng trên phát hành và đã đăng ký dịch vụ Internet Banking với ngân hàng</li>
                <li>Trong một số rất ít trường hợp khi tài khoản quý khách đã bị trừ tiền nhưng hệ thống vẫn thông báo thanh toán chưa thành công do có sự gián đoạn thông tin giữa ngân hàng, cổng thanh toán và Spoce, quý khách vui lòng liên hệ với tổng đài Spoce 0388.853.835 hoặc email: spoce_bookstore@gmail.com để được hỗ trợ. Trong đa số các trường hợp, Spoce sẽ xác thanh toán của nhận đơn hàng sau khi kiểm tra lại với ngân hàng, một số trường hợp khác số tiền quý khách đã thanh toán sẽ được hoàn lại vào chính tài khoản thanh toán.</li>
            </ul>
        </ul>
        <h1>2. Thanh toán qua thẻ Visa/Master Card</h1>
        <p>Spoce hỗ trợ khách hàng thanh toán đơn hàng bằng thẻ Visa hoặc Master Card thông qua cổng thanh toán trực tuyến OnePay đảm bảo thanh toán an toàn và tiện lợi cho khách hàng. Các loại thẻ thanh toán được chấp nhận thanh toán tại Spoce bằng tiền đồng Việt Nam:</p>
        <ul>
            <li>Thẻ thanh toán có biểu tượng VISA</li>
            <li>Thẻ thanh toán có biểu tượng MasterCard</li>
        </ul>

        <h1>3. Quý khách lưu ý:</h1>
        <p>Spoce không chấp nhận thẻ ảo (Virtual card), thẻ sử dụng 1 lần (single use card), thẻ nặc danh (thẻ không in tên) và có quyền từ chối cung cấp dịch vụ nếu khách hàng sử dụng các loại thẻ này.</p>
        <p>Trong một số trường hợp để đảm bảo tính an ninh, bộ phận chăm sóc khách hàng có thể yêu cầu quý khách xác thực chủ thẻ bằng cách yêu cầu chủ thẻ cung cấp thông tin hình ảnh thẻ thật được chụp hình mặt trước và mặt sau (có che đi các thông tin bảo mật) và giấy tờ tùy thân của chủ thẻ (hộ chiếu/CMND). Nếu không xác thực thẻ theo yêu cầu, quý khách sẽ bị từ chối đặt hàng.</p>
        <p>Trong trường hợp quý khách đã thanh toán, ngân hàng đã thông báo trừ tiền vào thẻ hoặc ghi nợ vào thẻ, nhưng Spoce vẫn thông báo giao dịch không thành công, vui lòng liên hệ với tổng đài Spoce 0388.853.835 hoặc email spoce_bookstore@gmail.com để được hỗ trợ.</p>
        <p>Trong trường hợp cần hoàn tiền vào tài khoản quý khách (do đơn hàng lỗi, thanh toán không được, hủy đơn hàng…), quý khách sẽ được hoàn lại số tiền của các dịch vụ chưa được sử dụng vào chính tài khoản thẻ dùng để thanh toán. Thời gian hệ thống ngân hàng ghi có vào tài khoản quý khách từ 15-45 ngày làm việc tùy vào ngân hàng phát hành thẻ, kể từ khi Spoce nhận được yêu cầu.</p>
        <p>Spoce không cam kết việc sách sẽ được giữ cho đơn hàng của quý khách sau 1 ngày kể từ ngày đặt hàng mà Spoce vẫn chưa nhận được thanh toán chuyển khoản.</p>
        <p>Để việc xử lý đơn hàng quý khách được nhanh chóng và chính xác, vui lòng ghi rõ 2 thông tin sau khi chuyển khoản (trong phần mô tả/nội dung): số điện thoại đặt hàng và mã số đơn hàng. Trường hợp chuyển khoản tại máy ATM, không thể ghi vào ghi chú, quý khách vui lòng thông báo qua email hoặc hotline Spoce về giao dịch để được xử lý đơn hàng nhanh chóng.</p>
        <p>Spoce không thu phí xử lý dịch vụ cho hình thức thanh toán này, tuy nhiên quý khách có thể bị ngân hàng thu một khoản phí chuyển khoản liên ngân hàng, liên tỉnh hoặc phí giao dịch tại quầy theo biểu phí ngân hàng.</p>
        <p>Spoce khuyến khích quý khách có thẻ ATM, có thể đăng ký dịch vụ Internet Banking với ngân hàng phát hành thẻ để thanh toán trực tuyến tức thời, tiện lợi, không tốn phí, không cần ra ngân hàng hay ATM và đơn hàng luôn được ưu tiên xử lý trước.</p>


        <h1>4. Chuyển khoản qua ngân hàng</h1>
        <p>Quý khách vui lòng đến ngân hàng hoặc trụ ATM để chuyển tiền cho Spoce vào một trong các tài khoản dưới đây:</p>
        <ul>
            <li>Tài khoản Vietcombank: <strong>1013999802</strong> - Chủ TK: CTY CP TMDV SPOCE GROUP - Chi Nhánh Sài Gòn.</li>
        </ul>
        <p>Sau khi chuyển tiền, quí khách vui lòng gửi mail về địa chỉ <strong>spoce_bookstore@gmail.com</strong> thông báo việc chuyển tiền và số tài khoản của quí khách để tiện trong việc kiểm tra.</p>
        <p>Trong trường hợp cần hỗ trợ trực tuyến quý khách vui lòng gọi về số <strong>0388.853.835</strong>, bộ phận chăm sóc của Spoce sẽ hỗ trợ quý khách.</p>

        
        <h1>4. Spoce giao hàng thu tiền tận nơi tại TP.HCM, Hà Nội</h1>
        <p>Nhân viên của Spoce sẽ thu tiền quý khách (miễn phí dịch vụ) lúc giao hàng tận nơi tại các phường, quận nội thành TP.HCM và Hà Nội.</p>
        <p>Quý khách lưu ý trong trường hợp quý khách đi vắng không thể nhận hàng, quý khách vui lòng ủy thác cho người khác nhận hàng và thanh toán thay.</p>
        <p><strong><u>Lưu ý:</u></strong> hình thức thu phí này chỉ áp dụng khi người thanh toán và người nhận hàng là một người, trong trường hợp địa chỉ thanh toán khác với địa chỉ giao hàng, vui lòng thanh toán trước cho đơn hàng.</p>
        `;
        url.set("info", "payment");
    }
    scrollToTop();
    hideLoading();
    setTimeout(() => {
        history.pushState(null, '', window.location.pathname + "?" + url.toString());
    }, 500);
}

document.querySelector('.footer__aboutus').addEventListener('click', function () {
    showFooterInfo('aboutus');
});

document.querySelector('.footer__contact').addEventListener('click', function () {
    showFooterInfo('contact');
});

document.querySelector('.footer__warranty').addEventListener('click', function () {
    showFooterInfo('warranty');
});

document.querySelector('.footer__security').addEventListener('click', function () {
    showFooterInfo('security');
});

document.querySelector('.footer__howto').addEventListener('click', function () {
    showFooterInfo('howto');
});

document.querySelector('.footer__shipment').addEventListener('click', function () {
    showFooterInfo('shipment');
});

document.querySelector('.footer__payment').addEventListener('click', function () {
    showFooterInfo('payment');
});

function hideMainPage() {
    const main = document.querySelector('.main');
    const body = document.querySelector('.body');
    const checkout = document.querySelector('.checkout');
    const menu = document.querySelector('.topbar__auth-list');
    const selfinformation = document.querySelector('.self-infomation');
    const mainCart = document.querySelector('.show-cart');
    const order = document.querySelector('.order-history');
    const categoryMenu = document.querySelector('.menu-container');

    if (!main.classList.contains('hide-item')) {
        main.classList.add('hide-item');
    }

    if (!body.classList.contains('hide-item')) {
        body.classList.add('hide-item');
    }

    if (!checkout.classList.contains('hide-item')) {
        checkout.classList.add('hide-item');
    }

    if (!selfinformation.classList.contains('hide-item')) {
        selfinformation.classList.add('hide-item');
    }

    if (!mainCart.classList.contains('hide-item')) {
        mainCart.classList.add('hide-item');
    }

    if (!order.classList.contains('hide-item')) {
        order.classList.add('hide-item');
    }

    if (!categoryMenu.classList.contains('hide-item')) {
        categoryMenu.classList.add('hide-item');
    }
}

export function scrollToTop() {
    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth'
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
    const url = new URLSearchParams(window.location.search);
    const footer = document.querySelector('.footer-info');
    if (url.has("info")) {
        showFooterInfo(url.get("info"));
    } else {
        if (!footer.classList.contains('hide-item')) {
            footer.classList.add('hide-item');
        }
    }
});