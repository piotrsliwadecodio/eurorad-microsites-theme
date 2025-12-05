<?php 
global $siteOptions;
$processDownloads = $siteOptions['dealer_process'];
$defaultProcessButton = 'Prozessablauf';
$contractDownloads = $siteOptions['dealer_contract'];
$defaultContractButton = 'Überlassungsvertrag';

$countBlocks = 0;
if (is_array($processDownloads) && count($processDownloads) > 0) $countBlocks++;
if (is_array($contractDownloads) && count($contractDownloads) > 0) $countBlocks++;

function displayDownloads ($downloads, $button = 'Download') { ?>
  <ul>
  <?php foreach ($downloads as $dl) { ?>
    <?php 
      // var_dump($dl);
      if( !isset($dl['download']) || trim($dl['download']['url']) === '#' || trim($dl['download']['url']) === '') {
        $dlText = 'noch nicht verfügbar';
        $dlLink = '#';
      } else {
        $dlText = $dl['text'] ? $dl['text'] : $button;  
        $dlLink = $dl['download']['url'];
      }
    ?>
    <li>
      <a target="_blank" href="<?php echo $dlLink; ?>" class="button skyblue  large " target="_self">
      <span class="er-dealer-download-icon">
        <svg aria-hidden="true" class="e-font-icon-svg e-fas-file-download" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
      </span>
      <?php echo $dlText ?>
      </a>
    </li>
  <?php } ?>
  </ul>
<?php }

if($siteOptions['dealer_downloads']) { ?>
	<div  class="er-dealer-downloads">
		<?php if($processDownloads) { ?>
      <h4><?php echo $siteOptions['dealer_prozess_text']; ?></h4>
      <?php echo displayDownloads($processDownloads,$defaultProcessButton); ?>
		<?php } ?>
		<?php if($contractDownloads) { ?>
      <h4><?php echo $siteOptions['dealer_contract_text']; ?></h4>
			<?php echo displayDownloads($contractDownloads,$defaultContractButton); ?>
		<?php } ?>
	</div>
<?php } ?>