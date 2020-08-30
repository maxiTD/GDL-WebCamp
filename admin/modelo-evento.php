<?php
require_once 'funciones/funciones.php';

$titulo = $_POST['titulo-evento'];
$id_categoria = $_POST['categoria-evento'];
$id_invitado = $_POST['invitado-evento'];
//fecha
$fecha = $_POST['fecha-evento'];
$fecha_formateada = date('Y-m-d', strtotime($fecha));
//hora
$hora = $_POST['hora-evento'];
$hora_formateada = date("H:i", strtotime($hora));
$hora_formateada .= ":00";

if ($_POST['registro'] == 'nuevo') {
    try {
        $stmt = $conn->prepare("INSERT INTO eventos (nombre_evento, fecha_evento, hora_evento, id_cat_evento, id_inv) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssii', $titulo, $fecha_formateada, $hora_formateada, $id_categoria, $id_invitado);
        $stmt->execute();
        $id_insertado = $stmt->insert_id;
        if ($stmt->affected_rows) {
            $respuesta = array(
                'respuesta' => 'exito',
                'id_insertado' => $id_insertado,
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'respuesta' => $e->getMessage()
        );
    }

    die(json_encode($respuesta));
}

if ($_POST['registro'] == 'actualizar') {

    try {
        if (empty($_POST['password'])){
            $stmt = $conn->prepare("UPDATE admins SET usuario = ?, nombre = ?, editado = NOW(), nivel = ? WHERE id_admin = ?");
            $stmt->bind_param("ssii", $usuario, $nombre, $nivel, $id_registro);
        } else {
            $opciones = array (
                'cost' => 12
            );
            $password_hashed = password_hash($password, PASSWORD_BCRYPT, $opciones);

            $stmt = $conn->prepare("UPDATE admins SET usuario = ?, nombre = ?, password = ?, editado = NOW(), nivel = ? WHERE id_admin = ?");
            $stmt->bind_param("sssii", $usuario, $nombre, $password_hashed, $nivel, $id_registro);
        }
        $stmt->execute();
        if ($stmt->affected_rows) {
            $respuesta = array(
                'respuesta' => 'exito'
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error',
                'id_actualizado' => $stmt->insert_id
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'respuesta' => $e->getMessage()
        );
    }
    die(json_encode($respuesta));
}

if ($_POST['registro'] == 'eliminar') {
    try {
        $stmt = $conn->prepare('DELETE FROM admins WHERE id_admin = ?');
        $stmt->bind_param('i', $id_registro);
        $stmt->execute();
        if ($stmt->affected_rows) {
            $respuesta = array(
                'respuesta' => 'exito',
                'id_eliminado' => $id_registro
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
    } catch (Exception $e) {
        $respuesta = array(
            'respuesta' => $e->getMessage()
        );
    }
    die(json_encode($respuesta));
}
?>