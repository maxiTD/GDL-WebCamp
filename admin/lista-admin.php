<?php
require_once 'funciones/sesiones.php';
require_once 'funciones/funciones.php';
require_once 'templates/header.php';
require_once 'templates/barra.php';
require_once 'templates/navegacion.php';
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			Listado de Administradores
			<small>puedes editar o eliminar las cuentas de administradores aquí</small>
		</h1>
	</section>

	<!-- Main content -->
	<section class="content">
		<div class="row">
			<div class="col-xs-12">
				<div class="box">
					<div class="box-header">
						<h3 class="box-title">Administra las cuentas en esta sección</h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<table id="registros" class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Usuario</th>
									<th>Nombre</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								<?php
									try {
										$sql = "SELECT id_admin, usuario, nombre FROM admins";
										$resultado = $conn->query($sql);
										$conn->close();
									} catch (Exception $e) {
										$error = $e->getMessage();
										echo $error;
									}
									while ($admin = $resultado->fetch_assoc()) { ?>
										<tr>
											<td><?php echo $admin['usuario']; ?></td>
											<td><?php echo $admin['nombre']; ?></td>
											<td>
												<a href="editar-admin.php?id=<?php echo $admin['id_admin']; ?>" class="btn bg-orange btn-flat margin">
													<i class="fa fa-pencil"></i>
												</a>
												<a href="#" data-id="<?php echo $admin['id_admin']; ?>" data-tipo="admin" class="btn bg-maroon btn-flat margin borrar-registro">
													<i class="fa fa-trash"></i>
												</a>
											</td>
										</tr>
									<?php }; ?>
							</tbody>
							<tfoot>
								<tr>
									<th>Usuario</th>
									<th>Nombre</th>
									<th>Acciones</th>
								</tr>
							</tfoot>
						</table>
					</div>
					<!-- /.box-body -->
				</div>
				<!-- /.box -->
			</div>
			<!-- /.col -->
		</div>
		<!-- /.row -->
	</section>
	<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<?php require_once 'templates/footer.php'; ?>