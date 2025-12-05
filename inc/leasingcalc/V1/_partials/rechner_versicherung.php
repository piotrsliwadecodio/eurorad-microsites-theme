<tr id="lur_content_versicherung" class="lur_content_div">
  <td class="lur_content_label">
    Versicherungspaket <?php if($siteOptions['prefix']==='zeg') { ?><a href="https://www.eurorad.de/versicherung" class="info_icon" target="_blank" ><?php } else { ?><a href="#" class="lur_open_popout" data-ref="insurance-table"><?php } ?>
    (Erläuterung)</a>
  </td>
  <td class="lur_content_input_row" colspan="2">
     <select name="in_versicherung" id="lur_versicherung">
        <?php if(in_array('basis', $verspraemien)) { ?><option value="basis">Basis</option><?php } ?>
        <?php if(in_array('premium', $verspraemien)) { ?><option value="premium">Premium</option><?php } ?>
        <?php if(in_array('premiumPlus', $verspraemien)) { ?><option value="premiumPlus" selected>PremiumPLUS</option><?php } ?>
        <?php if(in_array('premiumPlus2', $verspraemien)) { ?><option value="premiumPlus2" selected>PremiumPLUS</option><?php } ?>
        <?php if(in_array('alt', $verspraemien)) { ?><option value="alt">Alte Konditionen (bis zum 28.02.2017)</option><?php } ?>
     </select>
  </td>
</tr>

