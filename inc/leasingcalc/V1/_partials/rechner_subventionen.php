<?php if ($siteOptions["leasing_contribution_advertising"] === '1') { ?>
   <tr id="lur_content_subvention_add" class="lur_content_div">
      <td class="lur_content_label">Werbeflächenzuschuss (monatlich)</td>
      <td class="lur_content_input_row" colspan="2">
        <div class="currency_field">
          <span class="currency_field_symbol">€</span>
          <input type="number" id="lur_subvention_add" min="0" value="0"/>
        </div>
      </td>
   </tr>
<?php } ?>
<?php if ($siteOptions["leasing_contribution_internet"] === '1') { ?>
   <tr id="lur_content_subvention_internet" class="lur_content_div">
      <td class="lur_content_label">Internetpauschale (monatlich)</td>
      <td class="lur_content_input_row" colspan="2">
        <div class="currency_field">
          <span class="currency_field_symbol">€</span>
          <input type="number" id="lur_subvention_internet" min="0" value="0"/>
        </div>
      </td>
   </tr>
<?php } ?>
<?php if ($siteOptions["leasing_contribution_phone"] === '1') { ?>
   <tr id="lur_content_subvention_phone" class="lur_content_div">
      <td class="lur_content_label">Handykostenzuschuß (monatlich)</td>
      <td class="lur_content_input_row" colspan="2">
        <div class="currency_field">
          <span class="currency_field_symbol">€</span>
          <input type="number" id="lur_subvention_phone" min="0" value="0"/>
        </div>
      </td>
   </tr>
<?php } ?>

<?php if ((int)($siteOptions["employersshare"]) > 0 && !$siteOptions['hide_row_employerBenefit']) { ?>
   <tr id="lur_content_employersshare" class="lur_content_div">
      <td class="lur_content_label">Arbeitgeberzuschuss
        <?php if((int)($siteOptions["employersshare"]) == 2) { ?>
          (monatlich<?php if( $siteOptions["employersshare_multiply"] == 1) { ?> je Bike<?php } ?>)
          
        <?php } else { ?>
          (monatlich)
        <?php } ?>
        <?php if (($siteOptions["ag_zuschuss_erlauterung"])) { ?>
          <a href="#" class="lur_open_popout" data-ref="employersshare">(Erläuterung)
          </a>
        <?php } ?>
      </td>
      <?php if($siteOptions["employersshare"] == 7) { ?>
         <td class="lur_content_input_row" colspan="2">
             <select id="lur_employersshare">
                <?php foreach ($siteOptions['employersshare_dropdown'] as $key => $row) { ?>
                    <option <?php if($key === 0) echo "selected"; ?> value="<?php echo $row['wert'];?>"><?php echo $row['titel'];?></option>
                <?php } ?>
             </select>              
         </td>
      <?php } else if($siteOptions["employersshare_value"] > 0 ) { ?>
         <td class="lur_content_input_row" colspan="2">
           <div class="currency_field">
             <span class="currency_field_symbol">€</span>
             <input type="number" <?php if ((int)($siteOptions["employersshare"]) != 6) echo 'disabled="disabled" class="disabled-input"' ?> id="lur_employersshare" min="0" value="<?php echo $siteOptions["employersshare_value"]; ?>" />
           </div>
         </td>
      <?php } else { ?>
         <td class="lur_content_input_row" colspan="2">
           <div class="currency_field">
             <span class="currency_field_symbol">€</span>
             <input type="number" <?php if ((int)($siteOptions["employersshare"]) != 6) echo 'disabled="disabled" class="disabled-input"' ?> id="lur_employersshare" min="0" value="0"/>
           </div>
         </td>
      <?php } ?>
   </tr>

    <?php if($siteOptions["employersshare_additional"] && count($siteOptions["employersshare_additional"]) > 0) { ?>
      <?php foreach ($siteOptions['employersshare_additional'] as $key => $row) { ?>
        <tr id="lur_content_subvention_add" class="lur_content_div lur_employersshare_additional">
          <td class="lur_content_label"><?php echo $row["titel"] ?></td>
          <td class="lur_content_input_row" colspan="2">
            <div class="currency_field">
              <span class="currency_field_symbol">€</span>
              <input type="number" <?php if ((int)($row["editierbar"])) echo 'disabled="disabled" class="disabled-input"' ?>  min="0" value="<?php echo (float)$row['wert'];?>"/>
            </div>
          </td>
        </tr>
      <?php } ?>
    <?php } ?>
<?php } ?>
