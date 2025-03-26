<?php

/** Xây dựng class kết nối tới cơ sở dữ liệu
 * @Author: Nguyễn Nam Dương
 * Version: 0.0.1
 * Date: 13-02-2025
 */


class app_libs_DBConnection
{
    protected $dsn = "mysql:host=128.199.154.64;port=3306;dbname=bookStore;charset=utf8";
    protected $username = "bookStore";
    protected $password = "bookStoreWeb";

    protected $table_name = 'default_table';
    // Mảng lưu trữ các param được dùng để truy vấn
    protected $queryParam = [];

    protected static $connection = null;

    public function open_connect()
    {
        if (self::$connection == null) {
            try {
                self::$connection = new PDO($this->dsn, $this->username, $this->password);
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (Exception $exception) {
                echo "Lỗi khi kết nối cơ sở dữ liệu: " . $exception->getMessage() . "<br>";
            }
        }
        return self::$connection;
    }

    public function close_connect()
    {
        self::$connection = null;
    }

    // Hàm xây dựng các param
    public function building_queryParam($params = [])
    {
        $default = [
            'select' => '*',
            'where' => '',
            'other' => '',
            'params' => '',
            'field' => '',
            'value' => ''
        ];
        // Gộp 2 mảng theo key (nhận value theo key) mảng params đằng sau sẽ ghi đè lại theo key
        $this->queryParam = array_merge($default, $params);
        // Trả về để được sử dụng tiếp
        return $this;
    }

    public function building_condition($condition)
    {
        return !empty($condition) ? 'WHERE ' . $condition : '';
    }


    /** Xây dựng các hàm dùng để truy vấn dữ liệu
     * Nên truyền mảng param vào để tránh SQL Injection (Tiêm SQL)
     * Mọi người cập nhật ghi chú ở đây nhé
     */

    public function query($sql, $param = [])
    {
        if (self::$connection == null) self::$connection = $this->open_connect();
        // echo '<pre>';
        // print_r($param);
        // echo '</pre>';
        // die();
        // params là array


        $query = self::$connection->prepare($sql);
        $query->execute(is_array($param) ? $param : []);
        return $query;
    }

    public function select()
    {
        if (self::$connection == null) self::$connection = $this->open_connect();

        $sql = 'SELECT ' . $this->queryParam['select'] . ' FROM ' . $this->table_name;

        $sql .= ' ' . $this->building_condition($this->queryParam['where']);

        if (!empty($this->queryParam['other'])) {
            $sql .= ' ' . $this->queryParam['other'];
        }

        $query = $this->query($sql, $this->queryParam['params']);

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }



    public function select_one()
    {
        if (self::$connection == null) self::$connection = $this->open_connect();

        $this->queryParam['other'] = 'LIMIT 1';
        $data = $this->select();

        return $data ? $data[0] : [];
    }

    public function insert()
    {
        if (self::$connection == null) self::$connection = $this->open_connect();

        $fields = array_keys($this->queryParam['field']);
        $placeholders = array_fill(0, count($fields), '?');

        $sql = 'INSERT INTO ' . $this->table_name . ' (' . implode(', ', $fields) . ') VALUES (' . implode(', ', $placeholders) . ')';

        $this->query($sql, array_values($this->queryParam['field']));
        return self::$connection->lastInsertId();
    }
    public function update()
    {
        if (self::$connection == null) self::$connection = $this->open_connect();

        $fieldValues = [];
        $params = [];
        foreach ($this->queryParam['value'] as $field => $value) {
            $fieldValues[] = "$field = :$field";
            $params[":$field"] = $value;
        }

        $sql = 'UPDATE ' . $this->table_name . ' SET ' . implode(', ', $fieldValues) . ' ' .
            $this->building_condition($this->queryParam['where']) . ' ' . $this->queryParam['other'];

        return $this->query($sql, $params);
    }

    public function delete()
    {
        if (self::$connection == null) self::$connection = $this->open_connect();

        $sql = 'DELETE FROM ' . $this->table_name . ' ' .
            $this->building_condition($this->queryParam['where']) . ' ' . $this->queryParam['other'];

        return $this->query($sql, []);
    }

    
    // ===============================================================

    public function joinTables($tables = [], $joins = [], $conditions = [], $orderBy = '', $orderType = 'ASC', $limit = null, $offset = null, $params = [], $columns = ['*']) {
        if (self::$connection == null) self::$connection = $this->open_connect();
    
        if (empty($tables) || empty($joins)) {
            return ["error" => "Thiếu thông tin bảng hoặc điều kiện JOIN"];
        }
    
        $columnList = is_array($columns) ? implode(", ", $columns) : '*';

        $sql = "SELECT $columnList FROM " . array_shift($tables);
    
        foreach ($tables as $index => $table) {
            if (!isset($joins[$index])) {
                return ["error" => "Thiếu điều kiện JOIN cho bảng " . $table];
            }
            $sql .= " INNER JOIN $table ON " . $joins[$index];
        }
    
        // Thêm điều kiện WHERE nếu có
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }
    
        // Thêm ORDER BY nếu có
        if (!empty($orderBy)) {
            $sql .= " ORDER BY $orderBy $orderType";
        }
    
        // Thêm LIMIT và OFFSET nếu có
        if (!is_null($limit)) {
            $sql .= " LIMIT :limit";
            if (!is_null($offset)) {
                $sql .= " OFFSET :offset";
            }
        }
    
    
        try {
            $stmt = self::$connection->prepare($sql);
    
            // Bind các tham số tránh SQL Injection
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value, is_numeric($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
            }
    
            // Bind limit và offset nếu có
            if (!is_null($limit)) {
                $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            }
            if (!is_null($offset)) {
                $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
            }
    
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => "Lỗi SQL: " . $e->getMessage()];
        }
    }
}
