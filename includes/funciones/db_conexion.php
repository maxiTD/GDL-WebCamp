<?php
	$conn = new mysqli('localhost', 'root', '113415', 'gdlwebcamp');

	if($conn->connect_error) {
		echo $error -> $conn->connect_error;
	}
?>