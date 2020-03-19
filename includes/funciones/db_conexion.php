<?php 
	$conn = new mysqli('localhost', 'root', '113415', 'gdlwebcamp'); //conn de connection

	if($conn->connect_error) {
		echo $error -> $conn->connect_error;
	}
?>