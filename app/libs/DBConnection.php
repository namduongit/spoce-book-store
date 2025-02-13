<?php

/** Xây dựng class kết nối tới cơ sở dữ liệu
 * @Author: Nguyễn Nam Dương
 * Version: 0.0.1
 * Date: 13-02-2025
 */

class app_libs_DBConnection {
    protected $server_name;
    protected $host;
    protected $port;
    protected $database_name;
    protected $username;
    protected $password;

    protected $table_name = 'building';

    protected static $connection = null;

    // Mảng lưu trữ các param được dùng để truy vấn
    protected $queryParam = [];

    public function __construct(
        $server_name = "",
        $host = "",
        $database_name = "",
        $username = "",
        $password = "",
        $port = null
    ) {
        $this->server_name = $server_name;
        $this->host = $host;
        $this->database_name = $database_name;
        $this->username = $username;
        $this->password = $password;
        $this->port = $port;
    }

    public function open_connect() {
        if (self::$connection == null) {
            try {
                $port_part = !empty($this->port) ? ";port={$this->port}" : "";

                switch (strtolower($this->server_name)) {
                    case "mysql":
                        $dsn = "mysql:host={$this->host}{$port_part};dbname={$this->database_name};charset=utf8";
                        break;

                    case "sqlsrv":
                        $dsn = "sqlsrv:Server={$this->host}{$port_part};Database={$this->database_name}";
                        break;

                    case "pgsql":
                        $dsn = "pgsql:host={$this->host}{$port_part};dbname={$this->database_name}";
                        break;

                    case "sqlite":
                        $dsn = "sqlite:{$this->database_name}";
                        break;

                    default:
                        throw new Exception("Hệ quản trị cơ sở dữ liệu không được hỗ trợ: {$this->server_name}");
                }

                self::$connection = new PDO($dsn, $this->username, $this->password);
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (Exception $exception) {
                echo "Lỗi khi kết nối cơ sở dữ liệu: " . $exception->getMessage() . "<br>";
            }
        }
        return self::$connection;
    }

    public function close_connect() {
        self::$connection = null;
    }

    // Hàm xây dựng các param
    public function building_queryParam($params = []) {
        $default = [
            'select' => '*',
            'where' => '',
            'other' => '',
            'params' => '',
            'field' => '',
        ];
        // Gộp 2 mảng theo key (nhận value theo key) mảng params đằng sau sẽ ghi đè lại theo key
        $this->queryParam = array_merge($default, $params);
        // Trả về để được sử dụng tiếp
        return $this;
    }

    public function building_condition($condition) {
        return !empty($condition) ? 'WHERE ' . $condition : '';
    }


    /** Xây dựng các hàm dùng để truy vấn dữ liệu
     * Nên truyền mảng param vào để tránh SQL Injection (Tiêm SQL)
     * Mọi người cập nhật ghi chú ở đây nhé
     */

     public function query($sql, $param = []) {
        $query = self::$connection->prepare($sql);
        $query->execute(is_array($param) ? $param : []);
        return $query;
    }

    public function select() {
        $sql = 'SELECT ' . $this->queryParam['select'] . ' FROM ' . $this->table_name;

        $sql .= ' ' . $this->building_condition($this->queryParam['where']);

        if (!empty($this->queryParam['other'])) {
            $sql .= ' ' . $this->queryParam['other'];
        }

        $query = $this->query($sql, $this->queryParam['params']);

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }



    public function select_one() {
        $this->queryParam['other'] = 'LIMIT 1';
        $data = $this->select();

        return $data ? $data[0] : [];
    }

    public function insert() {
        $fields = array_keys($this->queryParam['field']);
        $placeholders = array_fill(0, count($fields), '?');

        $sql = 'INSERT INTO ' . $this->table_name . ' (' . implode(', ', $fields) . ') VALUES (' . implode(', ', $placeholders) . ')';

        $this->query($sql, array_values($this->queryParam['field']));
        return self::$connection->lastInsertId();
    }

    public function update() {
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

    public function delete() {
        $sql = 'DELETE FROM ' . $this->table_name . ' ' .
        $this->building_condition($this->queryParam['where']) . ' ' . $this->queryParam['other'];

        return $this->query($sql, []);
    }


}
