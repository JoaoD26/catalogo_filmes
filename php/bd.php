<?php
$servername = "127.0.0.1:8111";
$username = "root";
$password = "";
$dbname = "filmes";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if (isset($_POST['query'])){
    $query = $_POST['query'];
    $result = $conn->query($query);

    if ($result === false){
        die($conn->error);
    }
    
    if ($result->num_rows > 0) {

        $data = array();
        while ($row = $result->fetch_assoc()){
            $data[] = $row;
        }
        $json_data = json_encode($data);
        if ($json_data === false) {
            die(json_last_error_msg());
        }
        echo $json_data;
    } else {
        echo "Sem Resultados 1";
    }
}else{
    echo "Sem Resultados 2";
}

$conn->close();
?>
