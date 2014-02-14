<?php
    $dataFile = $template_directory . '/fuxradMaterial/materiale.txt';
?>
<div id="fuxradTable">
	<table>
<?php
    if($arrayMaterials = file($dataFile, FILE_IGNORE_NEW_LINES))
	{
		
		foreach ($arrayMaterials as $info)
		{
			$material = explode('|', $info);
			
?>
		<tr>
			<td>
				<img src="<?php echo get_template_directory_uri(); ?>/fuxradMaterial/foto/<?php echo str_replace(' ', '_', $material[0])?>.jpg" />
			</td>
			<td>
				<h3><?=$material[0]?></h3>
				<b>Область применения:</b><br/> <?=$material[1]?><br/>
				<b>Используется в системах:</b> <?=$material[2]?><br/>
				<b>Расход материала:</b> <?=$material[3]?><br/>
				<b>Размер упаковки:</b> <?=$material[4]?><br/>
				<b>Минимальный объем заказа:</b> <?=$material[5]?><br/>
				<?php $infoFile =  get_template_directory_uri().'/fuxradMaterial/info/'.str_replace(' ', '_', $material[0]).'.pdf';?>
				<?php if(file_exists($template_directory. '/fuxradMaterial/info/'.str_replace(' ', '_', $material[0]).'.pdf')): ?>
					<a href="<?=$infoFile?>" target="_blank">Технические характеристики</a>
				<?php endif; ?>
			</td>
			<td>
				<span class="price">от <?=$material[6]?></span>
			</td>
		</tr>
<?php	
		}
	}
?>
	</table>
</div>