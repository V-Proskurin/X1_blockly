<div class="x1-blockly">
    <div class="x1-blockly__editor"></div>
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
	<div class="material-icons svelte-89l9x3 x1-save-workspace" aria-hidden="true" translate="no">save</div>
    <label class="x1-label-input x1-label-input_file material-icons svelte-89l9x3">add
        <input class="x1-label-input__input x1-load-workspace" type="file" name="loadWorkspace">
    </label>
	<div class="material-icons svelte-89l9x3 x1-forward" aria-hidden="true" translate="no">redo</div>
	<div class="material-icons svelte-89l9x3 x1-backward" aria-hidden="true" translate="no">undo</div>
	<div id="playButton" class="play-button material-icons svelte-1pir4hi x1-run" aria-hidden="true" translate="no">play_arrow</div>
</div>
<!--Конец-->

