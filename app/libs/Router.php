<?php
class app_libs_Router {
    /** HTTP: http://example.com/path/to/page?query=123
         * URL là nó sẽ lấy cả tên miền
         * URI nó chỉ lấy sau tên miền /path/to/page?query=123
    */

    private $routes = [];

    // Đăng ký route
    public function addRoute($path, $callback) {
        $this->routes[$path] = $callback;
    }

    // Xử lý điều hướng
    public function handleRequest() {
        $requestUri = strtok($_SERVER['REQUEST_URI'], '?'); // Bỏ query string (?xyz=abc)

        $staticExtensions = ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'ttf', 'eot'];

        $fileExtension = pathinfo($requestUri, PATHINFO_EXTENSION);

        if (in_array($fileExtension, $staticExtensions)) {
            return false; // Để web server xử lý file tĩnh
        }

        // Kiểm tra xem request có khớp với route nào không
        foreach ($this->routes as $path => $callback) {
            if ($requestUri === $path) {
                if (is_callable($callback)) {
                    call_user_func($callback);
                } else {
                    throw new Exception("Callback is not callable.");
                }
                return;
            }
        }

        // Mặc định điều hướng vào public/index.php
        require __DIR__ . '/public/index.php';
    }
}