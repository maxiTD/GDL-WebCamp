<?php
	session_start();
	$cerrar_sesion = $_GET['cerrar_sesion'];
	if ($cerrar_sesion) {
		session_destroy();
	}
	include_once 'templates/header.php';
	include_once 'funciones/funciones.php';
?>
<body class="hold-transition login-page">
<div class="login-box">
	<div class="login-logo">
		<a href="../index.php"><b>GDL</b>WebCamp</a>
	</div>
	<!-- /.login-logo -->
	<div class="login-box-body">
		<p class="login-box-msg">Iniciar sesion como Administrador</p>

		<form role="form" name="login-admin-form" id="login-admin" method="post" action="insertar-admin.php">
			<div class="form-group has-feedback">
				<input type="text" class="form-control" name="usuario" placeholder="Usuario">
				<span class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input type="password" class="form-control" name="password" placeholder="Password">
				<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<input type="hidden" name="login-admin" value="1">
					<button type="submit" class="btn btn-primary btn-block btn-flat">Iniciar Sesión</button>
				</div>
				<!-- /.col -->
			</div>
		</form>
	</div>
	<!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<?php include_once 'templates/footer.php'; ?>