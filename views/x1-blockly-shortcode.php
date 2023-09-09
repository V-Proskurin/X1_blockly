<div class="x1-blockly">
    <div class="x1-blockly__editor"></div>
</div>
<div class="x1-blockly-fm__modal alignfull">
	<div class="x1-blockly__filemanager" data-type_fm="blockly">
		<div class="material-icons svelte-89l9x3 x1-blockly-fm__modal--close">cancel</div>

		<div class="x1-blockly-actions">
			<div class="x1-blockly-save">
				<input id="inputBlocklyFile" type="text" placeholder="Введите имя файла">
				<button type="button" id="saveToFM" class="x1-blockly-save__button add-btn"> Сохранить </button>
			</div>
			<div class="left-buttons">
				<button class="add-btn" data-action="paste" type="button">
					Отправить в чат
				</button>
				<!-- <button class="add-btn x1-blockly-action" data-action="x1-blockly-load__workspace" type="button" disabled>Открыть</button>
				<button class="add-btn x1-blockly-action" data-action="x1-blockly-add" type="button" disabled>Добавить</button>
				<button class="add-btn x1-blockly-action" data-action="x1-blockly-cancel" type="button" disabled>Отмена</button> -->
			</div>
		</div>
		<?php
			// local
			// echo do_shortcode( "[wp_file_manager id='9ef55d1d69264d989ba49cd189786686' title='personal-manager']" );
			// prod
			echo do_shortcode( "[wp_file_manager id='b84ed4a860765a5db4c78bb21dd4c7d1' title='personal-manager']" );
		?>
	</div>
</div>


<!--Блок всплывающего меню-->
<div class="popup-menu-container" id="popup-menu-container" onclick="(document.getElementById('popup-menu-container').style.display='none')">
	<div class="popup-col-container"> <img class="close-btn" src="https://x1team.ru/wp-content/uploads/2023/01/cross.svg" onclick="(document.getElementById('popup-menu-container').style.display='none')">
		<div class="popup-row-menu">
			<a href="/"> <img class="logo-img" src="https://x1team.ru/wp-content/uploads/2023/01/logo-x2.png"> </a>
			<div class="menu-text">
				<div class="menu-wrapper"><a href="/account/"><?php echo $current_user->user_login; ?></a></div>
				<div class="menu-wrapper"><a href="/shop/">Каталог</a></div>
				<div class="menu-wrapper"><a href="/blockly/">Blockly</a></div>
			</div>
		</div>
	</div>
</div>
<!--Конец-->

<!--Блок перекрытие переверните устройство-->
<div class="popup-rotate-device-container" id="popup-rotate-device-container">
	<div class="popup-rotate-device-promotion"> <img class="popup-rotate-device-img" src="https://x1team.ru/wp-content/uploads/2023/05/icon.png">
		<div class="popup-rotate-device-text">Переверните ваше устройство</div>
	</div>
</div>
<!--Конец-->

<!--Панель справа с элементами управления-->
<div id="right-panel">
	<div class="material-icons svelte-89l9x3" aria-hidden="true" translate="no" onclick="(document.getElementById('popup-menu-container').style.display='block')">menu</div>
	<div class="material-icons svelte-89l9x3 x1-save-workspace" title="Сохранить Blockly" aria-hidden="true" translate="no">upload</div>
	<div class="material-icons svelte-89l9x3 x1-load-file" title="Загрузить Blockly" aria-hidden="true" translate="no">download</div>
    <div class="material-icons svelte-89l9x3 x1-open-fm" title="Открыть FM">save</div>
	<!-- <div class="material-icons svelte-89l9x3 x1-forward" aria-hidden="true" translate="no">redo</div> -->
	<!-- <div class="material-icons svelte-89l9x3 x1-backward" aria-hidden="true" translate="no">undo</div> -->
	<div id="playButton" class="play-button material-icons svelte-1pir4hi x1-run" aria-hidden="true" translate="no">play_arrow</div>
</div>
<!--Конец-->

<style>

	.blockly-action {
		width: 100% !important;
		max-width: 100% !important;
	}
	.fm-wrapper footer.footer .add-btn {
		height: 32px;
		color: #104AA2;
		font-size: 16px;
		line-height: 1;
		background: url(../img/svg/file-paste.svg) no-repeat left 9px center #FFFFFF;
		border: 1px solid #104AA2;
		-webkit-border-radius: 5px;
		border-radius: 5px;
		padding: 7px 10px 9px 43px;
		cursor: pointer;
	}

</style>
<!-- bloclyfile -->