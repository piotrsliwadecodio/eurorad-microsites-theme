<tr id="lur_content_gehalt" class="lur_content_div">
   <td class="lur_content_label"><span class="wording_normal">Bruttogehalt</span><span class="wording_beamte">Besoldung</span> (monatlich)
      <?php if($siteOptions['explanation_bruttogehalt']) { ?>
         <a href="#" class="lur_open_popout" data-ref="bruttogehalt">(Erläuterung)
         </a>
      <?php } ?>
   </td>
   <td class="lur_content_input_row" colspan="2">
     <div class="currency_field">
       <span class="currency_field_symbol">€</span>
       <input type="number" step="0.50" min="0" name="bruttolohn" id="lur_bruttolohn" value="<?php echo $monthlyIncome; ?>"/>
     </div>
   </td>
</tr>
