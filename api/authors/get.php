<?php
require_once __DIR__ . '../../../app/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function returnJSONAuthor($authors) {
    if (!$authors) {
        echo json_encode(["error" => "Không tìm thấy tác giả"]);
        exit();
    }
    if (!isset($authors[0])) {
        $authors = [$authors];
    }

    $response = [];

    foreach ($authors as $author) {
        $response[] = [
            "id" => $author['maTacGia'],
            "name" => $author['tenTacGia'],
            "status" => $author['trangThai'],
            "updatedAt" => $author['ngayCapNhat']
        ];
    }
    echo json_encode($response);
}

$author_model = new app_models_TacGia();

$id = isset($_GET['authorId']) ? $_GET['authorId'] : '';
$name = isset($_GET['authorName']) ? $_GET['authorName'] : '';
$status = isset($_GET['authorStatus']) ? $_GET['authorStatus'] : '';

$authors = $author_model->getAuthorByFilter($id, $name, $status);
// $authors = $author_model->getAllAuthors();

returnJSONAuthor($authors);
?>
